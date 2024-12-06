import express from 'express'; 
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'
import communityRouter from "./routes/communityRouter.js";

import {roomRouter} from "./routes/roomRoutes.js";

const app = express(); 

app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser()); 
 


app.use('/api/v1/user', userRouter);
app.use('/api/v1/community', communityRouter);
app.use('/api/v1/room', roomRouter);

export { app }; 
