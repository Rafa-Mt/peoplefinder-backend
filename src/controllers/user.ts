import { Types } from "mongoose";
import { User } from "../models/user";
import { RouteCallbackParams } from "../types/api";
import { Schema } from "mongoose";


export const changeUserEmail = async ({ params, body }: RouteCallbackParams) => {
    const { user_id } = params;
    const { email } = body;
    const foundUser = await User.exclusiveFindById(user_id);
    if (!foundUser) return;

    foundUser.email = email;
    await foundUser.save();
}

export const getUserData = async ({ params }: RouteCallbackParams) => {
    // TODO
}

export const deleteUser = async ({ params }: RouteCallbackParams) => {
    const { _id } = params;
    const foundUser = await User.exclusiveFindById(_id);
    if (!foundUser) return;

    foundUser.deleted = true;
    await foundUser.save();
}

export const setProfilePic = async ({ params, body }: RouteCallbackParams) => {
    // TODO
}
