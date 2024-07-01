const Vendor = require("../model/vendor");
const Plan = require("../model/plan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Purchase a plan
exports.purchasePlan = async (req, res) => {
  const { vendorId, planId } = req.body;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.json({
        status: 1,
        message: "Vendor not found.",
      });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.json({
        status: 1,
        message: "Plan not found.",
      });
    }

    vendor.plan = planId;
    const updatedVendor = await vendor.save();

    res.json({
      status: 0,
      message: "Plan purchased successfully.",
      vendor: updatedVendor,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
