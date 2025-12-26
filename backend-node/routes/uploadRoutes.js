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
    folder: 'school-website',
    access_mode: 'public',
  }, process.env.CLOUDINARY_API_SECRET);

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
});

module.exports = router;
