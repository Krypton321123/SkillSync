// config/cloudinaryConfig.js

require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SkillSync_Posts', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
  },
});

const upload = multer({ storage });

module.exports = upload;
