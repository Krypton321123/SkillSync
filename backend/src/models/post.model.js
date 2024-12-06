import mongoose from 'mongoose';
import { User } from "./user.model.js";

const communityPostSchema = new mongoose.Schema({
    imageURL: {
        type: String, // assuming we are using cloudinary 
    }, 
    community: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Community',
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true
    }, 
    title: {
        type: String, 
        min: 6, 
        max: 40,
        required: true   
    }, 
    description: {
        type: String, 
        min: 10, 
        max: 120, 
    }, 
    
    likedUsers: {
        type: [mongoose.Schema.Types.ObjectId], // tells mongoose to look in the users table for the object id array
        ref: 'users'
    }, 
    dislikedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    }
})

const userPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }, 
    imageURL: {
        type: String, // assuming we are using cloudinary 
    }, 
    title: {
        type: String, 
        min: 6, 
        max: 40,
        required: true   
    }, 
    description: {
        type: String, 
        min: 10, 
        max: 120, 
    }, 
    likedUsers: {
        type: [mongoose.Schema.Types.ObjectId], // tells mongoose to look in the users table for the object id array
        ref: 'users'
    }, 
    dislikedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    }
    
})


 
export const communityPost = mongoose.model('CommunityPost', communityPostSchema);  
export const userPost = mongoose.model('UserPost', userPostSchema)