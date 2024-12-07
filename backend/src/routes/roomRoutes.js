import express from 'express';
import {generateZoomMeeting} from '../middlewares/zoom.service.js';
import { roomCreateController } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.route('/meeting').post(roomCreateController)

export { roomRouter };
