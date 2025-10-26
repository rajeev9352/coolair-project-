// import express from "express";
// import { subscribeNewsletter } from "../controllers/newsletterController";

// const router = express.Router();

// router.post("/subscribe", subscribeNewsletter);

// export default router;



import express from "express";
import { subscribeNewsletter, getSubscribers, deleteSubscriber } from "../controllers/newsletterController";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);
router.get("/subscribers", getSubscribers);
router.delete("/subscribe/:id", deleteSubscriber);

export default router;