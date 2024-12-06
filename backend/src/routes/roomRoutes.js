import express from 'express';
import {generateZoomMeeting} from '../middlewares/zoom.service.js';

const roomRouter = express.Router();

roomRouter.post('/meeting', async (req, res) => {
  try {
    // Call the function to generate a Zoom meeting
    const meetingDetails = await generateZoomMeeting();

    // Send the meeting details as a response
    res.status(200).json({ meetingDetails });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.status(500).json({ success: false, message: "Failed to create Zoom meeting", error: error.message });
  }
});

export { roomRouter };
