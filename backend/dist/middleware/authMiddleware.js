"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const memoryDB_1 = require("../storage/memoryDB");
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (usePostgreSQL) {
            const user = await User_1.default.findByPk(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = { id: user.id, email: user.email, role: user.role };
        }
        else {
            const user = memoryDB_1.memoryDB.findUserById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = { id: user.id, email: user.email, role: user.role };
        }
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
exports.requireAdmin = requireAdmin;
