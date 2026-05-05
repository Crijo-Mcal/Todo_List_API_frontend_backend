import { Router } from "express";
import taskController from "../controllers/showAllTask.controller.js";
import validation_showAllTask from "../middleware/validation/validation_showAllTask.js"

const route = Router()

route.post('/showAlltask', validation_showAllTask, taskController)


export default route;