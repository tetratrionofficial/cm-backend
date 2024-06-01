const Coupon = require("../model/coupon");
const User = require("../model/user");

// Create Coupon
exports.createCoupon = async (req, res) => {
//   const { userRole } = req.user;
//   if (!(userRole === 'SUPER_ADMIN' || userRole === 'COUPON_MANAGER')) {
//     return res.status(403).json({
//       status: 1,
//       message: 'You do not have access to create coupons'
//     });
//   }

  try {
    const { couponCode, description, discountType, couponAmount, expiry } = req.body;

    if (!couponCode || !expiry) {
      return res.status(400).json({ message: "Coupon code and expiry date are required" });
    }

    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon already exists" });
    }

    const newCoupon = new Coupon({
      couponCode,
      description,
      discountType,
      couponAmount,
      expiry
    });

    await newCoupon.save();

    res.status(201).json({ message: "Coupon created successfully", data: newCoupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Coupon
exports.getCoupon = async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ data: coupon });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Coupon
exports.updateCoupon = async (req, res) => {
  try {
    const couponId = req.params.couponId;

    let coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    coupon.set(req.body);
    const updatedCoupon = await coupon.save();

    res.status(200).json({ message: "Coupon updated successfully", data: updatedCoupon });
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json({
      status: 0,
      length: coupons.length,
      data: coupons
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
