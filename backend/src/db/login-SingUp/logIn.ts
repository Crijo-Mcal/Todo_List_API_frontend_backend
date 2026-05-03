import { pool } from "../connection.js"
import { compareHashPassword } from "../../utility/bcrypt.js";
import { AppError } from "../../utility/AppError.js"


export type Clien_Data = {
    id: number,
    name: string,
    email: string,
    password: string
}

export default async function auth(email: string, password: string): Promise<Clien_Data> {

    const res = await pool.query("SELECT * FROM client WHERE email = $1", [email])
    const data: Clien_Data | undefined = res.rows[0];

    if (!data) {
        throw new AppError("email not exist", "email", 400)
    }

    const isPasswordMatch = await compareHashPassword(password, data.password);

    if (!isPasswordMatch) {
        throw new AppError("password not correct", "password", 400)
    }

    return data;

}