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

async function testAuthenticatedFlow() {
  try {
    console.log('--- Starting Authenticated Flow Simulation ---');

    // 1. Generate Signature (Mimic UPDATED backend /signature endpoint)
    const timestamp = Math.round((new Date).getTime() / 1000);
    const upload_preset = 'school_website';
    const folder = 'school-website';
    const type = 'private';
    const access_mode = 'authenticated'; // NEW: Enforced in backend

    const paramsToSign = {
      timestamp: timestamp,
      folder: folder,
      type: type,
      access_mode: access_mode
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    console.log('Generated Signature:', signature);

    // 2. Prepare Upload (Mimic UPDATED frontend ManagePages.jsx)
    const dummyFilePath = path.join(__dirname, 'test_auth_flow.txt');
    fs.writeFileSync(dummyFilePath, 'Authenticated Flow Content - ' + Date.now());

    const formData = new FormData();
    formData.append('file', fs.createReadStream(dummyFilePath));
    formData.append('api_key', process.env.CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    // formData.append('upload_preset', upload_preset); // Removed
    formData.append('folder', folder);
    formData.append('type', type);
    formData.append('access_mode', access_mode); // NEW: Enforced in frontend

    // 3. Execute Upload
    console.log('Uploading to Cloudinary...');
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    try {
      const uploadRes = await axios.post(uploadUrl, formData, {
        headers: formData.getHeaders()
      });

      console.log('Upload Success!');
      console.log('Public ID:', uploadRes.data.public_id);
      console.log('Version:', uploadRes.data.version);
      console.log('Type:', uploadRes.data.type);
      console.log('Access Mode:', uploadRes.data.access_mode); // Should be 'authenticated'

      const publicId = uploadRes.data.public_id;
      const version = uploadRes.data.version;

      // 4. Test Access (Mimic UPDATED backend /proxy-pdf endpoint)
      console.log('\n--- Testing Proxy Access Logic ---');

      // The proxy now uses type: 'authenticated'
      console.log('Testing type: authenticated...');
      const signedUrlAuth = cloudinary.url(publicId, {
        resource_type: 'raw',
        type: 'authenticated',
        sign_url: true,
        secure: true,
        version: version,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      });
      console.log('Generated Proxy URL (Authenticated):', signedUrlAuth);

      try {
        const res = await axios.get(signedUrlAuth);
        console.log('✅ Access SUCCESS (Authenticated)! Data:', res.data);
      } catch (err) {
        console.log('❌ Access FAILED (Authenticated):', err.message);
        if (err.response) console.log('Status:', err.response.status);
      }

      console.log('\nTesting type: private...');
      const signedUrlPrivate = cloudinary.url(publicId, {
        resource_type: 'raw',
        type: 'private',
        sign_url: true,
        secure: true,
        version: version,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      });
      console.log('Generated Proxy URL (Private):', signedUrlPrivate);

      try {
        const res2 = await axios.get(signedUrlPrivate);
        console.log('✅ Access SUCCESS (Private)! Data:', res2.data);
      } catch (err) {
        console.log('❌ Access FAILED (Private):', err.message);
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

testAuthenticatedFlow();
