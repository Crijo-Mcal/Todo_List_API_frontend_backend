
import { Router } from "express";
import singUpController from "../controllers/singUp.controller.js"
import { singUpValidation } from "../middleware/validation/singUpValidation.js"

const route = Router()

route.post('/singUp', singUpValidation, singUpController)


export default route;