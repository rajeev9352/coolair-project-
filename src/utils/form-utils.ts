import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }).optional(),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export const appointmentFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  serviceType: z.string().min(1, { message: 'Please select a service type' }),
  preferredDate: z.string().min(1, { message: 'Please select a preferred date' }),
  preferredTime: z.string().min(1, { message: 'Please select a preferred time' }),
  address: z.string().min(5, { message: 'Please enter a valid address' }),
  message: z.string().optional(),
});

export const newsletterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  className?: string;
  textarea?: boolean;
  options?: { value: string; label: string }[];
  select?: boolean;
}

export function getError<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>
): FieldError | undefined {
  return name.split('.').reduce((obj, key) => {
    return obj?.[key as keyof typeof obj] as FieldError | undefined;
  }, errors as any);
}

export function formatPhoneNumber(value: string): string {
  if (!value) return value;
  
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTimeSlots(date: Date = new Date()): string[] {
  const slots: string[] = [];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Round up to nearest 30 minutes
  const roundedMinutes = minutes < 30 ? 30 : 60;
  let startHour = roundedMinutes === 60 ? hours + 1 : hours;
  
  // If it's after business hours, start from next day
  if (startHour >= 17) {
    date.setDate(date.getDate() + 1);
    startHour = 9; // Business opens at 9 AM
  }
  
  // Generate time slots from current time to 5 PM
  for (let hour = startHour; hour < 17; hour++) {
    const startMinute = hour === startHour && roundedMinutes === 30 ? 30 : 0;
    for (let minute = startMinute; minute < 60; minute += 30) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const displayMinute = minute === 0 ? '00' : '30';
      slots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }
  
  return slots;
}

export const serviceTypes = [
  { value: 'installation', label: 'AC Installation' },
  { value: 'repair', label: 'AC Repair' },
  { value: 'maintenance', label: 'Regular Maintenance' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'duct-cleaning', label: 'Duct Cleaning' },
  { value: 'emergency', label: 'Emergency Service' },
];

// Form submission handler with error handling
export async function submitForm<T>(
  url: string,
  data: T,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    onSuccess(result);
  } catch (error) {
    console.error('Form submission error:', error);
    onError(error instanceof Error ? error.message : 'Something went wrong');
  }
}

// Form field validation rules
export const validationRules = {
  required: (message = 'This field is required') => ({
    required: message,
  }),
  minLength: (length: number, message: string) => ({
    minLength: {
      value: length,
      message,
    },
  }),
  maxLength: (length: number, message: string) => ({
    maxLength: {
      value: length,
      message,
    },
  }),
  pattern: (pattern: RegExp, message: string) => ({
    pattern: {
      value: pattern,
      message,
    },
  }),
  email: (message = 'Please enter a valid email address') => ({
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message,
    },
  }),
  phone: (message = 'Please enter a valid phone number') => ({
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      message,
    },
  }),
};

// Helper to combine multiple validation rules
export function combineValidations(...validations: any[]) {
  return validations.reduce((acc, validation) => ({
    ...acc,
    ...validation,
  }), {});
}

// Format form errors for display
export function formatFormErrors(errors: Record<string, any>): string[] {
  return Object.values(errors).reduce((acc: string[], error) => {
    if (error?.message) {
      acc.push(error.message);
    } else if (typeof error === 'string') {
      acc.push(error);
    } else if (Array.isArray(error)) {
      acc.push(...error);
    } else if (typeof error === 'object') {
      acc.push(...formatFormErrors(error));
    }
    return acc;
  }, []);
}
