CREATE TABLE IF NOT EXISTS "route_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(500),
	"geom" geometry(linestring)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "route_cache_idx_geo" ON "route_cache" USING gist ("geom");