import { z } from "zod";
import { CoordinateSchema } from "../types";
import { publicProcedure } from "../trpc";
import { db } from "../db";
import { GeoJSONFeatureCollectionSchema } from "zod-geojson";
import { sql } from "drizzle-orm";
import { SignalGeoJSON } from "../utils/signals/types";
import { getSignalColour } from "../utils/signals";

export const getSignals = publicProcedure
  .input(z.object({
    topLeftCorner: CoordinateSchema,
    bottomRightCorner: CoordinateSchema,
  }))
  .output(GeoJSONFeatureCollectionSchema)
  .query(async ({ input }) => {
    // DB query

    const queryRes = await db.execute<{ feature: SignalGeoJSON }>(
      sql`
        select 
            ST_AsGeoJSON(t.*)::json as feature
        from (
            select id, description as name, geom from geo_signalised_intersection 
            where geom && ST_MakeEnvelope(
                ${input.topLeftCorner.long}, ${input.topLeftCorner.lat},
                ${input.bottomRightCorner.long}, ${input.bottomRightCorner.lat},
                4326
            )
        ) t
    `,
    );
    return {
      type: "FeatureCollection",
      features: queryRes.rows.map((row) => {
        row.feature.properties.currentColour = getSignalColour(
          row.feature.properties.id,
        );
        return row.feature;
      }),
    };
  });

export const getSignalsAlongRoute = publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .output(GeoJSONFeatureCollectionSchema)
  .query(async ({ input }) => {
    // DB query
    const queryRes = await db.execute<{ feature: SignalGeoJSON }>(
      sql`
        select 
            ST_AsGeoJSON(t.*)::json as feature
        from (
      `,
    );
  });
