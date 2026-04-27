import type { Request, Response } from "express";
import sigUpService from "../services/singUp.service.js";

export default async function singUpController(req: Request, res: Response) {
    try {
        const user = await sigUpService("dodo@gmail.com", "dodo123");

        res.json({
            success: true,
            message: "success to sing up"
        });

    } catch (err: any) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
}