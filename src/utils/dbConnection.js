import pg from "pg";

const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;

// Use the connection string from environment variable
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
