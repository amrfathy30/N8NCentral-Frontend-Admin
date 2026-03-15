import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
    to?: string;
    children: ReactNode;
    className?: string;
}

export default function ButtonLink({ children, to = '/', className = '' }: ButtonLinkProps) {
    return (
        <Link
            to={to}
            className={`text-center flex justify-center items-center px-4 h-[48px] border-none rounded-full text-base font-semibold text-white transition-colors cursor-pointer bg-main hover:bg-greenDark ${className}`}
        >
            {children}
        </Link>
    );
}
