const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImg");
const router = express.Router();

router.post(
  "/",
  authMiddlewares,
  isAdmin,
  uploadPhoto.array("images", 5),
  productImgResize,
  uploadImages
);
router.delete("/delete-img/:id", authMiddlewares, isAdmin, deleteImages);

module.exports = router;
