import { RouteCallbackParams } from "../types/api";
import { socketServer } from "../main";
import { IMessage, IUser } from "../types/db";
import { Chat } from "../models/chat";
import { Message } from "../models/message";
import { Aggregate, Types } from "mongoose";
import { AnyMxRecord } from "node:dns";

export const sendMessage = async ({ token, body }: RouteCallbackParams) => {
    const { _id, username } = token as IUser;
    const { content, chat: chat_id, datetime_sent: unformmated, type } = body
    
    const chat = await Chat.findById(chat_id)
    if (!chat)
        throw new Error("Chat not found")

    const datetime_sent = !unformmated ? new Date() 
    : typeof unformmated === 'string' ? new Date(unformmated) 
    : unformmated

    const message = new Message()
    message.content = content;
    message.chat = chat_id;
    message.datetime_sent = datetime_sent;
    message.author = _id as Types.ObjectId;
    message.type = type;
    await message.save()

    chat.last_message = message._id as Types.ObjectId
    await chat.save()

    const target = chat.users.filter((u) => u !== _id).pop()

    socketServer.to(chat_id).emit('message', content, type, username, chat_id, datetime_sent)
    socketServer.to(`self-${target}`).emit('message', content, type, username, chat_id, datetime_sent)
    return message
} 

export const getChats = async ({ token }: RouteCallbackParams) => {

    const { _id } = token as IUser;
    const foundChats = await Chat.find({
        users: _id
    })
    // .select(["_id", "users", "last_message"]) 
    .populate({ path: "users", select: "username info.photos", match: {
        _id: { $ne: _id }
    }})
    .populate({ 
        path: "last_message", 
        select: "datetime_sent content author type -_id", 
        populate: { path: 'author', select: 'username -_id' } 
    })

    // console.log(foundChats)

    // God, forgive me for what i'm doing here.
    return foundChats.map((chat) => ({
        _id: chat._id,
        user_id: chat.users[0]._id,
        user: (chat.users[0] as unknown as IUser).username,
        photo: (chat.users[0] as unknown as IUser).info.photos[0],
        last_message: chat.last_message ? {
            content: (chat.last_message as unknown as IMessage).content,
            datetime_sent: (chat.last_message as unknown as IMessage).datetime_sent,
            author: (chat.last_message as any).author.username,
            type: (chat.last_message as unknown as IMessage).type,
        } : null
    }));
}

export const createChat = async ({ token, body }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const { target } = body
    const chat = new Chat()
    chat.users = [_id, target]
    await chat.save();
    return { chat_id: chat._id }
}

export const getMessages = async ({ token, params }: RouteCallbackParams) => {
    const { _id } = token as any;
    const { chat_id } = params;
    const foundMessages = Message.find({ chat: chat_id })
    .select(['_id', 'type', 'datetime_sent', 'content', 'chat', 'author'])
    .sort({_id: 1})
    // socketServer.on('connect', (socket) => {
    //     socket.join(chat_id)
    // })
    return foundMessages;
}