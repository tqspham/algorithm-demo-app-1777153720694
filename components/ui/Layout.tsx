import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, maxWidth = 'lg', ...props }, ref) => {
    const maxWidthStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
      full: 'max-w-none',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'w-full mx-auto px-4 py-8 sm:px-6 lg:px-8',
          maxWidthStyles[maxWidth],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

export default Layout;