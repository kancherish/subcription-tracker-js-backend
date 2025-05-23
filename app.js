import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subcriptionsRouter from "./routes/subscriptions.router.js";
import { connectToDatabase } from "./database/mongodb.js";
import { errorMiddleware } from "./middlewares/ error.middleware.js";
import cookieParser from "cookie-parser";
import { arjectMiddleware } from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(arjectMiddleware);

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/subscriptions",subcriptionsRouter);

app.use(errorMiddleware);



app.get('/',(req,res)=>{
    res.send("WELCOME TO BACKEND WORLD");
})

app.listen(PORT,async()=>{
    await connectToDatabase();
    console.log(`APP IS LISTENING ON PORT http://localhost:${PORT}`);
})