import { asyncHandler } from "../utils/asyncHandler.js"
import { isEmpty } from "../utils/isEmptyFields.js"; 
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(new ApiError(401, "Token is missing"));
        }

        const accessToken = authHeader.split(" ")[1];

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(403).json(new ApiError(403, "User doesn't exist"));
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json(new ApiError(401, "Token has expired"));
        }
        console.log(err);
        res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});