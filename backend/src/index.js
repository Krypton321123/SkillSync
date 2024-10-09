import dotenv from "dotenv"; 
import { connectDB } from "./db/connect.mongodb.js";
import { app } from "./app.js";
// import { connect } from "mongoose";

dotenv.config();

const start = async () => {
    try{
        await connectDB(); 
        const port = process.env.PORT || 8000;
        const displayURL = `http://localhost:${port}`

        app.listen(port, () => {
            console.log(`App listening on ${displayURL}`); 
        })
        
    } catch(err){ 
        console.log(`Error in connecting to MONGODB, err: ${err}`);
        process.exit(1);  
    }
}       

start(); 