import { Request, Response } from "express";
import Blog from "../models/Blog";

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  try {
    const post = await Blog.create({ title, content });
    res.status(201).json({ success: true, message: "Blog post created", post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ success: false, message: "Failed to create blog post" });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required" });
  }

  try {
    const post = await Blog.findByPk(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }
    await post.update({ title, content });
    res.status(200).json({ success: true, message: "Blog post updated", post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ success: false, message: "Failed to update blog post" });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Blog.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ success: true, message: "Blog post deleted" });
    } else {
      res.status(404).json({ success: false, message: "Blog post not found" });
    }
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog post" });
  }
};