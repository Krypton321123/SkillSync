import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {isEmpty} from "../utils/isEmptyFields.js";
import { Community } from "../models/community.model.js";
import {User} from "../models/user.model.js";

const populateSearchController = asyncHandler(async (req, res) => {
    const { value } = req.body;

    try {
        if (isEmpty(value)) {
            return res.status(400).json(new ApiError(400, "Value is empty"));
        }

        const communities = await Community.find({
            name: { $regex: value, $options: "i" },
        });

        const users = await User.find({
            $or: [
                { first_name: { $regex: value, $options: "i" } },
                { last_name: { $regex: value, $options: "i" } },
            ],
        }).select("first_name last_name");

        res.status(200).json(
            new ApiResponse(200, { communities, users }, "Search results fetched successfully")
        );
    } catch (err) {
        console.log(err)
        res.status(500).json(new ApiError(500, "Something went wrong"));
    }
});

export { populateSearchController }