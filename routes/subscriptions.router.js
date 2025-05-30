import { Router } from "express";
import { cancelASubscription, createSubscription, deleteSubscription, getAllSubscription, getUserAllSubscriptions, getUserSubscription, updateAsubscription } from "../controllers/subscription.controller";
import authorize from "../middlewares/auth.middleware";

const subcriptionsRouter = Router();

subcriptionsRouter.get("/",authorize,getAllSubscription);

subcriptionsRouter.get("/:id",authorize,getUserSubscription);

subcriptionsRouter.post("/",authorize,createSubscription);

subcriptionsRouter.put("/:id",authorize,updateAsubscription);

subcriptionsRouter.delete("/:id",authorize,deleteSubscription);

subcriptionsRouter.get("/user/:id",authorize,getUserAllSubscriptions);

subcriptionsRouter.put("/:id/cancel",authorize,cancelASubscription);

export default subcriptionsRouter;