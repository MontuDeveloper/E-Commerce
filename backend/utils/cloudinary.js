const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cludinaryUploadImg = async (filetouploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(filetouploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resolve_type: "auto",
        }
      );
    });
  });
};

// delet images

const cludinaryDeletImg = async (filetodelet) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(filetodelet, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resolve_type: "auto",
        }
      );
    });
  });
};

module.exports = { cludinaryUploadImg, cludinaryDeletImg };
