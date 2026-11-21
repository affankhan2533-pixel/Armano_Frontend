import { cn } from '@/utils/cn';

/**
 * Editorial Luxury Card Primitive
 */
export function Card({
  children,
  className,
  variant = 'surface',
  hover = true,
  ...props
}) {
  const variants = {
    surface: 'bg-white border border-[#E8D5B5]/60 text-[#121316]',
    soft: 'bg-[#F3EFE6] border border-[#E8D5B5] text-[#121316]',
    dark: 'bg-[#0A261D] border border-[#C5A059]/30 text-[#FBF9F5]',
    transparent: 'bg-transparent border border-[#C5A059]/20 text-[#121316]',
  };

  const hoverEffect = hover
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#C5A059]'
    : '';

  return (
    <div
      className={cn('rounded-sm p-6 relative overflow-hidden', variants[variant] || variants.surface, hoverEffect, className)}
      {...props}
    >
      {children}
    </div>
  );
}
