const Category = require("../models/prodCategorysModel");
const validateMongocbdid = require("../utils/validateMongodbid");
const expressAsyncHandler = require("express-async-handler");

const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = expressAsyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
