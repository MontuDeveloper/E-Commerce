const Enquiry = require("../models/enqModel");
const validateMongocbdid = require("../utils/validateMongodbid");
const expressAsyncHandler = require("express-async-handler");

const createEnquiry = expressAsyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiry = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiry = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  console.log(req.params);
  try {
    const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deleteEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongocbdid(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEnquiry = expressAsyncHandler(async (req, res) => {
  try {
    const getAllEnquiry = await Enquiry.find();
    res.json(getAllEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getAllEnquiry,
};
