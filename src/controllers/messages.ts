import { RouteCallbackParams } from "../types/api";
import { socketServer } from "../main";

export const sendMessage = async ({ body }: RouteCallbackParams) => {
    const { content, room } = body
    console.log(content, room)
    socketServer.to(room).emit('message', content, room)
} 

export const getChats = async ({ token }: RouteCallbackParams) => {
    console.log(token)
}

export const createChat = async ({ token, body }: RouteCallbackParams) => {
    // const { user } = token as any;
    console.log(token, body)
}

export const getMessages = async ({ token, params }: RouteCallbackParams) => {
    const { _id } = token as any;
    console.log(token, _id)
    socketServer.on('connect', (socket) => {
        socket.join('')
    })
}