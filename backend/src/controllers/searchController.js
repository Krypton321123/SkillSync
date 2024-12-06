import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {isEmpty} from "../utils/isEmptyFields.js";
import { Community } from "../models/community.model.js";

const populateSearchController = asyncHandler(async (req, res) => {
    const { value } = req.body;

    try {

        if (isEmpty(value)) {
            res.status(400).json(new ApiError(400, "Value is empty"))
        }

        const result = await Community.find({
            $or: [
                { name: { $regex: value, $options: 'i' } },
            ]
        })

        console.log(result)

        res.status(200).json(new ApiResponse(200, result, "success"))
    } catch (err) {
        res.status(500).json(new ApiError(500, "Something went wrong"))
    }
})

export { populateSearchController }