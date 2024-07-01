const Plan = require("../model/plan");

// Create a new plan
exports.createPlan = async (req, res) => {
  const { name, price, duration, features } = req.body;

  if (!name || !price || !duration) {
    return res.json({
      status: 1,
      message: "Name, price, and duration are required.",
    });
  }

  try {
    const newPlan = new Plan({
      name,
      price,
      duration,
      features,
    });

    const createdPlan = await newPlan.save();
    if (!createdPlan) {
      return res.json({
        status: 1,
        message: "Something went wrong!",
      });
    }

    res.json({
      status: 0,
      data: createdPlan,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

// Get all plans
exports.allPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json({
      status: 0,
      length: plans.length,
      plans,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
