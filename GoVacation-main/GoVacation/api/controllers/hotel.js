import Hotel from "../models/Hotel.js";

// create a new hotel
export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);

    } catch (error) {
        next(error);
    }
};


// update a hotel
export const updateHotel = async (req, res) => {

    try {

        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(updatedHotel);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// delete a hotel
export const deleteHotel = async (req, res) => {

    try {

        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted");

    } catch (error) {
        next(error);
    }

}

// get a hotel
export const getHotel = async (req, res, next) => {
    try {

        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {

        next(error);
    }
}

// get all hotels
export const getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }
    catch (error) {
        next(error);
    }

}

export const getCityCount = async (req, res, next) => {
    try {

        const cities = req.query.cities.split(",");
        try {

            const list = await Promise.all(
                cities.map((city) => {
                    return Hotel.countDocuments({ city: city });
                })
            )
            res.status(200).json(list);

        } catch (error) {
            next(error);
        }


    } catch (error) {
        next(error);
    }
}