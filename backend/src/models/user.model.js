import mongoose from "mongoose";
import jwt from 'jsonwebtoken'; 

const userSchema = mongoose.Schema({
    first_name: {
        type: String, 
        minLength: 3, 
        maxLength: 50
    }, 
    last_name: {
        type: String, 
        minLength: 3, 
        maxLength: 50
    }, 
    email_id: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true
    }, 
    refreshToken: {
        type: String, 
        required: true,
    }   // will keep adding more to this for now this is enough 
}, {timestamps: true}); 

// hash passwords at login and signup instead of now. 

userSchema.methods.generateAccessToken =  function() {
    return jwt.sign({
        _id: this._id, 
        email_id: this.email_id,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}


const User = mongoose.model('users', userSchema); 

export { User };
