import axios from "axios";
import { GeoJSONFeature, GeoJSONFeatureCollection } from "zod-geojson";
import { API_KEY, ROUTE_API } from "../../config";
import { Coordinate } from "../../types";
import { EsriJSONRoute } from "./types";

export * from "./types";

export async function getArcGISRoute(
  a: Coordinate,
  b: Coordinate,
): Promise<GeoJSONFeatureCollection | null> {
  console.debug("[ARCGIS]: Requesting routing info from ArcGIS API");
  try {
    const res = await axios.get(ROUTE_API, {
      params: {
        f: "json",
        token: API_KEY,
        stops: `${a.long},${a.lat};${b.long},${b.lat}`,
        startTime: "now",
        returnDirections: false,
      },
    });
    const data = await EsriJSONRoute.parseAsync(res.data);
    const resp: GeoJSONFeatureCollection = {
      type: "FeatureCollection",
      features: data.routes.features[0].geometry.paths.map((
        feature,
      ): GeoJSONFeature => ({
        type: "Feature",
        properties: {
          startTime: data.routes.features[0].attributes.StartTime,
          endTime: data.routes.features[0].attributes.EndTime,
          totalTravelTime: data.routes.features[0].attributes.Total_TravelTime,
          totalDistance: data.routes.features[0].attributes.Total_Kilometers,
          stopCount: data.routes.features[0].attributes.StopCount,
        },
        geometry: {
          type: "LineString",
          coordinates: feature,
        },
      })),
    };
    return resp;
  } catch (e) {
    console.log(e);
    return null;
  }
}
