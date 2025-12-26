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
    console.log('--- Starting Fresh Upload Test ---');

    // 1. Create a dummy file
    const dummyFilePath = path.join(__dirname, 'test_file.txt');
    fs.writeFileSync(dummyFilePath, 'Hello Cloudinary Private Access!');

    // 2. Upload it as private raw
    console.log('Uploading test file...');
    const uploadResult = await cloudinary.uploader.upload(dummyFilePath, {
      resource_type: 'raw',
      type: 'private',
      public_id: 'test_access_' + Date.now()
    });

    console.log('Upload Success!');
    console.log('Public ID:', uploadResult.public_id);
    console.log('Version:', uploadResult.version);

    const publicId = uploadResult.public_id;
    const version = uploadResult.version;

    // 3. Test Standard Signed URL
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

    // 4. Test Token Auth URL (Exact Path)
    console.log('\n--- Testing Token Auth URL (Exact Path) ---');
    const aclPath = `/raw/private/v${version}/${publicId}`;
    const token = cloudinary.utils.generate_auth_token({
      key: process.env.CLOUDINARY_API_KEY,
      acl: aclPath,
      duration: 3600
    });
    const tokenUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${aclPath}?__a=${token}`;
    console.log('URL:', tokenUrl);

    try {
      const res2 = await axios.get(tokenUrl);
      console.log('✅ Token URL Fetch SUCCESS! Data:', res2.data);
    } catch (err) {
      console.log('❌ Token URL Fetch FAILED:', err.message);
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
