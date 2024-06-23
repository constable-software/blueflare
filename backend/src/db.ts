import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DB_URL } from "./config";

const pool = new Pool({
    connectionString: DB_URL,
});

pool.connect()
    .then(() => {
        console.log("Connected to Postgres");
    })

export const db = drizzle(pool);
