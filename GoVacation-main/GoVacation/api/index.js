import express from "express";
import mongoose from 'mongoose';
import hotelRoute from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import roomRoute from "./routes/room.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";


const app = express();

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ritesh:ritesh@cluster0.vky8cmq.mongodb.net/?retryWrites=true&w=majority")
            .then(console.log("Connected to database"))
            .catch((err) => { console.log(err) });
    } catch (error) {
        console.log(error);
    }
}


app.use(express.json());
app.use(cookieParser());
connect();

app.use("/api/hotel", hotelRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);

// this is midddle ware used for error handing 
// if any error occurs in the application this middleware will catch it and send it to the client
// this middleware will be called only if there is an error in the application
// if there is no error in the application this middleware will not be called

app.use((err, req, res, next) => {

    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";

    // this is simple error but another way to show the error
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});





