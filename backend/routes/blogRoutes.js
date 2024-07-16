const express = require("express");
const router = express.Router();
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const {
  createBlog,
  updateBlog,
  getaBlog,
  getallBlog,
  deleteBlog,
  likeaBlog,
  dislikeaBlog,
  uploadImages,
} = require("../controller/blogCtrl");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImg");

router.post("/", authMiddlewares, isAdmin, createBlog);
router.put("/likes", authMiddlewares, likeaBlog);
router.put("/dislikes", authMiddlewares, dislikeaBlog);
router.put(
  "/upload/:id",
  authMiddlewares,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);

router.put("/:id", authMiddlewares, isAdmin, updateBlog);
router.delete("/:id", authMiddlewares, isAdmin, deleteBlog);

router.get("/:id", getaBlog);
router.get("/", getallBlog);

module.exports = router;
