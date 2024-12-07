import dotenv from "dotenv";
import { connectDB } from "./db/connect.mongodb.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

let io;

const start = async () => {
    try {

        await connectDB();


        const httpServer = createServer(app);


        io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });


        io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);

            socket.on("message", (data) => {
                console.log("Message received:", data);


                io.to(data.receiverId).emit("message", data);
            });


            socket.on("disconnect", () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });


        const port = process.env.PORT || 8000;
        httpServer.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (err) {
        console.error(`Error in server startup: ${err.message}`);
        process.exit(1);
    }
};

start();

export { io };