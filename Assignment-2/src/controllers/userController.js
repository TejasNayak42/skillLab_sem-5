import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { cacheGet, cacheSet } from "../middlewares/cacheMiddleWare.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required credentials!" });
  }

  const userWithUsername = await UserModel.findOne({ username });
  if (userWithUsername) {
    return res
      .status(400)
      .json({ message: "User with this username already exists!" });
  }

  if (password.length < 6) {
    return res.json({
      message: "Password must be at least 6 characters long!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,

    password: hashedPassword,
  });
  await newUser.save();

  res.json({ message: "User registered successfully!" });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password!" });
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect!" });
  }

  // Set user role based on some condition
  const userRole = user.isAdmin ? "admin" : "user";

  const token = jwt.sign(
    { id: user._id, role: userRole },
    process.env.JWT_SECRET
  );
  res.json({ token, userID: user._id, userRole });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Check if the data is cached
    // const cachedData = await cacheGet(req.originalUrl);
    // if (cachedData) {
    //   return res.status(200).json(cachedData); // Return cached data if found
    // }

    // If data is not cached, query the database
    const users = await UserModel.find();

    // // Cache the retrieved data
    // await cacheSet(req.originalUrl, users);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};
