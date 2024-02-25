import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Retrieve all users
router.get("/", verifyToken, getAllUsers);

// Delete a user by ID
router.delete("/:id", verifyToken, deleteUser);

// Get a specific user by ID
router.get("/:id", verifyToken, getUserById);

export { router as userRouter };
