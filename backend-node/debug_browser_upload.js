require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testBrowserUpload() {
  try {
    console.log('--- Starting Browser Upload Simulation ---');

    // 1. Generate Signature (Mimic backend /signature endpoint)
    const timestamp = Math.round((new Date).getTime() / 1000);
    const upload_preset = 'school_website';
    const folder = 'school-website';
    const type = 'private'; // We are enforcing this in frontend

    const paramsToSign = {
      timestamp: timestamp,
      upload_preset: upload_preset,
      folder: folder,
      type: type
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    console.log('Generated Signature:', signature);

    // 2. Prepare Upload (Mimic frontend ManagePages.jsx)
    const dummyFilePath = path.join(__dirname, 'test_browser_upload.txt');
    fs.writeFileSync(dummyFilePath, 'Browser Upload Simulation Content');

    const formData = new FormData();
    formData.append('file', fs.createReadStream(dummyFilePath));
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', upload_preset);
    formData.append('folder', folder);
    formData.append('type', type);

    // 3. Execute Upload
    console.log('Uploading to Cloudinary...');
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`; // Frontend uses auto

    try {
      const uploadRes = await axios.post(uploadUrl, formData, {
        headers: formData.getHeaders()
      });

      console.log('Upload Success!');
      console.log('Public ID:', uploadRes.data.public_id);
      console.log('Version:', uploadRes.data.version);
      console.log('Type:', uploadRes.data.type);
      console.log('Access Mode:', uploadRes.data.access_mode); // Check this!

      const publicId = uploadRes.data.public_id;
      const version = uploadRes.data.version;

      // 4. Test Access (Standard Signed URL)
      console.log('\n--- Testing Access ---');
      const signedUrl = cloudinary.url(publicId, {
        resource_type: 'raw', // Assuming it detects as raw (txt)
        type: 'private',
        sign_url: true,
        secure: true,
        version: version,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      });
      console.log('URL:', signedUrl);

      try {
        const res = await axios.get(signedUrl);
        console.log('✅ Access SUCCESS! Data:', res.data);
      } catch (err) {
        console.log('❌ Access FAILED:', err.message);
        if (err.response) console.log('Status:', err.response.status);
      }

    } catch (uploadErr) {
      console.error('Upload Failed:', uploadErr.message);
      if (uploadErr.response) console.error('Details:', uploadErr.response.data);
    }

    // Cleanup
    fs.unlinkSync(dummyFilePath);

  } catch (error) {
    console.error('Script Error:', error);
  }
}

testBrowserUpload();
