import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-all duration-250 focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-base min-h-[48px]',
    };

    const variantStyles = {
      primary:
        'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-200 shadow-sm',
      tertiary:
        'bg-transparent text-primary hover:bg-primary-light active:bg-primary-light',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={twMerge(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">⟳</span>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;