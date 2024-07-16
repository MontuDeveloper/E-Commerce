const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModels");
const Coupon = require("../models/couponModel");
const { generateToken } = require("../config/jwtToken");
const uniqid = require("uniqid");
const validateMongocbdid = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const cartModel = require("../models/cartModel");

// create user
const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    // create user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // user are exists
    throw new Error("user alredy exists");
  }
});

// loging user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check user exists or not

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    // cookies refresh
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

// admin login

const adminLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check user exists or not

  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("not authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    // cookies refresh
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      name: findAdmin?.name,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

// get all user

const getallUser = expressAsyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get a user

const getUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const getuser = await User.findById(id);
    res.json({
      getuser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// handle refresh token

const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("no refresh token present in db or not match");

  // jwt verify
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("there is someting worng with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
  // res.json(user);
});

// logout function

const logout = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// delete a user

const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a user

const updatedUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const updateduser = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateduser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user address

const saveAddress = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const updateduser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateduser);
  } catch (error) {
    throw new Error(error);
  }
});

// block user

const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  validateMongocbdid(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user

const unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user unBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update password

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongocbdid(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
    console.log(updatePassword);
  } else {
    res.json(user);
  }
});

// forgot password

const forgotPasswordToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `hey, please follow this link to reset your password. this link is valid till 10 minutes now. <a href='http://localhost:5000/api/user/reset-password/${token}'>click here</>`;
    const data = {
      to: email,
      text: "hey user",
      subject: "forgot password link ",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

// get a wishlist

const getWishlist = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    // console.log(findUser.wishlist);
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// add to cart

const userCart = expressAsyncHandler(async (req, res) => {
  const { productId, price, quantity } = req.body;
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      price,
      quantity,
    }).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

// update cart
const updateuserCart = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  const { cartItemId, newQuntiy } = req.params;
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = newQuntiy;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

// get a cart

const getUserCart = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("price");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// empty cart
const emptyCart = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

// delete cart item

const deleteCartItem = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongocbdid(_id);
  try {
    const deteleProductFormCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deteleProductFormCart);
  } catch (error) {
    throw new Error(error);
  }
});

// apply coupon

const applyCoupon = expressAsyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongocbdid(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("invelid coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

// create order

const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      user: _id,
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongocbdid(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = expressAsyncHandler(async (req, res) => {
  try {
    const allUserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(allUserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  console.log(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const updateOderstatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOderstatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthWishOrderIncome = expressAsyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);

  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    console.log(endDate);
  }

  const data = await Order.aggregate([
    {
      $match: {
        createAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        amount: { $sum: "$totalPriceAfterDiscount" },
      },
    },
  ]);
  res.json(data);
});

const getMonthWishOrderCount = expressAsyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);

  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    console.log(endDate);
  }

  const data = await Order.aggregate([
    {
      $match: {
        createAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(data);
});

const getYearlyTotalOrder = expressAsyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date();
  let endDate = "";
  d.setDate(1);

  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    console.log(endDate);
  }

  const data = await Order.aggregate([
    {
      $match: {
        createAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        amount: { $sum: "$totalPriceAfterDiscount" },
      },
    },
  ]);
  res.json(data);
});

module.exports = {
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
};
