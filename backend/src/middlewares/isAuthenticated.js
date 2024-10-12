import { asyncHandler } from "../utils/asyncHandler"
import { isEmpty } from "../utils/isEmptyFields"; 
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import * as jwt from 'jsonwebtoken'
import { User } from "../models/user.model";

export default isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const accessToken  = req.cookies?.accessToken; 
        
        if(isEmpty(accessToken)) {
            return res.status(401).json(new ApiError(401, "Token is empty"))
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); 
        const user = await User.findOne({ _id: decodedToken._id })

        if(!user) {
            return res.status(403).json(new ApiError(403, "User doesn't exist")); 
        }

        req.user = user; 
        next(); 

    } catch(err) {
        if(err.name == "TokenExpiredError") {
            const refreshToken  = req.cookies.refreshToken; 

            if(!refreshToken) {
                return res.status(404).json(new ApiError(404, "Refresh Token doesn't exist"))
            }

            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

                const user = await User.findOne({ _id: decodedRefreshToken._id }); 

                if (!user || refreshToken !== user.refreshToken){
                    return res.status(404).json(new ApiError(404, "Refresh Token not valid"))
                }

                const newAccessToken = jwt.sign({ _id: user._id, email_id: user.email_id}, process.env.ACCESS_TOKEN_SECRET); 

                const options  = {
                    httpOnly: true // cookie only accessible by server
                }

                return res.status(200).cookie('accessToken', newAccessToken, options) 
                        .json(new ApiResponse(200, {}, "New access token issued"))
            } catch {
                console.log(err.message)
                res.status(500).json(new ApiError(500, "Error in generating refresh token"))
            }
        } else {
            console.log(err)
            res.status(500).json(new ApiError(500, "Internal Server Error" || err.message)); 
        }
    }
})