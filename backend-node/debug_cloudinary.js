require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const publicId = 'dwe5fzxut48uc6kxlgog.pdf';

async function checkFile() {
  try {
    console.log('Checking file:', publicId);

    // List resources to find where it went
    const result = await cloudinary.api.resources({
      resource_type: 'raw',
      type: 'private', // Check private first
      max_results: 10
    });

    console.log('Found Resources (Private):', result.resources.map(r => ({ id: r.public_id, type: r.type })));

    const resultUpload = await cloudinary.api.resources({
      resource_type: 'raw',
      type: 'upload', // Check upload next
      max_results: 10
    });

    console.log('Found Resources (Upload):', resultUpload.resources.map(r => ({ id: r.public_id, type: r.type })));

    const foundResource = result.resources[0];
    if (!foundResource) {
      console.log('No private resource found to test.');
      return;
    }
    console.log('Testing with:', foundResource.public_id);

    // Generate signed URLs to compare
    const urlWithExpiry = cloudinary.url(foundResource.public_id, {
      resource_type: 'raw',
      type: 'private',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600
    });

    const urlWithoutExpiry = cloudinary.url(foundResource.public_id, {
      resource_type: 'raw',
      type: 'private',
      sign_url: true,
      secure: true
    });


    console.log('\nGenerated URL (With Expiry):', urlWithExpiry);
    console.log('Generated URL (No Expiry):', urlWithoutExpiry);

  } catch (error) {
    console.error('Error fetching resource:', error.message);
    if (error.error) console.error('Details:', error.error);
  }
}

checkFile();
