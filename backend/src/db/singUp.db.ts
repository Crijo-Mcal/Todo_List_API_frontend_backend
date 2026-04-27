import { pool } from "./connection.js"

export default async function singUp_db(email: string, password: string) {

    const res = await pool.query(
        `INSERT INTO client (email,password) VALUES ($1,$2) RETURNING *`,
        [email, password]
    );

    return res.rows[0];

}