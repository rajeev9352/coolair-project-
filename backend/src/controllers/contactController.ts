import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const saveContact = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required fields' });
  }
  
  try {
    const contact = await Contact.create({ name, email, phone, message });
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
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error while saving contact',
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
};

// Get all contacts (for admin purposes)
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({
      success: true,
      contacts
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching contacts'
    });
  }
};

