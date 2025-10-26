"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
router.get("/posts", blogController_1.getBlogPosts);
router.post("/posts", blogController_1.createBlogPost);
router.put("/posts/:id", blogController_1.updateBlogPost);
router.delete("/posts/:id", blogController_1.deleteBlogPost);
exports.default = router;
