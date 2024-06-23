// File that contains table schema for PSQL cache used for storing
// lots of different info regarding the project

import {
  geometry,
  index,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const routeCache = pgTable("route_cache", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 500 }),
  geom: geometry("geom", { srid: 4326, type: "linestring" }),
}, (tbl) => ({
  gist: index("route_cache_idx_geo").using("gist", tbl.geom),
}));

export const trafficLightCache = pgTable("traffic_light_cache", {
  id: serial("id").primaryKey(),
  mrwa_id: varchar("key", { length: 500 }),
  timing_red: integer("timing_red").notNull(),
  timing_yellow: integer("timing_yellow").notNull(),
  timing_green: integer("timing_green").notNull(),
}, (tbl) => ({
  unique: index("traffic_light_cache_idx").on(tbl.mrwa_id),
}));
