import jwt from 'jsonwebtoken';
import { createError } from './error.js';


// simple check kr re hn token valid  h ya ni
export const verifyToken = (req, res, next) => {

    // console.log("call aai  h");
    // console.log(req.rawHeaders);
    const token = req.cookies.access_token;
    // console.log(token);
    // agr token ni h to return kr denge
    if (!token) {
        return next(createError(401, "You are not authorized"));
    }
    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) {
            // agr invalid token hoga to return kr denge
            return next(createError(403, "Invalid Token!"));
        }
        // agr valid hoga to next funcationing k lie bhej denge
        req.user = user;
        next();
    })

}

// check kr re hn correct user logged in h ya ni ya fir wo admin h ya ni
export const verifyUser = (req, res, next) => {

    // isme bhi verifytoken func call islie lgai h taaki check kr ske user k ps token original h ya ni
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(401, "Not Authorized!"));
        }
    });
};


// check kr re hn agr admin h to new hotels add kr skta h or saare users ka data bhi dekh skta h
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(401, "You are Not Admin!"))
        }
    })
}


