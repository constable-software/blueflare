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
CREATE INDEX geo_anpr_path_geom_x ON geo_anpr_path USING GIST (geom);