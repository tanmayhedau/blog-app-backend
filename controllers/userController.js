const userModel = require("../models/userModel");
const brcypt = require("bcrypt");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      message: "All users data",
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in getAllUser callback",
      success: false,
      error,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashPassword = await brcypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashPassword });
    await user.save();

    return res.status(201).json({
      message: "user registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email is not registered",
        success: false,
      });
    }

    const isMatch = await brcypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username and password",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in login callback",
      success: false,
      error,
    });
  }
};
