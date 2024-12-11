import { DefaultEventsMap, Server } from "socket.io";

export const initSocket = (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {    
   server.on("connection", (socket) => {
        console.log("User connected");
        
        socket.on('disconnect', (room: string, username: string) => {
            console.log("User disconnected");
            socket.to(room).emit('disconnected', `${username} Disconnected`)
        })

        socket.on('join', (room: string, username: string, callback) => {
            socket.join(room)
            console.log(`${username} entered room ${room}`)
            callback(`${username} entered room ${room}`)
            // socket.to(room).emit('connected', username)
            socket.emit('connected')
        })
    });
}