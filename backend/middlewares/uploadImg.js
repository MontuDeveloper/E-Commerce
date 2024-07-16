const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { Promise } = require("mongoose");
const fs = require("fs");

const Stotage = multer.diskStorage({
  destination: function (res, file, cd) {
    cd(null, path.join(__dirname, "../public/images"));
  },
  filename: function (res, file, cd) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cd(null, file.fieldname + "_" + uniqueSuffix + ".jpeg");
  },
});

const multerfilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) {
    cd(null, true);
  } else {
    cd({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: Stotage,
  fileFilter: multerfilter,
  limits: { fileSize: 10000000 },
});

const productImgResize = async (req, res, next) => {
  try {
    if (!req.files) return next();
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 50 })
          .toFile(`public/images/product/${file.filename}`);
        fs.unlinkSync(`public/images/product/${file.filename}`);
      })
    );
  } catch (error) {
    console.error("Error resizing image:", error);
    // You can also send an error response to the client here (e.g., using res.status(code).send(message))
  }

  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.file) return next;
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blog/${file.filename}`);
      fs.unlinkSync(`public/images/blog/${file.filename}`);
    })
  );
  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
