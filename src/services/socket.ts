import { DefaultEventsMap, Server } from "socket.io";

export const initSocket = (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {    
   server.on("connection", (socket) => {
        console.log("User connected");
        
        socket.on('disconnect', () => {
            console.log("User disconnected");
        })

        socket.on('join', (room: string) => {
            socket.join(room)
            console.log(`User entered room ${room}`)
            socket.emit('approved-join')
        })
    });
}