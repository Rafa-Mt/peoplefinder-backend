import { model, Schema } from "mongoose";
import { IChat } from "../types/db";


const chatSchema = new Schema<IChat>({
    users: { type: [Schema.Types.ObjectId], ref: 'user', required: true }
})

export const User = model<IChat>('chat', chatSchema)