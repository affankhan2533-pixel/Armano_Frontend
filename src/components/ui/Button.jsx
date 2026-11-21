import Link from 'next/link';
import { cn } from '@/utils/cn';

/**
 * Luxury Presentational Button Primitive
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-250 ease-[var(--ease-snappy)] active:scale-[0.98] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide text-center';

  const variants = {
    primary: 'bg-[#0A261D] text-[#FBF9F5] hover:bg-[#164E3D] border border-[#0A261D] hover:border-[#C5A059] shadow-sm hover:shadow-[#0A261D]/20',
    gold: 'bg-[#C5A059] text-[#0A261D] hover:bg-[#D4B26F] font-semibold border border-[#C5A059] shadow-sm hover:shadow-[#C5A059]/30',
    outline: 'bg-transparent text-[#0A261D] border border-[#C5A059] hover:bg-[#F3EFE6] hover:text-[#0A261D]',
    outlineLight: 'bg-transparent text-[#FBF9F5] border border-[#C5A059] hover:bg-[#C5A059] hover:text-[#0A261D]',
    ghost: 'bg-transparent text-[#0A261D] hover:bg-[#F3EFE6] hover:text-[#0A261D]',
    ghostLight: 'bg-transparent text-[#FBF9F5] hover:bg-white/10 hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-2 min-h-[36px] min-w-[36px]',
    md: 'text-sm px-5 py-2.5 min-h-[44px] min-w-[44px]',
    lg: 'text-base px-7 py-3 min-h-[48px] min-w-[48px]',
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2 shrink-0" />}
    </>
  );

  const combinedClasses = cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
