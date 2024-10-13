import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isEmpty } from "../utils/isEmptyFields.js";
import * as bcrypt from 'bcrypt'; 


const generateRefreshAndAccessToken = (user) => {
    try{
        const accessToken = user.generateAccessToken(); 
        const refreshToken = user.generateRefreshToken(); 

        user.refreshToken = refreshToken; 

        return {
            accessToken, refreshToken
        }
    } catch(err) {
        return null; 
    }
}

const signUpController = asyncHandler(async (req, res) => {
    try{
        const { firstName, lastName, password, confirmPassword } = req.body; 
        let { emailId } = req.body; 
        emailId = emailId.toLowerCase(); 

        if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(emailId) || isEmpty(password) || isEmpty(confirmPassword)) {
            return res.status(400).json(new ApiError(400, "Fields Are empty")); 
        }

        if(password !== confirmPassword) {
            return res.status(409).json(new ApiError(409, "Password doesn't match confirm password")); 
        }   

        const userAlreadyExists = await User.findOne({
            email_id: emailId
        }); 

        if(userAlreadyExists) {
            return res.status(401).json(new ApiError(401, "User already exists")); 
        }

        const salt = await bcrypt.genSalt(10); 

        const hashedPassword = await bcrypt.hash(password, salt); 

        const user = new User({
            first_name: firstName, 
            last_name: lastName, 
            email_id: emailId, 
            password: hashedPassword, 
            refreshToken: '', 
        })

        const { accessToken, refreshToken } = generateRefreshAndAccessToken(user); 

        if(!accessToken || !refreshToken){ 
            return res.status(401).json(new ApiError(401, "Failed to generate refresh and access tokens")); 
        }

        await user.save(); 
        
        const dataToSend = {user: {
            _id: user._id, 
            firstName: user.first_name, 
            lastName: user.last_name, 
            emailId: user.email_id, 
        }, accessToken}; 

        const options = {
            httpOnly: true, // accessible only by the server 
        }

        return res.status(200).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options)
                                .json(new ApiResponse(200, dataToSend, "User created Successfully")); 


    } catch(err){
        console.log(err.message)
        return res.status(500).json(new ApiError(500, "Internal Server Error" || err.message))
}
    
}); 

const loginController = asyncHandler(async (req, res) => {
    try {
        let { emailId } = req.body; 

        emailId = emailId.toLowerCase(); 

        const { password } = req.body; 
        
        if(isEmpty(emailId) || isEmpty(password)) {
            return res.status(400).json(new ApiError(404, "Required fields are empty")); 
        }

        const user = await User.findOne({ email_id: emailId }); 

        if(!user) {
            return res.status(409).json(new ApiError(409, "User not found")); 
        }

        const compare = await bcrypt.compare(password, user.password); 

        if (!compare) {
            return res.status(409).json(new ApiError(409, "Password is incorrect")); 
        }

        const { accessToken, refreshToken } = generateRefreshAndAccessToken(user);  


        return res.status(200).cookie('accessToken', accessToken, {httpOnly: true}).cookie('refreshToken', refreshToken, {httpOnly: true})
        .json(new ApiResponse(200, {firstName: user.first_name, last_name: user.last_name, accessToken: accessToken, refreshToken: user.refreshToken}, "Login Successful"));

    } catch(err) {
        console.log(err)
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
})

const logoutController = asyncHandler(async(req, res)=>{
    try{
        res.clearCookie('accessToken', {path: 'route where cookie was set'});
        res.clearCookie('refreshToken', {path: 'route where cookie was set'});
        return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
    } catch(err){
        console.log(err.message)
        return res.status(500).json(new ApiError(500, "Internal Server Error" || err.message))
    }
})


export { signUpController, loginController , logoutController }; 