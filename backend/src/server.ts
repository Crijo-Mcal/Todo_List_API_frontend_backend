import express from "express";
import dotenv from "dotenv";
import login_route from "./routes/login.route.js"
import singUp_route from "./routes/singUp.route.js"

dotenv.config();
const app = express();
const poth = process.env.BACKEND_PORTH || 3000;

app.get('/', (req, res) => {
    res.send("server is running");
})

/* routes */
app.use('/', login_route);
app.use('/', singUp_route);



app.listen(poth, () => {
    console.log(`sever is running on porth ${poth}`);
})