import express from 'express'
import {createCommunityController, getCommunityDetails, toggleMembership} from "../controllers/communityController.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

const communityRouter = express.Router();

communityRouter.route('/createCommunity').post(isAuthenticated, createCommunityController);
communityRouter.route('/:id').get(isAuthenticated, getCommunityDetails);
communityRouter.route('/:id/toggle-membership').post(isAuthenticated, toggleMembership);

export default communityRouter