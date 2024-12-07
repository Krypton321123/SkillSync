import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { isEmpty } from "../utils/isEmptyFields.js";
import { userPost } from "../models/post.model.js";
import {User} from "../models/user.model.js";

const addPostController = asyncHandler(async(req , res)=>{
    const user = req.user;
    try{
        const { content } = req.body.content;
        const {postImg} = req.body.postImg;
        const {postDomain} = req.body.postDomain;
        const {postId} = req.body.postId;

        if(!content || !postDomain){
            return res.status(400).json({message: "All fields are required"});
        }
        const newPost = new Post({
            content,
            postImg,
            user: user._id,
            postDomain,
            postId,
            date: new Date()
        });

        await newPost.save();
        res.status(201).json({message: "Post added successfully"});
    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500 , "Sorry , Couldn't add post" || error.message));
    }
})

const deletePostController = asyncHandler(async(req,res)=>{
    const user = req.user;

    try{
        const { postId } = req.body.postId;
        const post = await post.findByIdAndDelete(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
            res.status(200).json({message: "Post deleted successfully"});

        }
    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500, "Sorry, Couldn't delete post" || error.message));
    }
})

const upVoteController = asyncHandler(async(req,res)=>{
    const user = req.user;
    try{
        const {postId} = req.body.postId;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(post.upvotes.includes(user._id)){
            //upvotes -1

        }
        else if(post.downvotes.includes()){
            //downvotes -1
            //upvotes +1
        }
        else{
            //upvotes +1
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500, "Sorry, Couldn't upvote post" || error.message));
    }
})

const downVoteController = asyncHandler(async(req,res)=>{
    const user = req.user;
    try{
        const {postId} = req.body.postId;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        
        if(post.downvotes.includes(user._id)){
            //downvotes -1
        }
        else if(post.upvotes.includes()){
            //upvotes -1
            //downvotes +1
        }
        else{
            //downvotes +1
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500, "Sorry, Couldn't downvote post" || error.message));
    }
})

const getSelfPostsController = asyncHandler(async(req,res)=>{
    const user = req.user;
    try{
        const posts = await Post.find({user: user._id}).sort({date: -1});
        res.status(200).json({posts});

    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500, "Sorry, Couldn't get posts" || error.message));
    }
})

const getFollowedPostsController = asyncHandler(async(req,res)=>{
    const user = req.user;
    try{
        const followingIds = user.following;
        const posts = await Post.find({user: {$in: followingIds}}).sort({date: -1});
        res.status(200).json({posts});


    }
    catch(error){
        console.error(error);
        res.status(500).json(new ApiError(500, "Sorry, Couldn't get posts" || error.message));
    }    
})

const createUserPostController = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log("user is this: ", user);

    try {
        const { title, description } = req.body;


        if (isEmpty(title) || isEmpty(description)) {
            return res.status(422).json(new ApiError(422, "Empty Title or Description"));
        }

        console.log(user._id);


        const postCreating = new userPost({
            user: user._id,
            title: title,
            description: description,
        });

        await postCreating.save();

        const dataToSend = {
            id: postCreating._id,
            title: title,
            description: description,
            user: user._id,
        };

        return res.status(200).json(new ApiResponse(200, dataToSend, "Post Created Successfully"));
    } catch (err) {
        console.log(err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
});

const getPostsController = asyncHandler(async (req, res) => {
    const currentUser = req.user;

    try {

        const recentPosts = await userPost.find()
            .sort({ timestamp: -1 })
            .limit(3);


        const followingUsers = await User.findById(currentUser._id).select('followingList');
        const followingPosts = await userPost.find({ user: { $in: followingUsers.followingList } })
            .sort({ timestamp: -1 })
            .limit(5);

        const allPosts = [...recentPosts, ...followingPosts];
        console.log("in here")
        res.status(200).json(new ApiResponse(200, allPosts, "success"));
    } catch (err) {
        console.error(err);
        console.log('in here')
        res.status(500).json(new ApiError(500, "Failed to fetch posts"));
    }
});


export { addPostController, deletePostController, upVoteController, downVoteController, getSelfPostsController, createUserPostController, getPostsController }