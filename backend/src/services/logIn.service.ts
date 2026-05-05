import logIn from "../db/client/logIn.js";

import { createAccessToken, createRefreshToken } from "../utility/jwtToken.js";
import { insert_RefreshToken, update_RefreshToken, isRefreshTokenExist } from "../db/client/insert_RefreshToken.js";
import type { ResponseType } from "../types/bd_types.js";

export default async function logInService(email: string, password: string): Promise<ResponseType> {

    try {
        const client = await logIn(email, password)
        const AccessToken = createAccessToken(client.id, client.email);
        const RefreshToken = createRefreshToken();

        const istokenExistInDb = await isRefreshTokenExist(client.id)

        if (istokenExistInDb) {
            update_RefreshToken(RefreshToken, client.id)
        } else {
            insert_RefreshToken(RefreshToken, client.id);
        }


        return {
            RefreshToken, data: { AccessToken, user: { id: client.id, name: client.name, email: client.email } }
        }
    } catch (err: any) {
        throw err;
    }

}