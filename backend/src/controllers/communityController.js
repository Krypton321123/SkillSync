import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { isEmpty } from "../utils/isEmptyFields";
import { Community } from "../models/community.model";
import mongoose from "mongoose";

const createCommunityController = asyncHandler(async (req, res) => {
    const user = req.user; 

    try { 

        const { name, description } = req.body; 

        if (isEmpty(name) || isEmpty(description)) {
            return res.status(422).json(new ApiError(422, "Empty Title or Description"))
        }


        const communityCreating = new Community({
            Creator: user._id, 
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

const getCommunityController = asyncHandler(async (req, res) => {
    const user = req.user;
    const communityId = req.params.id;
    
    try {
        const community = await Community.findById(communityId).populate('Creator');
    
        if(!community) {
            return res.status(404).json(new ApiError(404, "Community not found"));
        }       
        return res.status(200).json(new ApiResponse(200, community, "Community fetched successfully"))
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
})


export { createCommunityController , getCommunityController };

