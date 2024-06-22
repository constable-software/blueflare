export interface SCATSRaw {
  MessageType: string;
  REG: string;
  TS: string;
  M: boolean;
  LP: number;
  CT: number;
  SM: SCATSSM[];
  SP: SCATSSP[];
}

export interface SCATSSM {
  LM: number;
  "SA/LK": number;
  RT: string;
  SG: string;
  PT: number;
  Lanes: Lane[];
}

export interface Lane {
  L: number;
  MF: number;
}

export interface SCATSSP {
  A: string;
  C?: string;
  D?: string;
  B?: string;
  E?: string;
  G?: string;
  F?: string;
}

export interface SCATSBase {
  generation_time: Date;
  timestamp: Date;
}

export interface SCATSLinkPlan extends SCATSBase {
  type: string;
  region: string;
  is_married: boolean;
  active_link_plan_id: number;
  actual_cycle_time: number;
}

export interface SCATSLaneRecord extends SCATSBase {
  signal_id: number;
  signal_group: string;
  signal_sa_ln_id: number;
  signal_record_type: string;
  signal_lane_id: number;
  signal_lane_flow: number;
}

export interface SCATSStretchedPhase extends SCATSLinkPlan, SCATSSP {}
