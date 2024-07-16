const express = require("express");
const dbconnect = require("./config/dbconnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const prodcategoryRouter = require("./routes/prodCategoryRoutes");
const blogcategoryRouter = require("./routes/blogCategoryRoutes");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoutes");
const colorRouter = require("./routes/colorRoutes");
const enqRouter = require("./routes/enqRoutes");
const uploadRouter = require("./routes/uploadRoutes");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbconnect();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/prodcategory", prodcategoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`port is running at post ${PORT}`);
});
