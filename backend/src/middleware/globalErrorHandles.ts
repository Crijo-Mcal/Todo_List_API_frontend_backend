import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utility/AppError.js";
import type { ResponseType } from "../types/bd_types.js";

export default function HandleGlobalError(err: any, req: Request, res: Response, next: NextFunction): void {

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            err: {
                typeError: err.typeError,
                message: err.message
            }
        });
        return
    }

    console.error(err.message);

    res.status(500).json({
        success: false,
        err: {
            message: err.message
        }
    });

}