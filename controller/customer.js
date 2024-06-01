const Customer = require("../model/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new customer
exports.createCustomer = async (req, res) => {
  const { firstname, lastname, email, phone, password, userRole } = req.body;

  if (!firstname || !email || !password) {
    return res.json({
      status: 1,
      message: "Firstname, email, and password are required.",
    });
  }

  try {
    const existCustomer = await Customer.findOne({ email });
    if (existCustomer) {
      return res.json({
        status: 1,
        message: "Customer already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      userRole,
    });
    const createdCustomer = await newCustomer.save();
    if (!createdCustomer) {
      return res.json({
        status: 1,
        message: "Something went wrong!",
      });
    }
    res.json({
      status: 0,
      data: createdCustomer,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

// Login a customer
exports.customerlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 1,
      message: "Email and password are required.",
    });
  }

  try {
    const existCustomer = await Customer.findOne({ email });
    if (!existCustomer) {
      return res.json({
        status: 1,
        message: "Customer not found.",
      });
    }

    const matchedPassword = await bcrypt.compare(password, existCustomer.password);
    if (!matchedPassword) {
      return res.json({
        status: 1,
        message: "Incorrect password.",
      });
    }

    const jwtPayload = {
      email,
      userRole: existCustomer.userRole
    };
    const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      status: 0,
      token,
      customer: existCustomer,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "Something went wrong!",
    });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const existCustomer = await Customer.findById(id);
    if (!existCustomer) {
      return res.json({
        status: 1,
        message: "Customer not found.",
      });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      status: 0,
      data: updatedCustomer,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "Something went wrong!",
    });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const existCustomer = await Customer.findById(id);
    if (!existCustomer) {
      return res.json({
        status: 1,
        message: "Customer not found.",
      });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    res.json({
      status: 0,
      deletedCustomer,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};

// View all customers
exports.allCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({
      status: 0,
      length: customers.length,
      customers,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
