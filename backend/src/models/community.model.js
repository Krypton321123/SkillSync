import mongoose from "mongoose";
import { User } from "./user.model";

const communitySchema = mongoose.Schema({
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

