// import { Request, Response } from "express";
// import Newsletter from "../models/Newsletter";


// export const subscribeNewsletter = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   // Basic email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: "Please enter a valid email address" });
//   }

//   try {
//     const existing = await Newsletter.findOne({ where: { email } });
//     if (existing) {
//       return res.status(400).json({ message: "Email already subscribed" });
//     }

//     const subscriber = await Newsletter.create({ email });
//     res.status(201).json({ message: "Subscribed successfully", subscriber });
//   } catch (error) {
//     console.error("Subscription error:", error);
//     res.status(500).json({ message: "Subscription failed" });
//   }
// };






import { Request, Response } from "express";
import Newsletter from "../models/Newsletter";

export const subscribeNewsletter = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address" });
  }

  try {
    const existing = await Newsletter.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already subscribed" });
    }

    const subscriber = await Newsletter.create({ email });
    res.status(201).json({ success: true, message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await Newsletter.findAll();
    res.status(200).json({ success: true, subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
  }
};

export const deleteSubscriber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Newsletter.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ success: true, message: "Subscriber deleted" });
    } else {
      res.status(404).json({ success: false, message: "Subscriber not found" });
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to delete subscriber" });
  }
};