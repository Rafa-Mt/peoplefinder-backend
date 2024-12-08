import { IMessage } from "../types/db"
import { model, Schema, Types } from "mongoose"

const messageSchema = new Schema<IMessage>({
    chat: { type: Schema.Types.ObjectId, ref: "chat", required: true },
    content: { type: String, required: true }
})

const Message = model<IMessage>('message', messageSchema)