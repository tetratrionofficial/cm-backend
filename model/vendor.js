const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
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
    aadhaar:{
      type: String,
    },
    gst:{
        type: String,
    },
    shopLicense:{
        type:String,
    },
    udhyamAadhaar:{
        type:String,
    },
    cin:{
        type:String,
    },
    userRole:String,
    password: {
      type: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
  },
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
