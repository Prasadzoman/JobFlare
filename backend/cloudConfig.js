
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUD_API_KEY}`,
  api_secret: `${process.env.CLOUD_SECRET}`,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'main', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const resumeStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'main',
        resource_type: 'raw',
    }
})

module.exports = {
  cloudinary,
  storage,
  resumeStorage
};
