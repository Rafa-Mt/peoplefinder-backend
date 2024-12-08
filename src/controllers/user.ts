import { Types } from "mongoose";
import { User } from "../models/user";
import { RouteCallbackParams } from "../types/api";
import { Schema } from "mongoose";
import { IUser } from "../types/db";
import { JwtPayload } from "jsonwebtoken";


export const changeUserEmail = async ({ token, body }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const { email } = body;
    const foundUser = await User.exclusiveFindById(_id as string);
    if (!foundUser) return;

    foundUser.email = email;
    await foundUser.save();
}

export const getUserData = async ({ token }: RouteCallbackParams) => {
    const { _id, username, email } = token as IUser;
    return { _id, username, email }
}

export const deleteUser = async ({ token }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const foundUser = await User.exclusiveFindById(_id as string);
    if (!foundUser) return;

    foundUser.deleted = true;
    await foundUser.save();
}

export const setProfilePic = async ({ token, body }: RouteCallbackParams) => {
    // TODO
}
