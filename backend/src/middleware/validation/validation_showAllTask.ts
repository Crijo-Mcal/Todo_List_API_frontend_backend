import type { Request, Response, NextFunction } from "express"
import { success } from "zod"

export default function showAllTaskValidation(req: Request, res: Response, next: NextFunction) {

    const accessToken = req.headers.authorization


    if (!accessToken) {
        return res.status(401).json({ success: false, message: "required access token" })
    }

    if (!req.body.id) {
        return res.status(401).json({ success: false, message: "required id client" })
    }

    if (req.body?.id) {
        if (isNaN(Number(req.body.id))) {
            return res.status(401).json({ success: false, message: "id must be number" })
        }
    }

    next()

}