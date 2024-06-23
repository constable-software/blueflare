import { z } from "zod";
import { publicProcedure } from "../trpc";
import {
  GeoJSONFeatureCollection,
  GeoJSONFeatureCollectionSchema,
  GeoJSONLineStringSchema,
} from "zod-geojson";
import { getArcGISRoute } from "../utils/roadRouting";
import { CoordinateSchema } from "../types";
import { db } from "../db";
import { sql } from "drizzle-orm";

export const getRoadRoute = publicProcedure
  .input(
    z.object({
      a: CoordinateSchema,
      b: CoordinateSchema,
    }),
  )
  .output(z.object({ id: z.number(), geojson: GeoJSONFeatureCollectionSchema }))
  .query(async ({ input }) => {
    const cacheKey = JSON.stringify([input.a, input.b]);
    // First check if we already have it in the database
    const cached = await db.execute<{ id: number; geom: string }>(
      sql`select id, ST_AsGeoJSON(geom) as geom from route_cache where key = ${cacheKey}`,
    );

    if (cached.rows.length > 0) {
      try {
        const feature = await GeoJSONLineStringSchema.parseAsync(
          JSON.parse(cached.rows[0].geom),
        );

        const geojson: GeoJSONFeatureCollection = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: feature,
            },
          ],
        };

        return {
          id: cached.rows[0].id,
          geojson,
        };
      } catch (e) {
        console.log(e);
      }
    }
    const res = await getArcGISRoute(input.a, input.b);
    // super damn hacky

    await db.execute(
      sql`insert into route_cache (key, geom) values (${cacheKey}, ST_GeomFromGeoJSON(${
        res?.features[0].geometry
      }))`,
    );

    try {
      const cachedRec = await db.execute<{ id: number }>(
        sql`select id from route_cache where key = ${cacheKey}`,
      );
      if (!res) {
        throw new Error("Failed to get route from ArcGIS");
      }
      return {
        id: cachedRec.rows[0].id,
        geojson: res,
      };
    } catch (e) {
      console.log(e);
    }
  });
