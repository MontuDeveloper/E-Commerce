// const expressAsyncHandler = require("express-async-handler");
// const Razorpay = require("razorpay");

// const instance = new Razorpay({
//   key_id: "",
//   key_secret: "",
// });

// const checkout = expressAsyncHandler(async (req, res) => {
//   const option = {
//     amount: 50000,
//     currency: "INR",
//   };
//   const order = await instance.orders.create(option);
//   res.json({
//     success: true,
//     order,
//   });
// });

// const paymentVerification = expressAsyncHandler(async (req, res) => {
//   const { rezorpayOrderId, rezorpayPaymentId } = req.body;

//   res.json({
//     rezorpayOrderId,
//     rezorpayPaymentId,
//   });
// });

// module.exports = { checkout, paymentVerification };
