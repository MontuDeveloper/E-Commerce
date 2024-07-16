const Brand = require("../models/brandModel");
const validateMongocbdid = require("../utils/validateMongodbid");
const expressAsyncHandler = require("express-async-handler");

const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrand = expressAsyncHandler(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
