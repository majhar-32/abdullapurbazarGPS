require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = 'eaomqnygxd5glybeshiy.pdf';

async function checkFile() {
  try {
    console.log('Checking file:', publicId);

    // Get resource details
    try {
      const resource = await cloudinary.api.resource(publicId, {
        resource_type: 'raw',
        type: 'private'
      });
      console.log('--- Resource Details (Private) ---');
      console.log('Type:', resource.type);
      console.log('Access Mode:', resource.access_mode);
      console.log('Version:', resource.version);
      console.log('URL:', resource.url);
      console.log('Secure URL:', resource.secure_url);
      version = resource.version; // Assign version if resource is found
    } catch (err) {
      console.log('❌ Could not find as PRIVATE:', err.message);

      // Try finding as upload (public)
      try {
        const resourcePublic = await cloudinary.api.resource(publicId, {
          resource_type: 'raw',
          type: 'upload'
        });
        console.log('--- Resource Details (Upload/Public) ---');
        console.log('Type:', resourcePublic.type);
        console.log('Access Mode:', resourcePublic.access_mode);
        console.log('Version:', resourcePublic.version);
        version = resourcePublic.version; // Assign version if public resource is found
      } catch (err2) {
        console.log('❌ Could not find as UPLOAD either:', err2.message);
      }
    }

    // Test 1: Private URL WITHOUT Signature
    console.log('\n--- Testing Private URL WITHOUT Signature ---');
    // Note: 'version' here would be undefined if no resource (private or public) was found.
    // For a meaningful test, 'version' should be obtained from a resource lookup first,
    // or a known version should be used. Assuming 'version' will be set by a previous lookup.
    const unsignedPrivateUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/private/v${version}/${publicId}`;
    console.log('URL:', unsignedPrivateUrl);
    try {
      const res1 = await axios.get(unsignedPrivateUrl);
      console.log('✅ Unsigned Private URL Fetch SUCCESS! Data Length:', res1.data.length);
    } catch (err) {
      console.log('❌ Unsigned Private URL Fetch FAILED:', err.message);
      if (err.response) console.log('Status:', err.response.status);
    }

    // Test 2: Upload (Public) URL
    console.log('\n--- Testing Upload (Public) URL ---');
    const publicUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/v${version}/${publicId}`;
    console.log('URL:', publicUrl);
    try {
      const res2 = await axios.get(publicUrl);
      console.log('✅ Upload (Public) URL Fetch SUCCESS! Data Length:', res2.data.length);
    } catch (err) {
      console.log('❌ Upload (Public) URL Fetch FAILED:', err.message);
      if (err.response) console.log('Status:', err.response.status);
    }

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

checkFile();
