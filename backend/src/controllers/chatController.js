import { io } from "../index.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import Message from '../models/message.model.js'

const sendChatController = asyncHandler(async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    const message = new Message({ senderId, receiverId, content });
    await message.save();


    io.to(receiverId.toString()).emit("message", message);

    res.status(201).json({ success: true, message });
});

const getChatHistory = asyncHandler(async (req, res) => {
    const { userId }= req.params;
    const currentUserId = req.user._id;
    console.log(userId)

    const messages = await Message.find({
        $or: [
            { senderId: currentUserId, receiverId: userId },
            { senderId: userId, receiverId: currentUserId },
        ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
});

export { sendChatController, getChatHistory };