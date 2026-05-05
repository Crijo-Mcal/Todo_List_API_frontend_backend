import type { Request, Response, NextFunction } from "express";
import { singUpValidationSchema } from "../../schema/userValidation.js";


export function singUpValidation(req: Request, res: Response, next: NextFunction): void {
    const validatio = singUpValidationSchema.safeParse(req.body);
    const error = validatio.error?.format();

    if (!validatio.success) {
        res.status(400).json({
            success: false,
            err: {
                typeError: "validation",
                message: [
                    ...(error?.name?._errors || []),
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