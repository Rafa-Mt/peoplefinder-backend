import { z } from 'zod'

export const profilePicChangeSchema = z.object({
    url: z.string().url()
})