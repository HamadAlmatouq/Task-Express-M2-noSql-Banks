const mongoose = require("mongoose");

async function connectDB() {
  const connection = await mongoose.connect(
    "mongodb+srv://hamadalmatouq:coded123@cluster0.gou99.mongodb.net/"
  );
  console.log(`Mongo connected ${connection.connection.host}`);
}
module.exports = connectDB;
