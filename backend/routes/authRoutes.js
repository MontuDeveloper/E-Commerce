const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  adminLogin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  deleteCartItem,
  updateuserCart,
  getMonthWishOrderIncome,
  getMonthWishOrderCount,
  getYearlyTotalOrder,
} = require("../controller/userCtrl");
const { authMiddlewares, isAdmin } = require("../middlewares/authMiddlewares");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", adminLogin);
router.post("/cart", authMiddlewares, userCart);
router.get("/all-users", getallUser);
router.get("/getmonth-orderincome", authMiddlewares, getMonthWishOrderIncome);
router.get("/getmonth-ordercount", authMiddlewares, getMonthWishOrderCount);
router.get("/getyearly-ordercount", authMiddlewares, getYearlyTotalOrder);
router.post("/cart/apply-coupon", authMiddlewares, applyCoupon);
router.post("/cart/create-order", authMiddlewares, createOrder);
// router.post("order/checkout", authMiddlewares, checkout);
// router.post("order/paymentverification", authMiddlewares, paymentVerification);
router.get("/get-order", authMiddlewares, getOrders);
router.get("/getallorders", authMiddlewares, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddlewares, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/cart", authMiddlewares, getUserCart);
router.get("/wishlist", authMiddlewares, getWishlist);

router.post("/forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddlewares, updatePassword);
router.get("/:id", authMiddlewares, isAdmin, getUser);
router.delete("/empty-cart", authMiddlewares, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddlewares,
  deleteCartItem
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantiy",
  authMiddlewares,
  updateuserCart
);

router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddlewares, updatedUser);
router.put("/save-address", authMiddlewares, saveAddress);
router.put("/block-user/:id", authMiddlewares, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlewares, isAdmin, unblockUser);
router.put(
  "/order/update-status/:id",
  authMiddlewares,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
