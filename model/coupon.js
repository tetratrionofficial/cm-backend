const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,

    },
    discountType: {
      type: String,
    },
    couponAmount: {
      type: String,
    },
    expiry : {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
