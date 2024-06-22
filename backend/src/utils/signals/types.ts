import { z } from "zod";
import { CoordinateSchema } from "../../types";
import { GeoJSONFeature, GeoJSONFeatureCollectionSchema } from "zod-geojson";

export const SignalColourSchema = z.enum(["green", "yellow", "red"]);

export type SignalColour = z.infer<typeof SignalColourSchema>;

export const SignalPhaseSchema = z.object({
  id: z.string(),
  lastRed: z.date(),
  currentColor: SignalColourSchema,
  nextColor: z.enum(["green", "yellow", "red"]),
  timeRemaining: z.number(),
  timings: z.object({
    red: z.number(),
    yellow: z.number(),
    green: z.number(),
  }),
});

export type SignalPhase = z.infer<typeof SignalPhaseSchema>;

export const SignalLocationSchema = z.object({
  location: CoordinateSchema,
  currentColour: SignalColourSchema,
  id: z.string(),
});

export type SignalLocation = z.infer<typeof SignalLocationSchema>;

export interface SignalGeoJSON extends GeoJSONFeature {
  properties: {
    currentColour: SignalColour;
    name: string;
    id: string;
  };
}

// @Sam use this one for types :)
export interface SignalGeoJSONCollection
  extends z.infer<typeof GeoJSONFeatureCollectionSchema> {
  features: SignalGeoJSON[];
}
