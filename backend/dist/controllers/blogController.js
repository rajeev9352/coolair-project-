"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPosts = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const getBlogPosts = async (req, res) => {
    try {
        const posts = await Blog_1.default.findAll({ order: [["createdAt", "DESC"]] });
        res.status(200).json({ success: true, posts });
    }
    catch (error) {
        console.error("Error fetching blog posts:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
    }
};
exports.getBlogPosts = getBlogPosts;
const createBlogPost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Title and content are required" });
    }
    try {
        const post = await Blog_1.default.create({ title, content });
        res.status(201).json({ success: true, message: "Blog post created", post });
    }
    catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ success: false, message: "Failed to create blog post" });
    }
};
exports.createBlogPost = createBlogPost;
const updateBlogPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Title and content are required" });
    }
    try {
        const post = await Blog_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Blog post not found" });
        }
        await post.update({ title, content });
        res.status(200).json({ success: true, message: "Blog post updated", post });
    }
    catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ success: false, message: "Failed to update blog post" });
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Blog_1.default.destroy({ where: { id } });
        if (result) {
            res.status(200).json({ success: true, message: "Blog post deleted" });
        }
        else {
            res.status(404).json({ success: false, message: "Blog post not found" });
        }
    }
    catch (error) {
        console.error("Error deleting blog post:", error);
        res.status(500).json({ success: false, message: "Failed to delete blog post" });
    }
};
exports.deleteBlogPost = deleteBlogPost;
