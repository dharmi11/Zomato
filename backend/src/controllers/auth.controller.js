const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {f
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      "9e356e5a34e2781bb652a2b8"
    );

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in registering user",
      error: error.message,
    });
  }
};






module.exports = {
  registerUser,
};
