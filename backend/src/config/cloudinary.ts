import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
})

export default cloudinary;
