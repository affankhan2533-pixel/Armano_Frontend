import { useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Accessible Text Input Component
 */
export function InputField({
  label,
  id,
  error,
  helperText,
  required = false,
  className,
  type = 'text',
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={cn('w-full flex flex-col space-y-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold tracking-wider uppercase text-[#0A261D] flex items-center justify-between">
          <span>{label}</span>
          {required && <span className="text-[#C5A059] ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={cn(
          'w-full px-4 py-3 bg-white text-[#121316] text-sm rounded-sm border transition-colors duration-200 outline-none',
          'placeholder:text-[#94969C]',
          'focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#E8D5B5]'
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-xs text-[#5A5D64]">
          {helperText}
        </p>
      )}
    </div>
  );
}
