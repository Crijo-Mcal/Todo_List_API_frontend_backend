
import type { Request, Response } from "express";
import auth from "../db/auth_db.js"


export default function logInController(req: Request, res: Response): void {
    res.send("login");
}