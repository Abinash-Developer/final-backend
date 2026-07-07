const mongoose = require("mongoose");
require("dotenv").config();
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbconnect;
