import { z } from "zod"
import { publicProcedure } from "../trpc"

export const getIntersections = publicProcedure
    .meta({ openapi: { method: "GET", path: "/traffic/intersections" } })
    .output(z.object({}))
    .query(async () => {
        return {}
    })

// Determines the time shift required for the car to go through the intersection
export const getTimeShift = publicProcedure
    .meta({ openapi: { method: "GET", path: "/traffic/timeShift" } })
    .output(z.object({}))
    .query(async () => {
        return {}
    })