import { useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Accessible Textarea Field Component
 */
export function TextareaField({
  label,
  id,
  rows = 4,
  error,
  helperText,
  required = false,
  className,
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  return (
    <div className={cn('w-full flex flex-col space-y-1.5', className)}>
      {label && (
        <label htmlFor={textareaId} className="text-xs font-semibold tracking-wider uppercase text-[#0A261D] flex items-center justify-between">
          <span>{label}</span>
          {required && <span className="text-[#C5A059] ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={cn(
          'w-full px-4 py-3 bg-white text-[#121316] text-sm rounded-sm border transition-colors duration-200 outline-none resize-y',
          'placeholder:text-[#94969C]',
          'focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]',
          error ? 'border-red-500' : 'border-[#E8D5B5]'
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
