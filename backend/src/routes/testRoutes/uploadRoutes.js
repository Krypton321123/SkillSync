// routes/uploadRoutes.js
// this is how routes will be wriiten a basic idea aur ye jo return hoga cloudinary
//  image url ise ham mongodb me store kara denge

const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinaryConfig');

// Define the upload route
router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path }); // Return Cloudinary image URL
});

module.exports = router;
