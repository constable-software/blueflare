import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DB_URL } from "./config";

export function initDB() {
  const client = new Client({
    connectionString: DB_URL,
  });

  client.connect()
    .then(() => console.log("Connected to database"));
  return drizzle(client);
}

export const db = initDB();
