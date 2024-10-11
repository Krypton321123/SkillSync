import mongoose from 'mongoose'; 

const communityPostSchema = mongoose.Schema({
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
    upvotes: {
        type: Number, 
        default: 0
    }, 
    downvotes: {
        type: Number, 
        default: 0
    }
})

export const communityPost = mongoose.Model('CommunityPost', communityPostSchema);  