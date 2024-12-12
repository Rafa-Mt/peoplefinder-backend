import { Document, Types } from "mongoose";
import { Token } from "nodemailer/lib/xoauth2";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    deleted: boolean;
    info: IUserInfo
}

interface IUserInfo {
    bio: string;
    full_name: string;
    gender: string;
    birthdate: Date;
    country: Types.ObjectId; // references 'country'
    photos: string[]
}

export interface ICountry extends Document {
    name: string
}

export interface ILike extends Document {
    user: Types.ObjectId
    target: Types.ObjectId
}

export interface IPasswordResetToken extends Document {
    username: string;
    token: string;
    createdAt: Date
}

export interface IChat extends Document {
    users: Types.ObjectId[]; // references 'user'
    last_message: Types.ObjectId // references 'message'
}

export interface IMessage extends Document {
    chat: Types.ObjectId; // references 'chat'
    author: Types.ObjectId; // references 'user'
    content: string;
    type: "text" | "image";
    datetime_sent: Date

}