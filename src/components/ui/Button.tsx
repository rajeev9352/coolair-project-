import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

// Button variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Solid variants
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
        info: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500',
        
        // Outline variants
        'outline-primary': 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
        'outline-secondary': 'border border-secondary-500 text-secondary-600 hover:bg-secondary-50 focus-visible:ring-secondary-500',
        'outline-gray': 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
        
        // Ghost variants
        ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
        'ghost-primary': 'text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
        'ghost-danger': 'text-red-600 hover:bg-red-50 focus-visible:ring-red-500',
        
        // Link variants
        link: 'text-primary-600 hover:underline underline-offset-4 hover:bg-transparent focus-visible:ring-primary-500',
      },
      size: {
        xs: 'h-8 px-2.5 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 py-2 px-4',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
        'icon-sm': 'h-9 w-9',
        'icon-md': 'h-10 w-10',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    children,
    variant,
    size,
    fullWidth,
    rounded,
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    asChild: _asChild = false, // prevent forwarding to DOM
    ...props
  }, ref) => {
    return (
      <button
        className={buttonVariants({
          variant,
          size,
          fullWidth,
          rounded,
          className,
        })}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className={cn(
            'animate-spin',
            children ? 'mr-2' : '',
            size === 'xs' || size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
          )} />
        )}
        {!isLoading && leftIcon && (
          <span className={cn(children ? 'mr-2' : '')}>
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={cn(children ? 'ml-2' : '')}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Utility function to merge class names
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
