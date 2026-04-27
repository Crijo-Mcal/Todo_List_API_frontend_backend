import singUp_db from "../db/singUp.db.js"
import { hash } from "../utility/bcrypt.js";


export default async function sigUpService(email: string, password: string) {

    try {
        const hash_password = await hash(password);
        const data = await singUp_db(email, hash_password)

        return data
    } catch (err: any) {

        if (err.code === '23505') {
            throw { status: 409, message: "email already used" }
        }
        throw err
    }
}