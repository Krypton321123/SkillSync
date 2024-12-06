import mongoose from "mongoose";
import { User } from "./user.model.js";
import { communityPost  } from "./post.model.js";

const communitySchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true
    }, 
    description: {
        type: String, 
        min: 50, 
    }, 
    name: {
        type: String, 
        min: 5, 
        max: 30,
        unique: true 
    }, 
    members: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'users'
    }, 
    posts: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'CommunityPost'
    }
}, {timeStamps: true})

export const Community = mongoose.model('Community', communitySchema); 

