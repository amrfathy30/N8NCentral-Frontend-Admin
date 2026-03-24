import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  bg?: string;
  border?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  children,
  className = "",
  border = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 text-[18px] font-semibold bg-greenDark hover:bg-main rounded-[8px] text-[#F9F9F9]  transition-colors cursor-pointer shadow-md
        ${border ? "border" : "border-none"} 
 ${className}`}
    >
      {children}
    </button>
  );
}
