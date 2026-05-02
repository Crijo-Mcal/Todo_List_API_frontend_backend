import type { Request, Response, NextFunction } from "express";
import logInService from "../services/logIn.service.js"
import type { ResponseType } from "../types/bd_types.js"

export default async function logInController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const responseLogIn: ResponseType = await logInService(email, password)

        if (responseLogIn?.RefreshToken) {
            res.cookie("refreshToken", responseLogIn.RefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            })
        }



        res.status(200).json({ success: true, data: responseLogIn.data })

    } catch (err: any) {
        next(err)
    }
}