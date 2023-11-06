const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description Register new user
//@route   POST /api/user/
//@access public
const registerUser = asynchandler(async (req, res) => {
  const { name, email, password, photo } = req.body;
  // check the fields
  if (!name || !email || !password) {
    res.send({
      status: 400,
      message: "Please enter all the required fields",
    });
    throw new Error("Please Enter all the Fields");
  }
  // check the user
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.send({
      status: 400,
      message: "User already exists",
    });
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, photo });
  if (user) {
    console.log();
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "User not created/found",
    });
    throw new Error("User not created/found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid email or password",
    });
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, loginUser };
