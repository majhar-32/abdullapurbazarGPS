const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'school-website',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'mp4', 'mov', 'avi', 'mkv', 'wmv'],
    resource_type: 'auto', // Auto-detect image or video
    access_mode: 'public',
  },
});

module.exports = {
  cloudinary,
  storage,
};
