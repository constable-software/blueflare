import { SignalColour, SignalPhase } from "./types";

const ANOTHER_CRAPPY_CACHE: {
  [key: string]: SignalPhase;
} = {};

export function getSignalColour(id: string): SignalColour {
  if (ANOTHER_CRAPPY_CACHE[id]) {
    console.debug("[SIGNALS]: Cache hit ;)");
    // TODO: calc something here
    return ANOTHER_CRAPPY_CACHE[id].currentColor;
  }
  return "red";
}

export function calcCurrentSignalDetails(id: string, timing: {
  red: number, yellow: number, green: number
}): SignalPhase {
  const phaseTime = Object.values(timing).reduce((a, b) => a + b, 0);

  if (ANOTHER_CRAPPY_CACHE[id]) {
    const rec = ANOTHER_CRAPPY_CACHE[id];
    const timeDelta = (new Date().getTime() - rec.lastRed.getTime()) / 1000;
    const cycleCount = Math.floor(timeDelta / phaseTime);
    const offset = Math.round((timeDelta - cycleCount) * phaseTime);
    console.debug(`[SIGNALS]: Phase timing info for light ${id}:
    cycleCount: ${cycleCount}
    offset: ${offset}
    timeDelta: ${timeDelta}
    `)

    if (offset <= timing.red) {
      rec.lastRed = new Date();
      rec.currentColor = "red";
    } else if (offset <= timing.red + timing.yellow) {
      rec.currentColor = "yellow";
    } else {
      rec.currentColor = "green";
    }
    ANOTHER_CRAPPY_CACHE[id] = rec;
    return rec;
  }

  // Start on red
  const rec: SignalPhase = {
    id,
    lastRed: new Date(),
    currentColor: "red",
    timeRemaining: timing.red,
  }
  ANOTHER_CRAPPY_CACHE[id] = rec;
  return rec

}
