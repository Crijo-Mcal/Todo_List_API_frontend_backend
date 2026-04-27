import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORTH),
    password: process.env.DB_PASSWORD
})


