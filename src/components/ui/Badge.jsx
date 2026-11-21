import { cn } from '@/utils/cn';

/**
 * Editorial Luxury Badge / Tag Component
 */
export function Badge({ children, variant = 'gold', size = 'sm', className, ...props }) {
  const variants = {
    gold: 'bg-[#C5A059]/15 text-[#8C6F34] border border-[#C5A059]/30',
    primary: 'bg-[#0A261D]/10 text-[#0A261D] border border-[#0A261D]/20',
    dark: 'bg-[#0A261D] text-[#C5A059] border border-[#C5A059]/40',
    outline: 'bg-transparent text-[#5A5D64] border border-[#5A5D64]/30',
    provisional: 'bg-amber-500/10 text-amber-700 border border-amber-500/30 font-mono',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider uppercase font-semibold',
    md: 'text-xs px-3 py-1 tracking-wider uppercase font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-sm font-sans whitespace-nowrap',
        variants[variant] || variants.gold,
        sizes[size] || sizes.sm,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
