import { z } from 'zod'
import { Types } from 'mongoose'
import { IMessage } from '../types/db'

export const messageSchema = z.object({
    content: z.string().max(512),
    chat: z.string().min(24, "Invalid ObjectID"),
    datetime_sent: z.union([z.date(), z.string()]).optional(),
    type: z.string().refine((s) => (['text', 'image'].includes(s)), "Invalid message type")
})

export const chatSchema = z.object({
    target: z.string()
})