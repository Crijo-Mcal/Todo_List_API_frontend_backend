import type { Request, Response, NextFunction } from "express";
import { logInValidationSchema } from "../../schema/userValidation.js";


export function logInValidation(req: Request, res: Response, next: NextFunction): void {
    const validatio = logInValidationSchema.safeParse(req.body);
    const error = validatio.error?.format();

    if (!validatio.success) {
        res.status(400).json({
            success: false,
            err: {
                typeError: "validation",
                message: [
                    ...(error?.email?._errors || []),
                    ...(error?.password?._errors || []),
                ]
            }
        })
        req.body = validatio.data;
        return
    }

    next()

}