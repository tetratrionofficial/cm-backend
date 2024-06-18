const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname:{
      type: String,
      required: true,
    },
    lastname:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    userRole:{
    type: String,
    enum: ["SUPER_ADMIN" , "PRODUCT_MANAGER" ]
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
