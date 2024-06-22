import { trpc } from "../../utils/trpc";
import { Coordinate } from "@blueflare/backend/src/types";

function useSignals(topLeftCorner: Coordinate, bottomRightCorner: Coordinate) {
  const signalsQuery = trpc.getSignals.useQuery({
    topLeftCorner: topLeftCorner,
    bottomRightCorner: bottomRightCorner,
  });
  console.log(signalsQuery);

  return signalsQuery;
}

export default useSignals;
