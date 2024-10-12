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
    votes: {
        type: mongoose.Types.Schema.ObjectId, 
        ref: 'voteModel'
    }
})

const voteSchema = mongoose.Schema({
    postID: {
        type: mongoose.Types.Schema.ObjectId, 
        ref: 'CommunityPost'
    }, 
    likedUsers: {
        type: [mongoose.Types.Schema.ObjectId], // tells mongoose to look in the users table for the object id array
        ref: 'users'
    }, 
    dislikedUsers: {
        type: [mongoose.Types.Schema.ObjectId], 
        ref: 'users'
    }
})


export const voteModel = mongoose.model('voteModel', voteSchema) 
export const communityPost = mongoose.model('CommunityPost', communityPostSchema);  