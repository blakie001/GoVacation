import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// update a user
router.put("/:id", verifyUser, updateUser);

// delete a user
router.delete("/:id", verifyUser, deleteUser);

// get a user
router.get("/:id", verifyUser, getUser);

// get all users
router.get("/", verifyAdmin, getAllUsers);

export default router;
