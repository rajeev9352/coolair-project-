"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getAllContacts = exports.deleteUser = exports.createAdminUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const memoryDB_1 = require("../storage/memoryDB");
const User_1 = __importDefault(require("../models/User"));
const Contact_1 = __importDefault(require("../models/Contact"));
const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';
// User management
const getAllUsers = async (req, res) => {
    try {
        if (usePostgreSQL) {
            const users = await User_1.default.findAll({
                attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
                order: [['createdAt', 'DESC']]
            });
            res.json({
                success: true,
                database: 'PostgreSQL',
                count: users.length,
                users
            });
        }
        else {
            const users = memoryDB_1.memoryDB.getAllUsers().map(user => ({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt
            }));
            res.json({
                success: true,
                database: 'In-Memory',
                count: users.length,
                users
            });
        }
    }
    catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.getAllUsers = getAllUsers;
const createAdminUser = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role. Must be user or admin' });
    }
    try {
        if (usePostgreSQL) {
            const existingUser = await User_1.default.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ success: false, message: 'User already exists with this email' });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await User_1.default.create({
                email,
                password: hashedPassword,
                name: name || null,
                role
            });
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: { id: user.id, email: user.email, name: user.name, role: user.role }
            });
        }
        else {
            const existingUser = memoryDB_1.memoryDB.findUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ success: false, message: 'User already exists with this email' });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = memoryDB_1.memoryDB.createUser({
                email,
                password: hashedPassword,
                name: name || null,
                role
            });
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: { id: user.id, email: user.email, name: user.name, role: user.role }
            });
        }
    }
    catch (err) {
        console.error('Create user error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.createAdminUser = createAdminUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);
    if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    // Prevent admin from deleting themselves
    if (req.user?.id === userId) {
        return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }
    try {
        if (usePostgreSQL) {
            const user = await User_1.default.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            await user.destroy();
            res.json({ success: true, message: 'User deleted successfully' });
        }
        else {
            // For memory DB, we'd need to implement a delete method
            res.status(501).json({ success: false, message: 'Delete operation not implemented for memory database' });
        }
    }
    catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.deleteUser = deleteUser;
// Contact management
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact_1.default.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json({
            success: true,
            count: contacts.length,
            contacts
        });
    }
    catch (err) {
        console.error('Get contacts error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.getAllContacts = getAllContacts;
const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contactId = parseInt(id);
    if (isNaN(contactId)) {
        return res.status(400).json({ success: false, message: 'Invalid contact ID' });
    }
    try {
        const contact = await Contact_1.default.findByPk(contactId);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        await contact.destroy();
        res.json({ success: true, message: 'Contact deleted successfully' });
    }
    catch (err) {
        console.error('Delete contact error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.deleteContact = deleteContact;
