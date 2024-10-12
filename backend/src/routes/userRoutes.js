import express from 'express'; 
import { loginController, signUpController } from '../controllers/userController.js';



const userRouter = express.Router(); 

userRouter.route('/signup').post(signUpController)
userRouter.route('/login').post(loginController)

export { userRouter }; 