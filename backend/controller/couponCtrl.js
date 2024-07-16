const Coupon = require("../models/couponModel");
const expressAsyncHandler = require("express-async-handler");
const validateMongocbdid = require("../utils/validateMongodbid");
const validateMongobdid = require("../utils/validateMongodbid");

const createCoupon = expressAsyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getallCoupons = expressAsyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);
  console.log(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    console.log();
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getaCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongobdid(id);
  try {
    const getacoupon = await Coupon.findById(id);
    res.json(getacoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getallCoupons,
  updateCoupon,
  deleteCoupon,
  getaCoupon,
};
