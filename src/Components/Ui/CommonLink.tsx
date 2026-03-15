import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CommonLinkProps {
  to?: string;
  children: ReactNode;
  className?: string;
}

export default function CommonLink({
  children,
  to = "/",
  className = "",
}: CommonLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-block text-[14px] text-[#3E8F60] font-[400] hover:text-main hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}
