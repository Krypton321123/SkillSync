import express from 'express'; 
import cors from 'cors'
import { userRouter } from './routes/userRoutes.js';
const app = express(); 

app.use(express.json()); 
app.use(cors()); 

// app.get("/", (req, res) => {
//     res.status(200).json({
//         "message": "just testing"
//     })
// })
// testing ke liye route thi 


app.use('/api/v1/user', userRouter); 

export { app }; 