require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = 'school-website/t0dzilpmcc6pouifqwdh.pdf';
const version = '1766820669';

async function checkFile() {
  try {
    console.log('Checking file:', publicId);

    // Test 1: Plain Public URL (Expect 401 based on user screenshot)
    console.log('\n--- Test 1: Plain Public URL ---');
    const url1 = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/v${version}/${publicId}`;
    console.log('URL:', url1);
    try {
      await axios.get(url1);
      console.log('✅ Test 1 SUCCESS!');
    } catch (err) { console.log('❌ Test 1 FAILED:', err.response?.status); }

    // Test 2: Signed Public URL (The potential fix)
    console.log('\n--- Test 2: Signed Public URL ---');
    const url2 = cloudinary.url(publicId, {
      resource_type: 'raw',
      type: 'upload', // It is an 'upload' (public) type
      sign_url: true, // BUT we sign it to bypass the PDF restriction
      version: version,
      secure: true
    });
    console.log('URL:', url2);
    try {
      await axios.get(url2);
      console.log('✅ Test 2 SUCCESS!');
    } catch (err) { console.log('❌ Test 2 FAILED:', err.response?.status); }

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

checkFile();
