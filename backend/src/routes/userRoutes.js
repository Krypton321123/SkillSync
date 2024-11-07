import express from 'express'; 
import { loginController, signUpController, updateUserController } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';



const userRouter = express.Router(); 

userRouter.route('/signup').post(signUpController)
userRouter.route('/login').post(loginController)
userRouter.route('/update').post(isAuthenticated, updateUserController); 

export { userRouter }; 