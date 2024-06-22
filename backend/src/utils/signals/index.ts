import { SignalColour, SignalPhase } from "./types";

const ANOTHER_CRAPPY_CACHE: {
  [key: string]: SignalPhase;
} = {};

export function getSignalColour(id: string): SignalColour {
    console.debug("SIGNAL")
  if (ANOTHER_CRAPPY_CACHE[id]) {
    console.debug("[SIGNALS]: Cache hit ;)");
    // TODO: calc something here
    return ANOTHER_CRAPPY_CACHE[id].currentColor;
  }
  return "red";
}

export async function getSignalPhaseTime(id: string): Promise<SignalPhase> {
  if (ANOTHER_CRAPPY_CACHE[id]) {
    console.debug("[SIGNALS]: Cache hit ;)");
    // TODO: calc something here
    let prev = ANOTHER_CRAPPY_CACHE[id];
  }
  return {
    id: "test",
    lastRed: new Date(),
    currentColor: "red",
    nextColor: "red",
    timeRemaining: 0,
    timings: {
      red: 0,
      yellow: 0,
      green: 0,
    },
  };
}
