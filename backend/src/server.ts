import express from "express";
import dotenv from "dotenv";
import login_route from "./routes/login.route.js"
import singUp_route from "./routes/singUp.route.js"
import globalErrorHandles from "./middleware/globalErrorHandles.js";
import showAllTask from "./routes/showAllTask.route.js"
import cors from "cors";

dotenv.config();
const poth = process.env.BACKEND_PORTH || 3000;
const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("server is running");
})

/* routes */
app.use('/', login_route);
app.use('/', singUp_route);
app.use('/', showAllTask);


/* haldle Global Error */
app.use(globalErrorHandles)


app.listen(poth, () => {
    console.log(`sever is running on porth ${poth}`);
})