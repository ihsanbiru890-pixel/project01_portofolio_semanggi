const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for images (Gallery, thumbnail)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'semanggi/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// Storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'semanggi/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
  },
});

// Storage for video thumbnails
const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'semanggi/thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1280, height: 720, crop: 'fill', quality: 'auto' }],
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });
const uploadThumbnail = multer({ storage: thumbnailStorage });

module.exports = { cloudinary, uploadImage, uploadVideo, uploadThumbnail };
