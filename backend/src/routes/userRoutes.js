import express from 'express'; 
import {
    getUserProfile,
    loginController,
    signUpController,
    updateUserController,
    logoutController
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import {populateSearchController} from "../controllers/searchController.js";



const userRouter = express.Router(); 

userRouter.route('/signup').post(signUpController)
userRouter.route('/login').post(loginController)
userRouter.route('/logout').post(logoutController)
userRouter.route('/update').post(isAuthenticated, updateUserController);
userRouter.route('/getSearch').post(populateSearchController)
userRouter.route('/profile').get(isAuthenticated, getUserProfile);

export { userRouter }; 