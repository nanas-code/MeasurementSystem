require('dotenv').config();
const mongoose = require("mongoose");
const chalk = require('chalk');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.blue.inverse(`Database Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;