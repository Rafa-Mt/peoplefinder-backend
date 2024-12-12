import { Types } from "mongoose";
import { Like } from "../models/like";
import { User } from "../models/user";
import { RouteCallbackParams } from "../types/api";
import { IUser } from "../types/db";
import { socketServer } from "../main";
import { createChat } from "./messages";

export const sendLike = async ({ token, body }: RouteCallbackParams) => {
    const { _id, username } = token as IUser;
    const { target } = body

    const targetUser = await User.findOne({_id: target})
    if (!targetUser)
        throw new Error('User not found')

    const likeAlreadyExist = await Like.findOne({ user: _id, target })
    if (likeAlreadyExist)
        throw new Error('Already liked this person')

    const like = new Like()
    like.user = _id as Types.ObjectId;
    like.target = target
    await like.save()

    const otherSideLike = await Like.findOne({ target: _id, user: target })
    if (otherSideLike) {
        socketServer.to(`self-${_id as string}`).emit('match', targetUser.username)
        socketServer.to(`self-${target}`).emit('match', username)
        await createChat({ token, body: { target } })
    } 

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

