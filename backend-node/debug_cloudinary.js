require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = 'school-website/vz4adodunbeuy7oc0rvu.pdf';
const version = '1766819594';

async function checkFile() {
  try {
    console.log('Checking file:', publicId);

    // Test 1: Token Auth (Private, With Version) - FAILED BEFORE
    console.log('\n--- Test 1: Token Auth (Private, With Version) ---');
    const acl1 = `/raw/private/v${version}/${publicId}`;
    const token1 = cloudinary.utils.generate_auth_token({ key: process.env.CLOUDINARY_API_KEY, acl: acl1, duration: 3600 });
    const url1 = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${acl1}?__a=${token1}`;
    try {
      await axios.get(url1);
      console.log('✅ Test 1 SUCCESS!');
    } catch (err) { console.log('❌ Test 1 FAILED:', err.response?.status); }

    // Test 2: Token Auth (Private, NO Version)
    console.log('\n--- Test 2: Token Auth (Private, NO Version) ---');
    const acl2 = `/raw/private/${publicId}`;
    const token2 = cloudinary.utils.generate_auth_token({ key: process.env.CLOUDINARY_API_KEY, acl: acl2, duration: 3600 });
    const url2 = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${acl2}?__a=${token2}`;
    try {
      await axios.get(url2);
      console.log('✅ Test 2 SUCCESS!');
    } catch (err) { console.log('❌ Test 2 FAILED:', err.response?.status); }

    // Test 3: Token Auth (Authenticated, With Version)
    console.log('\n--- Test 3: Token Auth (Authenticated, With Version) ---');
    const acl3 = `/raw/authenticated/v${version}/${publicId}`;
    const token3 = cloudinary.utils.generate_auth_token({ key: process.env.CLOUDINARY_API_KEY, acl: acl3, duration: 3600 });
    const url3 = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${acl3}?__a=${token3}`;
    try {
      await axios.get(url3);
      console.log('✅ Test 3 SUCCESS!');
    } catch (err) { console.log('❌ Test 3 FAILED:', err.response?.status); }

    // Test 4: Token Auth (Authenticated, NO Version)
    console.log('\n--- Test 4: Token Auth (Authenticated, NO Version) ---');
    const acl4 = `/raw/authenticated/${publicId}`;
    const token4 = cloudinary.utils.generate_auth_token({ key: process.env.CLOUDINARY_API_KEY, acl: acl4, duration: 3600 });
    const url4 = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${acl4}?__a=${token4}`;
    try {
      await axios.get(url4);
      console.log('✅ Test 4 SUCCESS!');
    } catch (err) { console.log('❌ Test 4 FAILED:', err.response?.status); }

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

checkFile();
