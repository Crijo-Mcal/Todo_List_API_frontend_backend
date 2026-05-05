import { checkAccessToken } from '../utility/jwtToken.js'
import { AppError } from '../error/AppError.js'
import { selectAllTask } from '../db/task.js'

export default async function showAllTaskService(id: number, accesToken: string) {

    try {
        const isTokenValided = checkAccessToken(accesToken);

        const data = await selectAllTask(id)

        if (!isTokenValided) {
            return new AppError("access token not valid", "ccessToken", 401)
        }

        return data
    } catch (err: any) {
        throw err;
    }

}