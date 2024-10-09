import mongoose from 'mongoose'; 

const connectDB = async () => {
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`+`${process.env.DB_NAME}`); 
    console.log(`MongoDB Connected at ${connectionInstance.connection.host}`); 
    } catch(err) {
        console.log("Error in connecting MongoDB"); 
    }
}

export { connectDB }; 