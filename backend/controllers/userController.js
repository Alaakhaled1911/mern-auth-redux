import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//POST /api/users/logout
//access Public
const logOutUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Logout User" });
});

//GET /api/users/profile
//access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "User Profile" });
});

//GET /api/users/profile
//access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "Update User Profile" });
});
export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
