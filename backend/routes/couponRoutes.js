const express = require("express");
const {
  createCoupon,
  getallCoupons,
  updateCoupon,
  deleteCoupon,
  getaCoupon,
} = require("../controller/couponCtrl");
const router = express.Router();
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");

router.post("/", authMiddlewares, isAdmin, createCoupon);
router.get("/", authMiddlewares, isAdmin, getallCoupons);
router.put("/:id", authMiddlewares, isAdmin, updateCoupon);
router.delete("/:id", authMiddlewares, isAdmin, deleteCoupon);
router.get("/:id", authMiddlewares, isAdmin, getaCoupon);

module.exports = router;
