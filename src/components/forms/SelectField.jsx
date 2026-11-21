import { useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Accessible Select Field Component
 */
export function SelectField({
  label,
  id,
  options = [],
  placeholder = 'Select an option...',
  error,
  helperText,
  required = false,
  className,
  value,
  onChange,
  ...props
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className={cn('w-full flex flex-col space-y-1.5', className)}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold tracking-wider uppercase text-[#0A261D] flex items-center justify-between">
          <span>{label}</span>
          {required && <span className="text-[#C5A059] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full appearance-none px-4 py-3 bg-white text-[#121316] text-sm rounded-sm border transition-colors duration-200 outline-none pr-10 cursor-pointer',
            'focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]',
            error ? 'border-red-500' : 'border-[#E8D5B5]'
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5A5D64]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
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
