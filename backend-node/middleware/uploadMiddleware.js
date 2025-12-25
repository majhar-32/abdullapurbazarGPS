```javascript
const multer = require('multer');
const path = require('path');
const { storage } = require('../config/cloudinary');

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|mp4|mov|avi|mkv|wmv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // Allow video mimetypes that might not match the extension exactly (common in some uploads)
    if (file.mimetype.startsWith('video/')) {
        return cb(null, true);
    }
    cb(new Error('Error: Images, PDFs, and Videos Only!'));
  }
}


module.exports = upload;
