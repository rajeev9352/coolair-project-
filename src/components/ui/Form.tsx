'use client';

import React, { ReactNode } from 'react';
import { useForm, SubmitHandler, FormProvider, UseFormReturn, FieldValues, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodTypeAny } from 'zod';
import { formatFormErrors } from '@/utils/form-utils';

interface FormProps<T extends FieldValues> {
  children: (methods: UseFormReturn<T>) => ReactNode;
  schema: ZodTypeAny;
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  className?: string;
  id?: string;
  onError?: (errors: any) => void;
  resetOnSubmit?: boolean;
}

export function Form<T extends FieldValues>({
  children,
  schema,
  onSubmit,
  defaultValues,
  className = '',
  id,
  onError,
  resetOnSubmit = false,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
    mode: 'onTouched',
  });

  const { handleSubmit, reset } = methods;

  const processSubmit: SubmitHandler<T> = async (data, event) => {
    try {
      await onSubmit(data, event);
      if (resetOnSubmit) {
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  const onInvalid = (errors: any) => {
    if (onError) {
      const formattedErrors = formatFormErrors(errors);
      onError(formattedErrors.length > 0 ? formattedErrors : 'Please fill out all required fields');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(processSubmit, onInvalid)}
        className={className}
        id={id}
        noValidate
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
}

interface FormFieldProps<T extends FieldValues> {
  name: keyof T & string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'time' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  autoComplete?: string;
  description?: string;
  hidden?: boolean;
  step?: string;
  min?: string | number;
  max?: string | number;
  showLabel?: boolean;
  showError?: boolean;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  labelClassName = 'block text-sm font-medium text-gray-700 mb-1',
  inputClassName = '',
  errorClassName = 'mt-1 text-sm text-red-600',
  options = [],
  rows = 3,
  autoComplete = 'off',
  description,
  hidden = false,
  step,
  min,
  max,
  showLabel = true,
  showError = true,
  onChange,
  onBlur,
  ...rest
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<T>();

  const error = errors[name] as { message?: string } | undefined;
  const fieldValue = watch(name as any);

  const commonProps = {
    id: name,
    disabled,
    className: `block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${inputClassName} ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`,
    ...register(name as any, {
      required: required ? `${label} is required` : false,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        onChange?.(e.target.value),
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        onBlur?.(e.target.value),
    }),
    ...rest,
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return <textarea {...commonProps} rows={rows} placeholder={placeholder} />;
      
      case 'select':
        return (
          <select {...commonProps} defaultValue="">
            <option value="" disabled hidden>
              {placeholder || 'Select an option'}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...commonProps}
              className={`h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${inputClassName}`}
            />
            {showLabel && (
              <label htmlFor={name} className={`ml-2 block text-sm text-gray-900 ${labelClassName}`}>
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            )}
          </div>
        );
      
      default:
        return (
          <input
            type={type}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            {...commonProps}
          />
        );
    }
  };

  if (type === 'checkbox' && !showLabel) {
    return renderInput();
  }

  if (hidden) {
    return <input type="hidden" {...commonProps} />;
  }

  return (
    <div className={`mb-4 ${className}`}>
      {showLabel && type !== 'checkbox' && (
        <label htmlFor={name} className={labelClassName}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="mt-1">
        {renderInput()}
        
        {description && !error?.message && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
        
        {showError && error?.message && (
          <p className={errorClassName}>{error.message}</p>
        )}
      </div>
    </div>
  );
}

// Form error message component
export function FormError({ message, className = '' }: { message?: string; className?: string }) {
  if (!message) return null;
  
  return (
    <div className={`p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md ${className}`}>
      {message}
    </div>
  );
}

// Form success message component
export function FormSuccess({ message, className = '' }: { message?: string; className?: string }) {
  if (!message) return null;
  
  return (
    <div className={`p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md ${className}`}>
      {message}
    </div>
  );
}

// Form actions component
export function FormActions({
  children,
  className = 'flex justify-end space-x-3',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mt-6 ${className}`}>{children}</div>;
}

// Form group component
export function FormGroup({
  title,
  description,
  children,
  className = '',
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// Helper hook to use form context
export function useFormField<T extends FieldValues>(name: keyof T) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<T>();

  return {
    register: register(name as any),
    error: errors[name] as { message?: string } | undefined,
    setValue: (value: any) => setValue(name as any, value, { shouldValidate: true }),
    value: watch(name as any),
  };
}
