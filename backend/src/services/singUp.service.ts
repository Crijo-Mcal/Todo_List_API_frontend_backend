import singUp_db from "../db/client/singUp.db.js"
import { hash } from "../utility/bcrypt.js";
import { AppError } from "../error/AppError.js";

/* logint */
import logIn from "../db/client/logIn.js";
import { createAccessToken, createRefreshToken } from "../utility/jwtToken.js";
import { insert_RefreshToken, update_RefreshToken, isRefreshTokenExist } from "../db/client/insert_RefreshToken.js";

export default async function singUpService(name: string, email: string, password: string) {

    try {
        const hash_password = await hash(password);
        const client = await singUp_db(name, email, hash_password)

        const AccessToken = createAccessToken(client.id, client.email);
        const RefreshToken = createRefreshToken();

        insert_RefreshToken(RefreshToken, client.id);

        return {
            RefreshToken, data: { AccessToken, user: { id: client.id, name: client.name, email: client.email } }
        }

    } catch (err: any) {

        if (err.code === '23505') {
            throw new AppError("email already used", "email", 400)
        }
        throw err
    }
}