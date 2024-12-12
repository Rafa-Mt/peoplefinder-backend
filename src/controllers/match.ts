import { Types } from "mongoose";
import { Like } from "../models/like";
import { User } from "../models/user";
import { RouteCallbackParams } from "../types/api";
import { IUser } from "../types/db";

export const sendLike = async ({ token, body }: RouteCallbackParams) => {
    const { _id } = token as IUser;
    const { target } = body

    const like = new Like()
    like.user = _id as Types.ObjectId;
    like.target = target
    await like.save()
    
}

export const getPeople = async ({ token, params }: RouteCallbackParams) => {
    const { page } = params;
    const { _id } = token as any;

    const size = 10;
    const skip = (Number(page) - 1) * size

    const people = await User.find({ $and: [{_id: { $ne: _id }}, { info: {$ne: { photos: [] }} }]})
        .skip(skip)
        .limit(size)
        .select('username info')
    
    const formmatedPeople = people.map((person) => ({
        id: person._id,
        name: person.username,
        imageUrl: person.info.photos[0]
    }))

    return {
        people: formmatedPeople, 
        next: formmatedPeople.length === size ? `/match/get/${Number(page) + 1}` : null
    };
}

