import { RouteCallbackParams } from "../types/api";
import { IUser } from "../types/db";

export const sendLike = async ({ token, body }: RouteCallbackParams) => {
    const { _id } = token as IUser;
}

export const getPeople = async ({ token, params }: RouteCallbackParams) => {
    const { page } = params;
}