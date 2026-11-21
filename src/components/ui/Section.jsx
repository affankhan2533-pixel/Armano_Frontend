import { cn } from '@/utils/cn';

/**
 * Semantic Section Wrapper with Curated Luxury Background Tokens
 */
export function Section({
  children,
  className,
  variant = 'light',
  spacing = 'default',
  id,
  ...props
}) {
  const variants = {
    light: 'bg-[#FBF9F5] text-[#121316]',
    soft: 'bg-[#F3EFE6] text-[#121316]',
    dark: 'bg-[#0A261D] text-[#FBF9F5]',
    emerald: 'bg-[#071D16] text-[#FBF9F5]',
    white: 'bg-white text-[#121316]',
  };

  const spacings = {
    none: 'py-0',
    compact: 'py-10 sm:py-14',
    default: 'py-16 sm:py-24',
    relaxed: 'py-20 sm:py-32',
  };

  return (
    <section
      id={id}
      className={cn('relative w-full overflow-hidden', variants[variant] || variants.light, spacings[spacing] || spacings.default, className)}
      {...props}
    >
      {children}
    </section>
  );
}
