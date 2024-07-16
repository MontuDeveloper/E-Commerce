const fs = require("fs");
const {
  cludinaryUploadImg,
  cludinaryDeletImg,
} = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");

const uploadImages = expressAsyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cludinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cludinaryDeletImg(id, "images");
    res.json({ massage: "images deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { deleteImages, uploadImages };
