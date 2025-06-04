import { Router } from "express";
import { cancelASubscription, createSubscription, deleteSubscription, getAllSubscription, getUserSubscription, updateAsubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subcriptionsRouter = Router();

subcriptionsRouter.get("/",authorize,getAllSubscription);

subcriptionsRouter.get("/:id",authorize,getUserSubscription);

subcriptionsRouter.post("/",authorize,createSubscription);

subcriptionsRouter.put("/:id",authorize,updateAsubscription);

subcriptionsRouter.delete("/:id",authorize,deleteSubscription);

subcriptionsRouter.put("/:id/cancel",authorize,cancelASubscription);

export default subcriptionsRouter;