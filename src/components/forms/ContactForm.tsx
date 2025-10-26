'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactFormSchema, ContactFormData } from '@/utils/form-utils';
import { FormField, FormError, FormSuccess } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';

interface ContactFormProps {
  className?: string;
  onSuccess?: (data: ContactFormData) => void;
  submitButtonText?: string;
  showSuccessMessage?: boolean;
  showTitle?: boolean;
  variant?: 'default' | 'minimal';
}

export function ContactForm({
  className = '',
  onSuccess,
  submitButtonText = 'Send Message',
  showSuccessMessage = true,
  showTitle = true,
  variant = 'default',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccess('');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }

      if (showSuccessMessage) {
        setSuccess("Your message has been sent successfully! We'll get back to you soon.");
      }
      
      if (onSuccess) {
        onSuccess(data);
      }
      
      form.reset();
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClasses = variant === 'minimal' 
    ? 'space-y-4' 
    : 'bg-white shadow-sm rounded-lg p-6 sm:p-8 space-y-6';

  return (
    <div className={className}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={formClasses}>
        {showTitle && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        )}

        {error && <FormError message={error} />}
        {success && showSuccessMessage && <FormSuccess message={success} />}

        <div className={`${variant === 'minimal' ? 'space-y-4' : 'grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'}`}>
          <FormField
            name="name"
            label="Full Name"
            placeholder="John Doe"
            className={variant === 'minimal' ? '' : 'sm:col-span-2'}
          />

          <FormField
            name="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
          />

          <FormField
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="(123) 456-7890"
          />

          <FormField
            name="subject"
            label="Subject"
            placeholder="How can we help you?"
            className="sm:col-span-2"
          />

          <FormField
            name="message"
            label="Message"
            type="textarea"
            rows={5}
            placeholder="Tell us more about your needs..."
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size={variant === 'minimal' ? 'md' : 'lg'}
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            {submitButtonText}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 text-center">
          We'll get back to you within 24 hours. Your information is secure and will never be shared.
        </p>
      </form>
    </div>
  );
}
