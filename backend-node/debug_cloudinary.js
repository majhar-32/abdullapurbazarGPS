require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUploadAndAccess() {
  try {
    console.log('--- Starting Fresh Upload Test (Final Verification) ---');

    // 1. Create a dummy file
    const dummyFilePath = path.join(__dirname, 'test_final_verify.txt');
    fs.writeFileSync(dummyFilePath, 'Final Verification of Cloudinary Access');

    // 2. Upload it as private raw
    console.log('Uploading test file...');
    const uploadResult = await cloudinary.uploader.upload(dummyFilePath, {
      resource_type: 'raw',
      type: 'private',
      public_id: 'test_final_' + Date.now()
    });

    console.log('Upload Success!');
    console.log('Public ID:', uploadResult.public_id);

    const publicId = uploadResult.public_id;

    // 3. Test Standard Signed URL (The method currently implemented in backend)
    console.log('\n--- Testing Standard Signed URL ---');
    const signedUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      type: 'private',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600
    });
    console.log('URL:', signedUrl);

    try {
      const res1 = await axios.get(signedUrl);
      console.log('✅ Signed URL Fetch SUCCESS! Data:', res1.data);
    } catch (err) {
      console.log('❌ Signed URL Fetch FAILED:', err.message);
      if (err.response) console.log('Status:', err.response.status);
    }

    // 5. Cleanup
    fs.unlinkSync(dummyFilePath);
    // await cloudinary.uploader.destroy(publicId, { resource_type: 'raw', type: 'private' });

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

testUploadAndAccess();
