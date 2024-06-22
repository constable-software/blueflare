-- ANPR Camera Locations (police data)
CREATE TABLE geo_anpr_camera (
    id int primary key,
    source varchar(128) not null,
    geom geometry(Point, 4326) not null,
    bearing double precision not null,
    street_name varchar(250),
    lga_name varchar(250),
    cwy_name varchar(250)
);
CREATE INDEX geo_anpr_camera_geom_x ON geo_anpr_camera USING GIST (geom);
-- ANPR Paths (police data)
CREATE TABLE geo_anpr_path (
    car_id varchar(25) not null,
    source varchar(256) not null,
    colour varchar(25) not null,
    make varchar(25) not null,
    model varchar(25) not null,
    camera_id int not null,
    bearing double precision not null,
    duration int not null,
    -- Use ST_Collect
    geom geometry(LineString, 4326) [] not null,
    CONSTRAINT geo_anpr_path_pkey FOREIGN KEY (camera_id) REFERENCES geo_anpr_camera(id) ON DELETE
    SET NULL
);
-- MRWA Signalised intersections
CREATE TABLE geo_signalised_intersection (
    id integer not null,
    geom geometry(Point, 4326),
    site_refer character varying(50),
    service_st character varying(50),
    signal_typ character varying(12),
    node_id double precision,
    node_name character varying(30),
    node_descr character varying(80)
);
CREATE INDEX geo_signalised_intersection_geom_x ON geo_signalised_intersection USING GIST (geom);

