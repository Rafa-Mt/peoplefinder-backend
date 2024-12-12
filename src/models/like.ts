import { model, Schema } from "mongoose";
import { ILike } from "../types/db";

const likeSchema = new Schema<ILike>({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    target: { type: Schema.Types.ObjectId, ref: "user" }
})

export const Like = model<ILike>('likes', likeSchema)