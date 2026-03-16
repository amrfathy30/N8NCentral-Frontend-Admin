import React from "react";

interface TextareaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  labelClassName?: string;
  starClassName?: string;
  required?: boolean;
  star?: boolean;
}

const TextArea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  rows = 3,
  value = "",
  starClassName = "",
  labelClassName = "",
  required,
  star,
  onChange,
  className = "",
  disabled = false,
  error = false,
  hint = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `w-full rounded-[10px] border border-[#E5E7EB] px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 placeholder:text-[#0A0A0A80]`;
  } else if (error) {
    textareaClasses += ` bg-transparent  border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-white/90 dark:focus:border-error-800 placeholder:text-[#0A0A0A80]`;
  } else {
    textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-white/90 dark:focus:border-brand-800 placeholder:text-[#0A0A0A80]`;
  }

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`text-[#2B7B4C] font-bold text-sm mb-3 px-1 block ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {star && <span className={`text-red-500 ml-1 ${starClassName}`}>*</span>}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        value={value}
        required={required}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
            }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
