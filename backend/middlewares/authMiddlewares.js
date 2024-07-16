const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

// secound time

const authMiddlewares = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("not authorized token expaired, please login again");
    }
  } else {
    throw new Error("there is no token attached to header");
  }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminuser = await User.findOne({ email });
  if (adminuser.role !== "admin") {
    throw new Error("you are not admin");
  } else {
    next();
  }
});

module.exports = { authMiddlewares, isAdmin };
