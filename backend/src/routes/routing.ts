import { z } from "zod";
import { publicProcedure } from "../trpc";
import { GeoJSONFeatureCollection, GeoJSONFeatureCollectionSchema} from "zod-geojson";
import { getArcGISRoute } from "../utils/roadRouting";
import { CoordinateSchema } from "../types";

export const REALLY_CRAPPY_CACHE: {
    [key: string]: GeoJSONFeatureCollection
} = {}

export const getRoadRoute = publicProcedure
  .input(
    z.object({
      a: CoordinateSchema,
      b: CoordinateSchema,
    }),
  )
  .output(GeoJSONFeatureCollectionSchema)
  .query(async ({ input }) => {
    if (REALLY_CRAPPY_CACHE[JSON.stringify(input)]) {
      return REALLY_CRAPPY_CACHE[JSON.stringify(input)];
    }
    console.log(input);
    const res = await getArcGISRoute(input.a, input.b);
    if (!res) {
      throw new Error("Failed to get route from ArcGIS");
    }
    REALLY_CRAPPY_CACHE[JSON.stringify(input)] = res;
    return res;
  });
