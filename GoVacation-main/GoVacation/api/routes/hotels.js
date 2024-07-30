import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, getCityCount } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// create a hotel
router.post("/", verifyAdmin, createHotel);

// update hotel
router.put("/:id", verifyAdmin, updateHotel);

// delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// get hotel
router.get("/find/:id", getHotel);

// get all hotels
router.get("/", getAllHotel);

// get hotel count by cities
router.get("/countByCity", getCityCount);

export default router;

