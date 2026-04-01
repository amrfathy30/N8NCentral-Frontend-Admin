import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  error?: { message?: string } | boolean;
  hint?: string;
  labelClassName?: string;
  starClassName?: string;
  star?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    id,
    label,
    placeholder,
    rows = 3,
    starClassName = "",
    labelClassName = "",
    required,
    star,
    className = "",
    disabled = false,
    error = false,
    hint = "",
    ...props
  }, ref) => {
    let textareaClasses = `w-full rounded-[10px] border border-[#E5E7EB] px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none focus:border-greenDark ${className} `;

    if (disabled) {
      textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 placeholder:text-[#0A0A0A80]`;
    } else if (error) {
      textareaClasses += ` bg-transparent border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500/10 dark:bg-[#1e1e1e] dark:text-white/90 placeholder:text-[#0A0A0A80]`;
    } else {
      textareaClasses += ` bg-transparent text-gray-900 border-gray-300 focus:border-main focus:ring-1 focus:ring-main dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-white/90 placeholder:text-[#0A0A0A80]`;
    }

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={id || props.name}
            className={`text-[#2B7B4C] font-bold text-sm mb-3 px-1 block ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            {star && <span className={`text-red-500 ml-1 ${starClassName}`}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id || props.name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          disabled={disabled}
          className={textareaClasses}
          {...props}
        />
        {hint && (
          <p className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
            {hint}
          </p>
        )}
        {typeof error === 'object' && error?.message && (
          <p className="mt-2 text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
