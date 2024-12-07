import mongoose from 'mongoose'
import { User } from './user.model.js'


const messageSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date, default: Date.now
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "read"],
        default: "sent" },
});

let Message;
export default Message = mongoose.model('messages', messageSchema)