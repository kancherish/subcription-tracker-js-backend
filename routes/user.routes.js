import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/",authorize,getUsers);

userRouter.get("/:id",authorize,getUser);

userRouter.post("/",(req,res)=>{res.send({title:"creating a new user"})});

userRouter.put("/:id",(req,res)=>{res.send({title:"updating a  user"})});

userRouter.delete("/:id",(req,res)=>{res.send({title:"deleting a user"})});


export default userRouter;