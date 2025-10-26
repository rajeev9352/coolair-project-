import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { env } from '@/config/env';

// Initialize Resend with API key
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

// Backend API URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Define the schema for the request body
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validation = contactFormSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validation.data;
    
    try {
      // Save to PostgreSQL database via backend
      const backendResponse = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        }),
      });
      
      const backendResult = await backendResponse.json();
      
      if (!backendResponse.ok) {
        console.error('Backend error:', backendResult);
        throw new Error(backendResult.message || 'Failed to save to database');
      }
      
      console.log('Contact saved to database:', backendResult);
      
    } catch (dbError) {
      console.error('Database save error:', dbError);
      // Continue with email sending even if database fails
    }
    
    // Send emails if email service is configured
    if (env.RESEND_API_KEY && resend) {
      try {
        // Send email to admin
        await resend.emails.send({
          from: 'CoolAir <noreply@coolair.com>',
          to: env.ADMIN_EMAIL || 'admin@coolair.com',
          subject: `New Contact Form Submission from ${name}`,
          text: `
            New contact form submission:
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            
            Message:
            ${message}
          `,
        });

        // Send confirmation email to user
        await resend.emails.send({
          from: 'CoolAir Support <support@coolair.com>',
          to: email,
          subject: 'Thank you for contacting CoolAir',
          text: `
            Dear ${name},

            Thank you for contacting CoolAir. We have received your message and our team will get back to you as soon as possible.
            
            Best regards,
            The CoolAir Team
          `,
        });

        console.log('Emails sent successfully');
        
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We have saved your contact information and will get back to you soon.',
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}