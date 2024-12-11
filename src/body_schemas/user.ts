import { z } from 'zod'

export const profilePicChangeSchema = z.object({
    url: z.string().url()
})

export const profileInfoChangeSchema = z.object({
    bio: z.string().max(512),
    full_name: z.string().max(96),
    birthdate: z.string().datetime(),
    gender: z.string().refine((s) => ['male', 'female', 'other'].includes(s), 'invalid gender'),
    country: z.string(),
    photos: z.array(z.string().url())
})

export type profileInfo = z.infer<typeof profileInfoChangeSchema>