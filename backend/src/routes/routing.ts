import { z } from "zod";
import { publicProcedure } from "../trpc";
import { GeoJSONSchema } from "zod-geojson";
import { getArcGISRoute } from "../utils/roadRoute";

const COORDINATE = z.object({
    lat: z.number(),
    long: z.number(),
})

export const getRoadRoute = publicProcedure
    .meta({ openapi: { method: "GET", path: "/routing/roadRoute" } })
    .input(
        z.object({
            a: COORDINATE,
            b: COORDINATE
        })
    )
    .output(GeoJSONSchema)
    .query(async ({ input }) => {
        return await getArcGISRoute(input.a, input.b)
    })