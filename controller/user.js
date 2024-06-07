const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//createUser
exports.createUser = async (req, res) => {
  const { username,firstname, lastname, email, phone, password } = req.body;

  if (!name || !email || !phone || !password ) {
    return res.json({
      status: 1,
      message: "All fields are required.",
    });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({
        status: 1,
        message: "User already exist.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    if (!createdUser) {
      return res.json({
        status: 1,
        message: "Some went wrong!",
      });
    }
    res.json({
      status: 0,
      data: createdUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

//Login user
exports.login = async (req, res) => {
  console.log("iygf")
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: 1,
      message: "All fields are required.",
    });
  }
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.json({
        status: 1,
        message: "User not found.",
      });
    }
    const matchedPassword = await bcrypt.compare(password, existUser.password);
    if (!matchedPassword) {
      return res.json({
        status: 1,
        message: "Incorrect Password",
      });
    }
    const jwtPayload = {
      email,
      userRole:existUser.userRole
    };
    const token = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      status: 0,
      token,
      user: existUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "something went wrong!!",
    });
  }
};

//UpdateUser
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");
  const _id = id;
  try {
    const existUser = await User.findById(_id);
    console.log(existUser, " exituser");
    if (!existUser) {
      return res.json({
        status: 1,
        message: "user not exist",
      });
    }
    console.log(req.body, " req.body");
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log(updatedUser, " updated user");
    res.json({
      status: 0,
      data: updatedUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: "some thing went wrong!!",
    });
  }
};

//DeleteUser
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const existUser = await User.findById({ _id: id });
    if (!existUser) {
      return res.json({
        status: 1,
        message: "User not exist",
      });
    }
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    res.json({
      status: 0,
      deletedUser,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};

//View all user
exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: 0,
      length: users.length,
      users,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
