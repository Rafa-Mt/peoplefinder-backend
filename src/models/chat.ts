import { model, Schema } from "mongoose";
import { IChat } from "../types/db";


const chatSchema = new Schema<IChat>({
    users: { type: [Schema.Types.ObjectId], ref: 'user', required: true },
    last_message: { type: Schema.Types.ObjectId, ref: 'message', default: null }
})

export const Chat = model<IChat>('chat', chatSchema)