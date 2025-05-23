import { Router } from "express";

const subcriptionsRouter = Router();

subcriptionsRouter.get("/",(req,res)=>{res.send({title:"getting all subcriptions"})});

subcriptionsRouter.get("/:id",(req,res)=>{res.send({title:"getting a specific subcription"})});

subcriptionsRouter.post("/",(req,res)=>{res.send({title:"creating a subcription"})});

subcriptionsRouter.put("/:id",(req,res)=>{res.send({title:"updating a  subcription"})});

subcriptionsRouter.delete("/:id",(req,res)=>{res.send({title:"deleting a  subcription"})});

subcriptionsRouter.get("/user/:id",(req,res)=>{res.send({title:"getting a user all subcriptions"})});

subcriptionsRouter.put("/:id/cancel",(req,res)=>{res.send({title:"cancelling a  subcription"})});

subcriptionsRouter.get("/upcoming-renewals",(req,res)=>{res.send({title:"upcoming renwals  subcription"})});

export default subcriptionsRouter;