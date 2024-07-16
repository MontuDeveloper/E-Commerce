const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", authMiddlewares, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.put("/wishlist", authMiddlewares, addToWishlist);
router.put("/rating", authMiddlewares, rating);

router.put("/:id", authMiddlewares, isAdmin, updateProduct);
router.delete("/:id", authMiddlewares, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
