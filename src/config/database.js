const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
};

module.exports = { connectDb };
