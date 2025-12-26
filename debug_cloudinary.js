const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Manually parse .env
const envPath = path.join(__dirname, 'backend-node', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

const publicId = 'dwe5fzxut48uc6kxlgog.pdf';

async function checkFile() {
  try {
    console.log('Checking file:', publicId);

    // Get resource details
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: 'raw',
      type: 'private'
    });

    console.log('Resource Details:');
    console.log('- Public ID:', resource.public_id);
    console.log('- Type:', resource.type);
    console.log('- Resource Type:', resource.resource_type);
    console.log('- Access Mode:', resource.access_mode);
    console.log('- URL:', resource.url);
    console.log('- Secure URL:', resource.secure_url);

    // Generate a signed URL manually to compare
    const generatedUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      type: 'private',
      sign_url: true,
      secure: true
    });

    console.log('\nGenerated Signed URL:', generatedUrl);

  } catch (error) {
    console.error('Error fetching resource:', error.message);
    if (error.error) console.error('Details:', error.error);
  }
}

checkFile();
