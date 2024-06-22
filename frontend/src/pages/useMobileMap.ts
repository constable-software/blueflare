
import { trpc } from '../../utils/trpc';
import { getArcGISRoute } from '../../../backend/src/utils/roadRoute';

export type Coordinate = Parameters<typeof getArcGISRoute>[0];

function useMobileMap(currentLocation: Coordinate, incident: Coordinate) {
  const roadRouteQuery = trpc.getRoadRoute.useQuery({ a: currentLocation, b: incident });
  console.log(roadRouteQuery)

  return roadRouteQuery;
}

export default useMobileMap;
