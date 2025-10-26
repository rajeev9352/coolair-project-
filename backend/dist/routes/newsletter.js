"use strict";
// import express from "express";
// import { subscribeNewsletter } from "../controllers/newsletterController";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post("/subscribe", subscribeNewsletter);
// export default router;
const express_1 = __importDefault(require("express"));
const newsletterController_1 = require("../controllers/newsletterController");
const router = express_1.default.Router();
router.post("/subscribe", newsletterController_1.subscribeNewsletter);
router.get("/subscribers", newsletterController_1.getSubscribers);
router.delete("/subscribe/:id", newsletterController_1.deleteSubscriber);
exports.default = router;
