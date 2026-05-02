import singUp_db from "../db/login-SingUp/singUp.db.js"
import { hash } from "../utility/bcrypt.js";
import { AppError } from "../utility/AppError.js";

/* logint */
import logIn from "../db/login-SingUp/logIn.js";
import { createAccessToken, createRefreshToken } from "../utility/jwtToken.js";
import { insert_RefreshToken, update_RefreshToken, isRefreshTokenExist } from "../db/login-SingUp/insert_RefreshToken.js";

export default async function singUpService(name: string, email: string, password: string) {

    try {
        const hash_password = await hash(password);
        await singUp_db(name, email, hash_password)

        /* log in immediately after signUp */
        const client = await logIn(email, password)
        const AccessToken = createAccessToken(client.id, client.email);
        const RefreshToken = createRefreshToken();

        insert_RefreshToken(RefreshToken, client.id);
        return { AccessToken, RefreshToken, success: true, user: { id: client.id, name: client.name, email: client.email } }

    } catch (err: any) {

        if (err.code === '23505') {
            throw new AppError("email already used", "email")
        }
        throw err
    }
}