import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LinkProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ghost';
  onClick?: () => void;
}

const Link = forwardRef<HTMLDivElement, LinkProps>(
  ({ className, variant = 'default', children, onClick, ...props }, ref) => {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer',
          variant === 'default' && 'hover:bg-accent hover:text-accent-foreground',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Link.displayName = 'Link';

export { Link };