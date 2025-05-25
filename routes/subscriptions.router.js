import { Router } from "express";
import { cancelASubscription, createSubscription, deleteSubscription, getUserAllSubscriptions, getUserSubscription } from "../controllers/subscription.controller";
import authorize from "../middlewares/auth.middleware";

const subcriptionsRouter = Router();

subcriptionsRouter.get("/",(req,res)=>{res.send({title:"getting all subcriptions"})});

subcriptionsRouter.get("/:id",authorize,getUserSubscription);

subcriptionsRouter.post("/",authorize,createSubscription);

subcriptionsRouter.put("/:id",(req,res)=>{res.send({title:"updating a  subcription"})});

subcriptionsRouter.delete("/:id",authorize,deleteSubscription);

subcriptionsRouter.get("/user/:id",authorize,getUserAllSubscriptions);

subcriptionsRouter.put("/:id/cancel",authorize,cancelASubscription);

subcriptionsRouter.get("/upcoming-renewals",(req,res)=>{res.send({title:"upcoming renwals  subcription"})});

export default subcriptionsRouter;