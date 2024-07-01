const Vendor = require("../model/vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new vendor
exports.createVendor = async (req, res) => {
  const { firstname, lastname, email, phone, vendorType, aadhaar, gst, shopLicense, udhyamAadhaar, cin, userRole, password,isPremium  } = req.body;

  if (!firstname || !email || !password) {
    return res.json({
      status: 1,
      message: "Firstname, email, and password are required.",
    });
  }

  try {
    const existVendor = await Vendor.findOne({ email });
    if (existVendor) {
      return res.json({
        status: 1,
        message: "Vendor already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      firstname,
      lastname,
      email,
      phone,
      vendorType,
      aadhaar,
      gst,
      shopLicense,
      udhyamAadhaar,
      cin,
      userRole,
      password: hashedPassword,
      isPremium,
    });

    const createdVendor = await newVendor.save();
    if (!createdVendor) {
      return res.json({
        status: 1,
        message: "Something went wrong!",
      });
    }

    res.json({
      status: 0,
      data: createdVendor,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

// Login a vendor
exports.vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 1,
      message: "Email and password are required.",
    });
  }

  try {
    const existVendor = await Vendor.findOne({ email });
    if (!existVendor) {
      return res.json({
        status: 1,
        message: "Vendor not found.",
      });
    }

    const matchedPassword = await bcrypt.compare(password, existVendor.password);
    if (!matchedPassword) {
      return res.json({
        status: 1,
        message: "Incorrect password.",
      });
    }

    const jwtPayload = {
      email,
      userRole: existVendor.userRole,
      isPremium: existVendor.isPremium,
    };
    const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      status: 0,
      token,
      vendor: existVendor,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "Something went wrong!",
    });
  }
};

// Update a vendor
exports.updateVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const existVendor = await Vendor.findById(id);
    if (!existVendor) {
      return res.json({
        status: 1,
        message: "Vendor not found.",
      });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      status: 0,
      data: updatedVendor,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "Something went wrong!",
    });
  }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const existVendor = await Vendor.findById(id);
    if (!existVendor) {
      return res.json({
        status: 1,
        message: "Vendor not found.",
      });
    }

    const deletedVendor = await Vendor.findByIdAndDelete(id);

    res.json({
      status: 0,
      deletedVendor,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};

// View all vendors
exports.allVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json({
      status: 0,
      length: vendors.length,
      vendors,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};

// View all premium vendors
exports.allPremiumVendors = async (req, res) => {
  try {
    const premiumVendors = await Vendor.find({ isPremium: true });
    res.json({
      status: 0,
      length: premiumVendors.length,
      vendors: premiumVendors,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
