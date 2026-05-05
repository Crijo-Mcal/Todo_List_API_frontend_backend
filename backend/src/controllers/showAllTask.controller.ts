import type { Request, Response, NextFunction } from "express";
import showAllTaskService from '../services/showAllTask.service.js'

export default async function taskController(req: Request, res: Response, next: NextFunction) {

    try {

        const accessToken = req.headers.authorization?.split(' ')[1] || "default";
        const { id } = req.body

        const result = await showAllTaskService(id, accessToken)

        return res.status(200).json(result);

    } catch (err: any) {
        next(err);
    }

}