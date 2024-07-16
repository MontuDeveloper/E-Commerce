// const { stack } = require("../routes/authRoutes");

const notFound = (req, res, next) => {
  const error = new Error(`not fond : ${req.originalUrl}`);
  res.status(400);
  next(error);
};

// error handler

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : req.statusCode;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { notFound, errorHandler };
