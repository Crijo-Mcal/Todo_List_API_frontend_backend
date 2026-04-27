import e from "express"
import { pool } from "./connection.js"
import bcrypt from "bcrypt";

const email = "querry@gmail.com";
const password = "querry123";

export default async function auth(): Promise<boolean> {

    const res = await pool.query(`SELECT * FROM client WHERE email ='${email}'`)
    const data = res.rows[0];

    if (data.email === email) {
        return true
    }

    return false;

}