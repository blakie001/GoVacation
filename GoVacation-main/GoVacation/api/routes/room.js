import express from 'express';
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


// create a room
router.post("/:hotelid", verifyAdmin, createRoom);

// update a room
router.put("/:id", verifyAdmin, updateRoom);

// delete a room
router.delete("/:id", verifyAdmin, deleteRoom);

// get a room
router.get("/:id", getRoom);

// get all rooms
router.get("/", getAllRoom);





export default router;