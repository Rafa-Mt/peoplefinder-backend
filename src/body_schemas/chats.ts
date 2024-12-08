import { z } from 'zod'
import { Types } from 'mongoose'

export const messageSchema = z.object({
    content: z.string().max(512),
    room: z.string()
})

export const chatSchema = z.object({
    users: z.array(z.instanceof(Types.ObjectId))
})