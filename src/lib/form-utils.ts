import { useForm, UseFormReturn, SubmitHandler, UseFormProps, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType, ZodTypeDef } from 'zod';
import { useEffect, useState } from 'react';
import { ApiError } from './api-error';

type ServerErrors = {
  field?: string;
  message: string;
}[];

type UseZodFormProps<
  TFormValues extends FieldValues,
  Schema extends ZodType<TFormValues>
> = {
  schema: Schema;
  options?: Omit<UseFormProps<TFormValues>, 'resolver'>;
  defaultValues?: Partial<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  onSuccess?: (data: TFormValues) => void | Promise<void>;
  onError?: (error: unknown) => void;
};

type FormState<TFormValues> = {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  serverErrors: ServerErrors;
  resetForm: () => void;
  setServerError: (error: unknown) => void;
  
};

export function useZodForm<
  TFormValues extends FieldValues = FieldValues,
  Schema extends ZodType<TFormValues> = ZodType<TFormValues>
>({
  schema,
  options,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
}: UseZodFormProps<TFormValues, Schema>): FormState<TFormValues> {
  const form = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors>([]);

  const handleSubmit = async (data: TFormValues) => {
    try {
      setIsSubmitting(true);
      setServerErrors([]);
      
      await onSubmit(data);
      
      setIsSubmitSuccessful(true);
      setIsSubmitted(true);
      
      if (onSuccess) {
        await onSuccess(data);
      }
    } catch (error) {
      setIsSubmitSuccessful(false);
      setIsSubmitted(true);
      
      if (error instanceof ApiError) {
        if (error.validationErrors) {
          // Handle validation errors from the server
          Object.entries(error.validationErrors).forEach(([field, messages]) => {
            form.setError(field as any, {
              type: 'server',
              message: messages.join(' '),
            });
          });
          
          setServerErrors(
            Object.entries(error.validationErrors).flatMap(([field, messages]) =>
              messages.map((message) => ({
                field,
                message,
              }))
            )
          );
        } else {
          // Handle other API errors
          setServerErrors([{ message: error.message }]);
          
          if (onError) {
            onError(error);
          }
        }
      } else if (error instanceof Error) {
        // Handle unexpected errors
        console.error('Form submission error:', error);
        setServerErrors([{ message: 'An unexpected error occurred. Please try again.' }]);
        
        if (onError) {
          onError(error);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setServerErrors([]);
    setIsSubmitted(false);
    setIsSubmitSuccessful(false);
  };

  const setServerError = (error: unknown) => {
    if (error instanceof Error) {
      setServerErrors([{ message: error.message }]);
    } else if (typeof error === 'string') {
      setServerErrors([{ message: error }]);
    } else {
      setServerErrors([{ message: 'An unknown error occurred' }]);
    }
  };

  // Reset form state when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues as any);
    }
  }, [defaultValues, form]);

  // Handle form submission
  useEffect(() => {
    const subscription = form.watch(() => {
      if (isSubmitted) {
        setIsSubmitted(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, isSubmitted]);

  return {
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    serverErrors,
    resetForm,
    setServerError,

  };
}

// Helper function to create form fields with common props
export function createFormFieldProps<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  name: Path<TFieldValues>
) {
  const { 
    formState: { errors, isSubmitting } 
  } = form;
  
  const error = errors[name];
  const register = form.register(name, {
    disabled: isSubmitting,
  });

  return {
    ...register,
    error: error?.message as string | undefined,
    isSubmitting,
    id: name,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${String(name)}-error` : undefined,
  };
}

// Common form validation schemas
export const formSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  phone: z
    .string()
    .regex(
      /^\+?[\d\s-()]{10,}$/,
      'Please enter a valid phone number'
    ),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  requiredString: (message = 'This field is required') => 
    z.string().min(1, message),
  optionalString: () => z.string().optional(),
  url: z.string().url('Please enter a valid URL'),
  checkbox: (message = 'This field is required') => 
    z.literal(true, {
      errorMap: () => ({ message }),
    }),
};

// Helper function to handle file uploads
export async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    
    reader.onerror = () => {
      reject(reader.error || new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

// Helper function to handle multiple file uploads
export async function readFilesAsDataURLs(files: FileList | File[]): Promise<string[]> {
  const fileArray = Array.from(files);
  return Promise.all(fileArray.map(file => readFileAsDataURL(file)));
}

// Helper function to convert FormData to object
export function formDataToObject<T = Record<string, any>>(formData: FormData): T {
  const result: Record<string, any> = {};
  
  for (const [key, value] of formData.entries()) {
    // Handle array fields (e.g., 'tags[]')
    if (key.endsWith('[]')) {
      const fieldName = key.slice(0, -2);
      if (!result[fieldName]) {
        result[fieldName] = [];
      }
      result[fieldName].push(value);
    } else {
      // Handle regular fields
      result[key] = value;
    }
  }
  
  return result as T;
}

// Helper function to handle form submission with file uploads
export async function handleFormWithFiles<T extends Record<string, any>>(
  formData: FormData,
  fileFields: string[] = []
): Promise<T> {
  const result: Record<string, any> = {};
  
  // Process regular fields
  for (const [key, value] of formData.entries()) {
    if (!fileFields.includes(key)) {
      result[key] = value;
    }
  }
  
  // Process file fields
  for (const field of fileFields) {
    const files = formData.getAll(field) as File[];
    
    if (files.length === 0) {
      result[field] = undefined;
    } else if (files.length === 1) {
      result[field] = await readFileAsDataURL(files[0]);
    } else {
      result[field] = await readFilesAsDataURLs(files);
    }
  }
  
  return result as T;
}
