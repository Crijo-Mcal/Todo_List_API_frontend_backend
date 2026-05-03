import type { Request, Response, NextFunction } from "express";
import singUpService from "../services/singUp.service.js";

export default async function singUpController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const responsesingUp = await singUpService(name, email, password);


        if (responsesingUp?.RefreshToken) {
            res.cookie("refreshToken", responsesingUp.RefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            })
        }

        res.status(200).json({ success: true, data: responsesingUp.data })

        return;

    } catch (err: any) {
        next(err);
    }
}