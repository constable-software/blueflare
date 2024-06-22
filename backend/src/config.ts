// Just a file to chuck some constants in
import dotenv from "dotenv";
dotenv.config();

if (!process.env["ARCGIS_API_KEY"]) {
    throw new Error("Missing ArcGIS API key");
}

if (!process.env["POSTGRES_URL"]) {
    throw new Error("Missing database URL");
}

export const API_KEY: string = process.env["ARCGIS_API_KEY"]
export const DB_URL: string = process.env["POSTGRES_URL"]
export const ROUTE_API =
  "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve";


// Data generation constants
export const SIGNALS_RED_LIGHT_RANGE = [120, 180]
export const SIGNALS_YELLOW_LIGHT_RANGE = [1, 5]
export const SIGNALS_GREEN_LIGHT_RANGE = [60, 120]