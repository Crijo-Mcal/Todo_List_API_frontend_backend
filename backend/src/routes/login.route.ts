
import { type Request, type Response, Router } from "express";
import logInController from "../controllers/login.controller.js"

const route = Router()

route.get('/login', logInController)


export default route;