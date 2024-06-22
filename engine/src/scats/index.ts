import {
  SCATSLaneRecord,
  SCATSLinkPlan,
  SCATSRaw,
  SCATSStretchedPhase,
} from "./types";

export function scatsToLanes(msg: SCATSRaw): SCATSLaneRecord[] {
  return msg.SM.map((site) =>
    site.Lanes.map((lane) =>
      ({
        signal_id: site.LM,
        signal_sa_ln_id: site["SA/LK"],
        signal_record_type: site.RT,
        signal_group: site.SG,
        signal_lane_flow: lane.MF,
        signal_lane_id: lane.L,
        generation_time: new Date(new Date()),
        timestamp: new Date(msg.TS),
      }) as SCATSLaneRecord
    )
  ).flat(Infinity) as SCATSLaneRecord[];
}

export function scatsToLinkPlan(msg: SCATSRaw): SCATSLinkPlan {
  return {
    type: msg.MessageType,
    region: msg.REG,
    is_married: msg.M,
    active_link_plan_id: msg.LP,
    actual_cycle_time: msg.CT,
    generation_time: new Date(new Date()),
    timestamp: new Date(msg.TS),
  };
}

export function scatsToStretchedPhases(msg: SCATSRaw): SCATSStretchedPhase[] {
  return msg.SP.map((sp) => ({
    ...sp,
    type: msg.MessageType,
    region: msg.REG,
    is_married: msg.M,
    active_link_plan_id: msg.LP,
    actual_cycle_time: msg.CT,
    generation_time: new Date(new Date()),
    timestamp: new Date(msg.TS),
  }));
}
