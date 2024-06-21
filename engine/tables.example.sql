-- This is the example structure for SCATS data
-- It can only be used with Clickhouse

CREATE TABLE datacollection.rtv2_link_plans (
    `type` String,
    `region` String,
    `is_married` Boolean,
    `active_link_plan_id` UInt16,
    `actual_cycle_time` UInt32,
    `generation_time` DateTime64,
    `timestamp` DateTime64
) ENGINE = MergeTree PRIMARY KEY (region, timestamp);
CREATE TABLE datacollection.rtv2_lane_rec (
    `signal_id` UInt32,
    `signal_group` String,
    `signal_sa_ln_id` UInt16,
    `signal_record_type` String,
    `signal_lane_id` UInt8,
    `signal_lane_flow` UInt32,
    `generation_time` DateTime64,
    `timestamp` DateTime64
) ENGINE = MergeTree PRIMARY KEY (signal_id, signal_lane_id, timestamp);
CREATE TABLE datacollection.rtv2_stretch (
    `type` String,
    `region` String,
    `is_married` Boolean,
    `active_link_plan_id` UInt16,
    `actual_cycle_time` UInt32,
    `generation_time` DateTime64,
    `timestamp` DateTime64,
    `A` String,
    `C` String,
    `D` String,
    `B` String,
    `E` String,
    `G` String,
    `F` String,
) ENGINE = MergeTree PRIMARY KEY (region, timestamp);