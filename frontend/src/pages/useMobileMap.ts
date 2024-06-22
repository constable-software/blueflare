import { useQuery } from 'react-query';
import { client } from '../lib/utils'; // Assuming trpc is initialized in utils/trpc

type Coordinate = {
  lat: number;
  long: number;
};

function useMobileMap(currentLocation: Coordinate, incident: Coordinate) {
  const fetchRoute = async () => {
    const data = await trpc.getRoadRoute.query({ a: currentLocation, b: incident });
    return data;
  };

  const { data, error, isLoading, isError } = useQuery(['roadRoute', currentLocation, incident], fetchRoute);

  return { data, error, isLoading, isError };
}

export default useMobileMap;
