import { z } from "zod";
import { CoordinateSchema } from "../types";
import { publicProcedure } from "../trpc";
import { db } from "../db";
import { GeoJSONFeatureCollectionSchema } from "zod-geojson";
import { eq, sql } from "drizzle-orm";
import { SignalGeoJSON, SignalPhaseSchema } from "../utils/signals/types";
import { calcCurrentSignalDetails, getSignalColour } from "../utils/signals";
import { trafficLightCache } from "../db";
import { SIGNALS_GREEN_LIGHT_RANGE, SIGNALS_RED_LIGHT_RANGE, SIGNALS_YELLOW_LIGHT_RANGE } from "../config";
import { getRandomInt } from "../utils/utils";

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

// export const getSignalsAlongRoute = publicProcedure
//   .input(z.object({
//     id: z.string(),
//   }))
//   .output(GeoJSONFeatureCollectionSchema)
//   .query(async ({ input }) => {
//     // DB query
//     const queryRes = await db.execute<{ feature: SignalGeoJSON }>(
//       sql`
// select ST_AsGeoJSON(ST_Intersection(signals.geom, route.geom))
// 	from (
// 		select * from route_cache where id = 26
// 	) route,
// 	geo_signalised_intersection signals
//       `,
//     );
//   });

export const getSignalTimingDetails = publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .output(SignalPhaseSchema)
  .query(async ({ input }) => {
    let records = await db.select().from(trafficLightCache).where(eq(trafficLightCache.mrwa_id, input.id));
    if (records.length === 0) {
      records = await db.insert(trafficLightCache).values({
        mrwa_id: input.id,
        timing_red: getRandomInt(SIGNALS_RED_LIGHT_RANGE[0], SIGNALS_RED_LIGHT_RANGE[1]),
        timing_green: getRandomInt(SIGNALS_GREEN_LIGHT_RANGE[0], SIGNALS_GREEN_LIGHT_RANGE[1]),
        timing_yellow: getRandomInt(SIGNALS_YELLOW_LIGHT_RANGE[0], SIGNALS_YELLOW_LIGHT_RANGE[1]),
      }).returning();
    }

    // Generate the dodgy ass timing
    // TODO: fix typing
    const timing = calcCurrentSignalDetails(
      records[0].mrwa_id,
      {
        red: records[0].timing_red,
        green: records[0].timing_green,
        yellow: records[0].timing_yellow,
      }
    );
    return timing;
  });
