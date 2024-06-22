import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DB_URL } from "./config";

export async function initDB() {
  const client = new Client({
    connectionString: DB_URL,
  });

  await client.connect();
  return drizzle(client);
}

export const db = await initDB();
