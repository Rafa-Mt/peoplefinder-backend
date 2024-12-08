import express, { Express, json, Request, Response, Router } from "express";
import { connect } from "mongoose";
import { createServer } from "node:http"
import dotenv from "dotenv";
import index from './routes/_index'
import morgan from 'morgan'
import cors from 'cors'
import { Server as SocketServer } from "socket.io";
import { initSocket } from "./services/socket";

dotenv.config();

export const port = process.env.PORT || 3000;
export const router = Router();
export const app: Express = express();
const server = createServer(app);

export const socketServer = new SocketServer(server, {
    cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
})
initSocket(socketServer);

connect(process.env.DB_CONN_STRING as string)
.then((db) => {
    console.log("[server]: Connected to database successfully")
});

app.use(json())
app.use(cors())
app.use(morgan("dev"))
app.use('/api', index)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        path: req.url, 
        error: "Endpoint Not Found" 
    });
});

server.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});