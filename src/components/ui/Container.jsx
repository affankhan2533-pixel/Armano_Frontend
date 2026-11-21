import { cn } from '@/utils/cn';

/**
 * Editorial Max-Width Container
 */
export function Container({ children, className, size = 'default', ...props }) {
  const sizes = {
    narrow: 'max-w-5xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size] || sizes.default, className)}
      {...props}
    >
      {children}
    </div>
  );
}
