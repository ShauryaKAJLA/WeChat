import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.CORS_ORIGIN],
        credentials: true,
        methods: ["GET", "POST"]
    }
});
export const getReceiverSocketId=(receiverId)=>
{
    return userSocketMap[receiverId];
}
const userSocketMap = {};
io.on('connection', async (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    console.log(userId);
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    console.log(userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };