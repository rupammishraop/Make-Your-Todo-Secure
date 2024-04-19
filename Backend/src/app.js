import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json( { limit: '16kb' })); // recieve data from json formate
app.use(express.urlencoded({ extended : true, limit : "16kb"})) // recieve data from link and url
app.use(express.static("public")) // to handle files like img and pdf etc.
app.use(cookieParser()) // to set  , get and remove cookies in user browser
// export default app 


 // import routes
 import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter)
export {app}