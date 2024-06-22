import { z } from "zod";

export const EsriJSONRoute = z.object({
  routes: z.object({
    fieldAliases: z.object({
      ObjectID: z.string(),
      Name: z.string(),
      FirstStopID: z.string(),
      LastStopID: z.string(),
      StopCount: z.string(),
      StartTime: z.string(),
      EndTime: z.string(),
      StartTimeUTC: z.string(),
      EndTimeUTC: z.string(),
      Total_TravelTime: z.string(),
      Total_Kilometers: z.string(),
      Total_Miles: z.string(),
      Shape_Length: z.string(),
    }),
    geometryType: z.string(),
    spatialReference: z.object({ wkid: z.number(), latestWkid: z.number() }),
    fields: z.array(
      z.union([
        z.object({ name: z.string(), type: z.string(), alias: z.string() }),
        z.object({
          name: z.string(),
          type: z.string(),
          alias: z.string(),
          length: z.number(),
        }),
      ]),
    ),
    features: z.array(
      z.object({
        attributes: z.object({
          ObjectID: z.number(),
          Name: z.string(),
          FirstStopID: z.number(),
          LastStopID: z.number(),
          StopCount: z.number(),
          StartTime: z.number(),
          EndTime: z.number(),
          StartTimeUTC: z.number(),
          EndTimeUTC: z.number(),
          Total_TravelTime: z.number(),
          Total_Kilometers: z.number(),
          Total_Miles: z.number(),
          Shape_Length: z.number(),
        }),
        geometry: z.object({ paths: z.array(z.array(z.array(z.number()))) }),
      }),
    ),
  }),
});
