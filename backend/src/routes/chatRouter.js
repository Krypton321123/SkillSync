import express from 'express'
import {getChatHistory, sendChatController} from "../controllers/chatController.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

const chatRouter = express.Router();

chatRouter.route('/send').post(isAuthenticated, sendChatController)
chatRouter.route('/history/:userId').get(isAuthenticated ,getChatHistory)

export default chatRouter;