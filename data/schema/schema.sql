drop table if exists incidents;
create table incidents (
    objectid decimal,
    acc_id decimal,
    road_no text,
    road_name text,
    common_road_name text,
    cway text,
    slk decimal,
    intersection_no decimal,
    intersection_desc text,
    longitude decimal,
    latitude decimal,
    crash_time decimal,
    severity text,
    incident_type text,
    priority text
);
\copy incidents from 'seed_incidents.csv' with (format csv);

drop table if exists resources;
create table resources (
    station_name text,
    latitudes decimal,
    longitudes decimal,
    capability_1 decimal,
    capability_2 decimal,
    capability_3 decimal,
    capability_4 decimal,
    capability_5 decimal,
    capability_1_maintenance decimal,
    capability_1_deployed decimal,
    capability_1_available decimal,
    capability_2_maintenance decimal,
    capability_2_deployed decimal,
    capability_2_available decimal,
    capability_3_maintenance decimal,
    capability_3_deployed decimal,
    capability_3_available decimal,
    capability_4_maintenance decimal,
    capability_4_deployed decimal,
    capability_4_available decimal,
    capability_5_maintenance decimal,
    capability_5_deployed decimal,
    capability_5_available decimal,
    capability_1_deployed_latitude decimal,
    capability_1_deployed_longitude decimal,
    capability_2_deployed_latitude decimal,
    capability_2_deployed_longitude decimal,
    capability_3_deployed_latitude decimal,
    capability_3_deployed_longitude decimal,
    capability_4_deployed_latitude decimal,
    capability_4_deployed_longitude decimal,
    capability_5_deployed_latitude decimal,
    capability_5_deployed_longitude decimal
);
\copy resources from 'seed_resources.csv' with (format csv);

drop table if exists incidents_resources_required;
create table incidents_resources_required (
    incident_type text,
    priority text,
    optimisation_1 text,
    optimisation_2 text,
    capabilty_preference_order text,
    capability_1 boolean,
    capability_2 boolean,
    capability_3 boolean,
    capability_4 boolean,
    capability_5 boolean
);
\copy incidents_resources_required from 'seed_incidents_resources_required.csv' with (format csv);
