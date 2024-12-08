import { Document, Types } from "mongoose";
import { Token } from "nodemailer/lib/xoauth2";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    deleted: boolean;
}

export interface IPasswordResetToken extends Document {
    username: string;
    token: string;
    createdAt: Date
}

export interface IChat extends Document {
    users: Types.ObjectId[];
}

export interface IMessage extends Document {
    chat: Types.ObjectId;
    content: string
}