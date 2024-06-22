import WebSocket, { MessageEvent } from "ws";
import { MRWA_URL } from "./config";
import { scatsToLanes, scatsToLinkPlan, scatsToStretchedPhases } from "./scats";
import { SCATSRaw } from "./scats/types";

function onMessage(msg: MessageEvent) {
  const data: SCATSRaw[] = JSON.parse(msg.data.toString());
  data.forEach((r) => {
    const lanes = scatsToLanes(r);
    const linkPlan = scatsToLinkPlan(r);
    const stretch = scatsToStretchedPhases(r);
    //  Do something with the data here
    console.log({
      lanes,
      linkPlan,
      stretch,
    });
  });
}

async function main() {
  const ws = new WebSocket(MRWA_URL);
  ws.onopen = () => console.log("Opened!");
  ws.onclose = () => {
    console.log("Closed, restarting");
    main();
  };
  ws.onmessage = onMessage;
}

main();
