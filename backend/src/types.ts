// File for our types (that we need to access from frontend)

import { z } from "zod";

export const CoordinateSchema = z.object({
    lat: z.number(),
    long: z.number(),
})

export type Coordinate = z.infer<typeof CoordinateSchema>