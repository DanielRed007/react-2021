import { json } from "express";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.send(error);
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  try {
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
};

export { authUser, getUserProfile, registerUser };
