import express from 'express'; 
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'

const app = express(); 

app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser()); 
 


app.use('/api/v1/user', userRouter); 

export { app }; 
