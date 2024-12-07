import express from 'express'; 
import {
    getUserDetails,
    getUserProfile,
    loginController,
    signUpController, toggleFollowUser,
    updateUserController,
    logoutController
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import {populateSearchController} from "../controllers/searchController.js";
import {createUserPostController, getPostsController} from "../controllers/postController.js";



const userRouter = express.Router(); 

userRouter.route('/signup').post(signUpController)
userRouter.route('/login').post(loginController)
userRouter.route('/logout').post(logoutController)
userRouter.route('/update').post(isAuthenticated, updateUserController);
userRouter.route('/getSearch').post(populateSearchController)
userRouter.route('/profile').get(isAuthenticated, getUserProfile);
userRouter.route('/:id').get(isAuthenticated, getUserDetails);
userRouter.route('/togglefollow').post(isAuthenticated, toggleFollowUser);
userRouter.route('/createPost').post(isAuthenticated, createUserPostController);
userRouter.route('/fetchposts').get(isAuthenticated, getPostsController)

export { userRouter }; 