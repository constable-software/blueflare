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
