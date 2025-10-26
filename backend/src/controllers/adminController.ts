import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest } from '../middleware/authMiddleware';
import { memoryDB } from '../storage/memoryDB';
import User from '../models/User';
import Contact from '../models/Contact';

const usePostgreSQL = process.env.USE_POSTGRESQL === 'true';

// User management
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    if (usePostgreSQL) {
      const users = await User.findAll({
        attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']]
      });
      
      res.json({ 
        success: true,
        database: 'PostgreSQL',
        count: users.length,
        users 
      });
    } else {
      const users = memoryDB.getAllUsers().map(user => ({
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
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createAdminUser = async (req: AuthRequest, res: Response) => {
  const { name, email, password, role = 'user' } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role. Must be user or admin' });
  }

  try {
    if (usePostgreSQL) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
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
    } else {
      const existingUser = memoryDB.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = memoryDB.createUser({
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
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
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
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      await user.destroy();
      res.json({ success: true, message: 'User deleted successfully' });
    } else {
      // For memory DB, we'd need to implement a delete method
      res.status(501).json({ success: false, message: 'Delete operation not implemented for memory database' });
    }
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Contact management
export const getAllContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (err) {
    console.error('Get contacts error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const contactId = parseInt(id);

  if (isNaN(contactId)) {
    return res.status(400).json({ success: false, message: 'Invalid contact ID' });
  }

  try {
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    await contact.destroy();
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};