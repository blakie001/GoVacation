import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {

    // hotelid is the id of that particular hotel in which later room will be added
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);


    try {

        const savedRoom = await newRoom.save();

        try {
            // trying to add the new created room id 
            // into the hotel's room attribute created to keep track of the number of rooms in that particular hotel
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

        } catch (error) {
            next(error);
        }

        res.status(200).json(savedRoom);

    } catch (error) {
        next(error);
    }
}


// update a Room
export const updateRoom = async (req, res) => {

    try {

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(updatedRoom);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// delete a Room
export const deleteRoom = async (req, res) => {

    const hotelId = req.params.hotelid;
    try {

        await Room.findByIdAndDelete(req.params.id);
        try {

            await Hotel.findByIdAndDelete(hotelId, { $pull: { rooms: req.params.id } });

        } catch (error) {
            next(error);
        }
        res.status(200).json("Room Deleted");

    } catch (error) {
        next(error);
    }

}

// get a Room
export const getRoom = async (req, res, next) => {
    try {

        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {

        next(error);
    }
}

// get all Rooms
export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }
    catch (error) {
        next(error);
    }

}
