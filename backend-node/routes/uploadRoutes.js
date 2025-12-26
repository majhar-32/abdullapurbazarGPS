const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

router.post('/', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error('Multer Error Code:', err.code);
        return res.status(400).json({ error: `Upload error: ${err.message} (${err.code})` });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({ error: err.message || err });
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({ fileUrl: req.file.path });
  });
});

// Get Cloudinary Signature for Direct Upload
router.get('/signature', (req, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const { cloudinary } = require('../config/cloudinary');

  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    type: 'private',
  }, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
});

// Generate Signed URL for viewing private/restricted files
router.post('/sign-url', (req, res) => {
  const { public_id, resource_type, version, type } = req.body;
  const { cloudinary } = require('../config/cloudinary');

  try {
    const options = {
      resource_type: resource_type || 'auto',
      type: type || 'private',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour validity
    };

    // if (version) {
    //   options.version = version;
    // }

    // Standard signed URL failing? Switching to Token-based Authentication (URL Token)
    // This is more robust for raw/private files.

    const ver = version ? `v${version}` : '';
    // Construct the path: /resource_type/type/version/public_id
    // Clean up path to avoid double slashes if version is missing
    const urlPath = `/${options.resource_type}/${options.type}/${ver ? ver + '/' : ''}${public_id}`;

    // Generate the token
    const token = cloudinary.utils.generate_auth_token({
      key: process.env.CLOUDINARY_API_KEY,
      acl: urlPath,
      duration: 3600 // 1 hour
    });

    const signedUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${urlPath}?__a=${token}`;

    console.log('Generated Token URL:', { public_id, urlPath, signedUrl }); // Debug log
    res.json({ url: signedUrl });
  } catch (error) {
    console.error('Error signing URL:', error);
    res.status(500).json({ error: 'Failed to sign URL' });
  }
});

// Proxy PDF to bypass Cloudinary 401 issues
router.get('/proxy-pdf', async (req, res) => {
  const { public_id, type, version } = req.query;
  const { cloudinary } = require('../config/cloudinary');
  const axios = require('axios');

  try {
    // Generate a signed URL for the backend to use
    // We use the standard signing here because the backend is trusted
    const options = {
      resource_type: 'raw',
      type: type || 'private',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 60 // 1 minute validity for backend fetch
    };

    // Use Token-based Authentication for robust access
    const ver = version ? `v${version}` : '';
    const urlPath = `/${options.resource_type}/${options.type}/${ver ? ver + '/' : ''}${public_id}`;

    const token = cloudinary.utils.generate_auth_token({
      key: process.env.CLOUDINARY_API_KEY,
      acl: urlPath,
      duration: 60 // 1 minute validity
    });

    const signedUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}${urlPath}?__a=${token}`;
    console.log('Proxying PDF from:', signedUrl);

    const response = await axios({
      method: 'get',
      url: signedUrl,
      responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', response.data.length);
    res.send(response.data);

  } catch (error) {
    console.error('Proxy Error:', error.message);
    if (error.response) {
      console.error('Cloudinary Response:', error.response.status, error.response.statusText);
    }
    res.status(500).send(`Failed to fetch PDF: ${error.message} ${error.response ? `(${error.response.status}: ${error.response.statusText})` : ''}`);
  }
});

module.exports = router;
