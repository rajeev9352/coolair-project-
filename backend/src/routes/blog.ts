import express from "express";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "../controllers/blogController";

const router = express.Router();

router.get("/posts", getBlogPosts);
router.post("/posts", createBlogPost);
router.put("/posts/:id", updateBlogPost);
router.delete("/posts/:id", deleteBlogPost);

export default router;