import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { memoryDB } from '../storage/memoryDB';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';

export const register = async (req: Request, res: Response) => {
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
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(409).json({ message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        name: name || null,
        role: role || 'user'  // Use provided role or default to 'user'
      });

      console.log('User created in PostgreSQL:', { id: user.id, email: user.email, role: user.role });
      const totalUsers = await User.count();
      console.log('Total users in PostgreSQL:', totalUsers);

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
        database: 'PostgreSQL'
      });
    } else {
      // In-memory mode
      const existingUser = memoryDB.findUserByEmail(email);
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(409).json({ message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = memoryDB.createUser({
        email,
        password: hashedPassword,
        name: name || null,
        role: role || 'user'  // Use provided role or default to 'user'
      });

      console.log('User created in memory:', { id: user.id, email: user.email, role: user.role });
      const totalUsers = memoryDB.getAllUsers().length;
      console.log('Total users in memory:', totalUsers);

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
        database: 'In-Memory'
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
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
      const user = await User.findOne({ where: { email } });
      console.log('PostgreSQL user found:', user ? { id: user.id, email: user.email, role: user.role } : 'No user found');
      
      if (!user) {
        console.log('User not found in PostgreSQL for email:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('PostgreSQL password valid:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('Invalid password for PostgreSQL user:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

      console.log('PostgreSQL login successful for user:', email);
      res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
        database: 'PostgreSQL'
      });
    } else {
      // In-memory mode
      const user = memoryDB.findUserByEmail(email);
      console.log('Memory user found:', user ? { id: user.id, email: user.email, role: user.role } : 'No user found');
      
      if (!user) {
        console.log('User not found in memory for email:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Memory password valid:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('Invalid password for memory user:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

      console.log('Memory login successful for user:', email);
      res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token,
        database: 'In-Memory'
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Debug endpoint to list all users (development only)
export const getAllUsers = async (req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }
  
  try {
    if (usePostgreSQL) {
      // PostgreSQL mode
      const users = await User.findAll({
        attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']]
      });
      
      res.json({ 
        message: 'All users (debug)',
        database: 'PostgreSQL',
        count: users.length,
        users 
      });
    } else {
      // In-memory mode
      const users = memoryDB.getAllUsers().map(user => ({
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
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};