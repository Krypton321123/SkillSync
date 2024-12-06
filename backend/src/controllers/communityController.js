import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isEmpty } from "../utils/isEmptyFields.js";
import { Community } from "../models/community.model.js";
import mongoose from "mongoose";
import {User} from "../models/user.model.js";

const createCommunityController = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log("user is this: ", user);

    try { 

        const { name, description } = req.body; 

        if (isEmpty(name) || isEmpty(description)) {
            return res.status(422).json(new ApiError(422, "Empty Title or Description"))
        }


        console.log(user._id)

        const communityCreating = new Community({
            creator: user._id,
            name: name,  
            description: description 
        })

        const communityAlreadyExists = await Community.findOne({ name: name }); 

        if(communityAlreadyExists) {
            return res.status(403).json(new ApiError(403, "Community with this name already exists, Kindly change the name"))
        }

        await communityCreating.save(); 
        
        const dataToSend = {
            id: communityCreating._id, 
            name: name, 
            description: description, 
            Creator: user._id
        }

        return res.status(200).json(new ApiResponse(200, dataToSend, "Community Created successfully"))
        
    } catch(err) {
        console.log(err); 
        return res.status(500).json(new ApiError(500, "Internal Server Error")); 
    }
})


const joinCommunity = asyncHandler(async (req, res) => {
    const user = req.user; 

    try {
        const { communityID } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(communityID)) {
            return res.status(400).json(new ApiError(400, "Invalid Community ID"));
        }

        const userAlreadyJoined = await Community.findOne({
            _id: communityID, 
            members: { $in: [user._id]} 
        })

        if(userAlreadyJoined) {
            return res.status(409).json(new ApiError(409, "User is already joined")); 
        }

        const updatedCommunity = await Community.findOneAndUpdate(
            {_id: communityID}, 
            {$addToSet: {members: user._id}}, 
            {new: true}
        ); 

        if(!updatedCommunity) {
            return res.status(400).json(new ApiError(400, "Community not updated"))
        }

        const dataToSend = {
            updatedCommunity
        }

        return res.status(200).json(new ApiResponse(200, dataToSend, "User joined Successfully"))
    } catch(err) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
})

const leaveCommunity = asyncHandler(async (req, res) => {
    const user = req.user; 

    try {
        const { communityID } = req.params; 

        if(!mongoose.Types.ObjectId.isValid(communityID)) {
            return res.status(400).json(new ApiError(400, "Invalid community ID")); 
        }

        const userAlreadyJoined = await Community.findOne({
            _id: communityID, 
            members: { $in: [user._id]} 
        })

        if(!userAlreadyJoined) {
            return res.status(404).json(new ApiError(404, "user not a member")); 
        }

        const updatedCommunity = await Community.findOneAndUpdate(
            {_id: communityID}, 
            {$pull: { members: user._id }}, 
            {new: true}
        ); 

        if(!updatedCommunity) {
            return res.status(400).json(new ApiError(400, "Community not updated")); 
        }

        return res.status(200).json(new ApiResponse(200, {id: communityID, members: updatedCommunity.members, membersCount: updatedCommunity.members.length}, "User left successfully")); 

    } catch(err) {
        console.log(err)
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
})

const getCommunityDetails = asyncHandler(async (req, res) => {
    console.log("In get community")
    const { id } = req.params;
    const userId = req.user._id

    try {
        const community = await Community.findById(id)
            .populate("creator", "username")
            .populate("members", "username")
            .populate("posts");

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        res.status(200).json({ success: true, data: {community, currentUserId: userId}});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
});

const toggleMembership = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;


    const community = await Community.findById(id);
    const user = await User.findById(userId);

    if (!community) {
        return res.status(404).json(new ApiError(404, "Community not found"));
    }

    const isMember = community.members.includes(userId);

    if (isMember) {
        // Remove user from members
        community.members.pull(userId);
        user.joinedCommunities.pull(id);
    } else {
        // Add user to members
        community.members.push(userId);
        user.joinedCommunities.push(id)
    }



    await community.save();
    await user.save();

    console.log(community)

    res.status(200).json(new ApiResponse(200, {
        joined: !isMember,
    }, isMember ? "User left the community" : "User joined the community"));
});



export { createCommunityController , getCommunityDetails, joinCommunity, leaveCommunity, toggleMembership };

