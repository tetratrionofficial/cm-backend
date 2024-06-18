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
    vendorType:{
      type: String,
      enum: [
        "Sellar",
        "Manufacturer",
        "Distributor",
        "Wholesellar",
      ],
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
    userRole:{
      type:String,
      enum:['Vendor'],
    },
    password: {
      type: String,
    },
    followers: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Customer' 
    }],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorReview",
    }],
  },
  
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
