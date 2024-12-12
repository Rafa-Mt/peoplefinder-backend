import { DefaultEventsMap, Server } from "socket.io";

export const initSocket = (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {    
   server.on("connection", (socket) => {
        console.log("User connected");
        
        socket.on('disconnect', (room: string, username: string) => {
            console.log("User disconnected");
            socket.to(room).emit('disconnected', `${username} Disconnected`)
        })

        socket.on('join', (room: string) => {
            socket.join(room)
            socket.emit('connected')
        })

        socket.on('join-self', (user_id) => {
            socket.join(`self-${user_id}`)
        })
    });
}