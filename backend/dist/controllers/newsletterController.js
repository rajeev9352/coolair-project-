"use strict";
// import { Request, Response } from "express";
// import Newsletter from "../models/Newsletter";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriber = exports.getSubscribers = exports.subscribeNewsletter = void 0;
const Newsletter_1 = __importDefault(require("../models/Newsletter"));
const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }
    try {
        const existing = await Newsletter_1.default.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already subscribed" });
        }
        const subscriber = await Newsletter_1.default.create({ email });
        res.status(201).json({ success: true, message: "Subscribed successfully", subscriber });
    }
    catch (error) {
        console.error("Subscription error:", error);
        res.status(500).json({ success: false, message: "Subscription failed" });
    }
};
exports.subscribeNewsletter = subscribeNewsletter;
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter_1.default.findAll();
        res.status(200).json({ success: true, subscribers });
    }
    catch (error) {
        console.error("Error fetching subscribers:", error);
        res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
    }
};
exports.getSubscribers = getSubscribers;
const deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Newsletter_1.default.destroy({ where: { id } });
        if (result) {
            res.status(200).json({ success: true, message: "Subscriber deleted" });
        }
        else {
            res.status(404).json({ success: false, message: "Subscriber not found" });
        }
    }
    catch (error) {
        console.error("Error deleting subscriber:", error);
        res.status(500).json({ success: false, message: "Failed to delete subscriber" });
    }
};
exports.deleteSubscriber = deleteSubscriber;
