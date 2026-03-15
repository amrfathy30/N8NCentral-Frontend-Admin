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
  bg = "bg-main",
  border = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-2 py-1 text-[14px] font-[400] text-white transition-colors cursor-pointer 
        ${border ? "border" : "border-none"} 
        ${bg} ${className}`}
    >
      {children}
    </button>
  );
}
