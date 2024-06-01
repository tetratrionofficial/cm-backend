const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname:{
        type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    userRole:String,
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
