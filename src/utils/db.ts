import { Pool } from "pg";

const pool = new Pool({
  user: "fling_adc",
  host: "localhost",
  database: "fling_db",
  password: "Dinoperro.9511",
  port: 5432,
});

export async function getUserFromDb(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}