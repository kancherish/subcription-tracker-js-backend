import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/signout",(req,res)=>{res.send({title:"Signing out a User"})})

export default authRouter