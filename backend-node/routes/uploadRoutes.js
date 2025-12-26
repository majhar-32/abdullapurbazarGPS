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

module.exports = router;
