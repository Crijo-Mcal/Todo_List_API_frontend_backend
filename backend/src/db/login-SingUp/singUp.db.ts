import { pool } from "../connection.js"

export type Clien_Data = {
    id: number,
    name: string,
    email: string,
    password: string
}

export default async function singUp_db(name: string, email: string, password: string): Promise<Clien_Data> {
    const res = await pool.query(
        `INSERT INTO client (name,email,password) VALUES ($1,$2,$3) RETURNING*`,
        [name, email, password]
    );

    const clinetData: Clien_Data = res.rows[0];
    return clinetData;
}