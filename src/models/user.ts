import { Model, Document, model, Schema} from "mongoose";
import { IUser } from "../types/db";

export const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        deleted: { type: Boolean, required: true },
    },
    {
        statics: {
            exclusiveFindById: async function (_id: string) {
                return await this.findOne({ $and: [{ _id }, { deleted: false }]});
            }
        },
    }
);

export interface IUserWithMethods extends Model<IUser> {
    exclusiveFindById(_id: string): Promise<IUser | null>
}

export const User = model<IUser, IUserWithMethods>('user', userSchema);
