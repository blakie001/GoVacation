import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/error.js"

import jwt from "jsonwebtoken";


// create a new user
export const register = async (req, res, next) => {
    try {
        const securePassword = await bcryptjs.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: securePassword,
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (error) {
        next(error);
    }
}


// login a user
export const login = async (req, res, next) => {


    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(createError(404, "User Not Found"));
        }

        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return next(createError(500, "Wrong Password"));
        }

        const token = jwt.sign({ user: user._id, isAdmin: user.isAdmin }, "SECRET_KEY")

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails, token });

    } catch (error) {
        console.log(error);

        next(error);
    }
}

