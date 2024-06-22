// File that contains table schema for PSQL cache used for storing
// lots of different info regarding the project

import { geometry, index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const routeCache = pgTable("route_cache", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 500 }),
  geom: geometry("geom", { srid: 4326, type: "linestring" }),
}, (tbl) => ({
  gist: index("route_cache_idx_geo").using("gist", tbl.geom),
}));
