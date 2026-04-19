const express = require('express');
const { upload } = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, upload.array('images', 5), (req, res) => {
  const imageUrls = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  }));
  res.status(200).json(imageUrls);
});

module.exports = router;
