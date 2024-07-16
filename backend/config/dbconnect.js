const { default: mongoose } = require("mongoose");

const dbconnect = () => {
  try {
    // eslint-disable-next-line no-undef
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("databases is connected");
  } catch (error) {
    console.log("databases error");
  }
};

module.exports = dbconnect;
