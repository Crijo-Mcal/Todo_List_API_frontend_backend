
import { type Request, type Response, Router } from "express";
import logInController from "../controllers/login.controller.js"
import { logInValidation } from "../middleware/loginValidation.js"

const route = Router()

route.post('/login', logInValidation, logInController)


export default route;