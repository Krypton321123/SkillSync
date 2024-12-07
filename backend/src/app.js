import express from 'express'; 
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import communityRouter from "./routes/communityRouter.js";

import {roomRouter} from "./routes/roomRoutes.js";
import chatRouter from "./routes/chatRouter.js";

const app = express(); 

app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser()); 
 


app.use('/api/v1/user', userRouter);
app.use('/api/v1/community', communityRouter);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/chat', chatRouter);

export { app }; 
