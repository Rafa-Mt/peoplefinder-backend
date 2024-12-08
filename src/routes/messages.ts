import { Router } from "express";
import { RouteParams } from "../types/api";
import { buildRouter } from "../services/router";
import { chatSchema, messageSchema } from "../body_schemas/chats";
import { sendMessage } from "../services/mailer";
import { createChat, getChats, getMessages } from "../controllers/messages";

const router = Router();

const routes: RouteParams[] = [
    {
        path: "/messages",
        method: "POST",
        bodySchema: messageSchema,
        callback: sendMessage,
        successMessage: "Message sent successfully!"
    },
    {
        path: '/chats',
        method: "POST",
        bodySchema: chatSchema,
        callback: createChat,
        successMessage: 'Chat created successfully!'
    },
    {
        path: "/chats",
        method: "GET",
        callback: getChats,
        successMessage: "Found Chats!",
        returnData: true
    },
    {
        path: "/chats/:chat_id",
        method: "GET",
        callback: getMessages,
        successMessage: "Found Messages!",
        returnData: true
    }
];

buildRouter(router, routes);
export default router;
