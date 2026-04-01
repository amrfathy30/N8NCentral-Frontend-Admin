import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  bg?: string;
  border?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  children,
  className = "",
  border = false,
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 text-[18px] font-semibold bg-greenDark hover:bg-main rounded-[8px] text-[#F9F9F9] transition-colors cursor-pointer shadow-md
        ${border ? "border" : "border-none"} 
        ${(disabled || loading) ? "opacity-50 cursor-not-allowed" : ""}
 ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
