"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const memoryDB_1 = require("../storage/memoryDB");
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';
const register = async (req, res) => {
    try {
        console.log('Register request body:', req.body);
        const { name, email, password, role } = req.body;
        console.log('Register attempt:', { name, email, password: password ? '[PROVIDED]' : '[MISSING]', role: role || 'user', database: usePostgreSQL ? 'PostgreSQL' : 'In-Memory' });
        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if (usePostgreSQL) {
            // PostgreSQL mode
            const existingUser = await User_1.default.findOne({ where: { email } });
            if (existingUser) {
                console.log('User already exists:', email);
                return res.status(409).json({ message: 'User already exists with this email' });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await User_1.default.create({
                email,
                password: hashedPassword,
                name: name || null,
                role: role || 'user' // Use provided role or default to 'user'
            });
            console.log('User created in PostgreSQL:', { id: user.id, email: user.email, role: user.role });
            const totalUsers = await User_1.default.count();
            console.log('Total users in PostgreSQL:', totalUsers);
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'User registered successfully',
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                database: 'PostgreSQL'
            });
        }
        else {
            // In-memory mode
            const existingUser = memoryDB_1.memoryDB.findUserByEmail(email);
            if (existingUser) {
                console.log('User already exists:', email);
                return res.status(409).json({ message: 'User already exists with this email' });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = memoryDB_1.memoryDB.createUser({
                email,
                password: hashedPassword,
                name: name || null,
                role: role || 'user' // Use provided role or default to 'user'
            });
            console.log('User created in memory:', { id: user.id, email: user.email, role: user.role });
            const totalUsers = memoryDB_1.memoryDB.getAllUsers().length;
            console.log('Total users in memory:', totalUsers);
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.status(201).json({
                message: 'User registered successfully',
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                database: 'In-Memory'
            });
        }
    }
    catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password: password ? '[PROVIDED]' : '[MISSING]', database: usePostgreSQL ? 'PostgreSQL' : 'In-Memory' });
        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if (usePostgreSQL) {
            // PostgreSQL mode
            const user = await User_1.default.findOne({ where: { email } });
            console.log('PostgreSQL user found:', user ? { id: user.id, email: user.email, role: user.role } : 'No user found');
            if (!user) {
                console.log('User not found in PostgreSQL for email:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            console.log('PostgreSQL password valid:', isPasswordValid);
            if (!isPasswordValid) {
                console.log('Invalid password for PostgreSQL user:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            console.log('PostgreSQL login successful for user:', email);
            res.json({
                message: 'Login successful',
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                database: 'PostgreSQL'
            });
        }
        else {
            // In-memory mode
            const user = memoryDB_1.memoryDB.findUserByEmail(email);
            console.log('Memory user found:', user ? { id: user.id, email: user.email, role: user.role } : 'No user found');
            if (!user) {
                console.log('User not found in memory for email:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            console.log('Memory password valid:', isPasswordValid);
            if (!isPasswordValid) {
                console.log('Invalid password for memory user:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            console.log('Memory login successful for user:', email);
            res.json({
                message: 'Login successful',
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                database: 'In-Memory'
            });
        }
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
// Debug endpoint to list all users (development only)
const getAllUsers = async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(404).json({ message: 'Not found' });
    }
    try {
        if (usePostgreSQL) {
            // PostgreSQL mode
            const users = await User_1.default.findAll({
                attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
                order: [['createdAt', 'DESC']]
            });
            res.json({
                message: 'All users (debug)',
                database: 'PostgreSQL',
                count: users.length,
                users
            });
        }
        else {
            // In-memory mode
            const users = memoryDB_1.memoryDB.getAllUsers().map(user => ({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt
            }));
            res.json({
                message: 'All users (debug)',
                database: 'In-Memory',
                count: users.length,
                users
            });
        }
    }
    catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllUsers = getAllUsers;
