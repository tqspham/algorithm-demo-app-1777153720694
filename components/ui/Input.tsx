import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          'w-full px-3 py-2 text-base border border-neutral-300 rounded-md',
          'bg-white transition-colors duration-250',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary',
          'placeholder-neutral-400',
          'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
          'min-h-[44px]',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;