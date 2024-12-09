import { IMessage } from "../types/db"
import { model, Schema, Types } from "mongoose"

const messageSchema = new Schema<IMessage>({
    chat: { type: Schema.Types.ObjectId, ref: "chat", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    datetime_sent: { type: Date, default: new Date() }
})

export const Message = model<IMessage>('message', messageSchema)