"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = exports.saveContact = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const saveContact = async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required fields' });
    }
    try {
        const contact = await Contact_1.default.create({ name, email, phone, message });
        console.log('Contact saved to database:', contact.toJSON());
        res.status(201).json({
            success: true,
            message: 'Contact saved successfully',
            contact: {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                message: contact.message,
                createdAt: contact.createdAt
            }
        });
    }
    catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while saving contact',
            error: process.env.NODE_ENV === 'development' ? err : undefined
        });
    }
};
exports.saveContact = saveContact;
// Get all contacts (for admin purposes)
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact_1.default.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            success: true,
            contacts
        });
    }
    catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching contacts'
        });
    }
};
exports.getAllContacts = getAllContacts;
