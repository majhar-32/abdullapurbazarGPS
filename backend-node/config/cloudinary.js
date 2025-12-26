const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Check if file is PDF
    const isPdf = file.mimetype === 'application/pdf';

    return {
      folder: 'school-website',
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'mp4', 'mov', 'avi', 'mkv', 'wmv'],
      resource_type: isPdf ? 'raw' : 'auto', // Use raw for PDFs to avoid 401/processing issues
      public_id: file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_') + '_' + Date.now(), // Ensure unique public_id
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
