import { Types } from "mongoose";
import { User } from "../models/user";
import { RouteCallbackParams } from "../types/api";
import { Schema } from "mongoose";
import { IUser } from "../types/db";
import { JwtPayload } from "jsonwebtoken";
import { profileInfo } from "../body_schemas/user";


export const changeUserEmail = async ({ token, body }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const { email } = body;
    const foundUser = await User.exclusiveFindById(_id as string);
    if (!foundUser) return;

    foundUser.email = email;
    await foundUser.save();
}

export const getUserData = async ({ token, params }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const { user_id } = params;
    const idToSearch = user_id ?? _id
    const user = await User.findById(idToSearch)
    .select('username email info')
    return user
}

export const deleteUser = async ({ token }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const foundUser = await User.exclusiveFindById(_id as string);
    if (!foundUser) return;

    foundUser.deleted = true;
    await foundUser.save();
}

export const setProfilePic = async ({ token, body }: RouteCallbackParams) => {
    const user = await User.findById((token as any)._id)
    if (!user)
        throw new Error("User not found") // Should not happen

    const { url } = body;
    user.info.photos = [url]
    await user.save();
}

export const updateProfileData = async ({ token, body }: RouteCallbackParams) => {
    const user = await User.findById((token as any)._id)
    if (!user)
        throw new Error("User not found") // Should not happen

    const {bio, full_name, gender, birthdate, country, photos} = body as profileInfo
  
    user.info = {
        bio, full_name, gender, photos,
        country: country as unknown as Types.ObjectId,
        birthdate: new Date(birthdate)
    } 
    await user.save();
}
