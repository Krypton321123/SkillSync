import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isEmpty } from "../utils/isEmptyFields.js";
import {generateZoomMeeting} from "../middlewares/zoom.service.js";

const roomCreateController = asyncHandler(async (req, res) => {
    try {

        const meetingDetails = await generateZoomMeeting();


        res.status(200).json({ meetingDetails });
    } catch (error) {
        console.error("Error creating Zoom meeting:", error);
        res.status(500).json({ success: false, message: "Failed to create Zoom meeting", error: error.message });
    }
})

export { roomCreateController }