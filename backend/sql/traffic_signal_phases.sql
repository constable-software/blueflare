CREATE TABLE IF NOT EXISTS "traffic_light_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(500),
	"timing_red" integer NOT NULL,
	"timing_yellow" integer NOT NULL,
	"timing_green" integer NOT NULL
);
CREATE INDEX IF NOT EXISTS "traffic_light_cache_idx" ON "traffic_light_cache" USING btree ("key");
