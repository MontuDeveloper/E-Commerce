const Color = require("../models/colorModel");
const validateMongocbdid = require("../utils/validateMongodbid");
const expressAsyncHandler = require("express-async-handler");

const createColor = expressAsyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const updateColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  console.log(req.params);
  try {
    const deleteColor = await Color.findByIdAndDelete(id);
    res.json(deleteColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getColor = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllColor = expressAsyncHandler(async (req, res) => {
  try {
    const getAllColor = await Color.find();
    res.json(getAllColor);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
};
