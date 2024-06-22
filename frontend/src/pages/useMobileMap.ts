import { trpc } from "../../utils/trpc";
import { Coordinate } from "@blueflare/backend/src/types";

function useMobileMap(currentLocation: Coordinate, incident: Coordinate) {
  const roadRouteQuery = trpc.getRoadRoute.useQuery({
    a: currentLocation,
    b: incident,
  });
  console.log(roadRouteQuery);

  return roadRouteQuery;
}

export default useMobileMap;
