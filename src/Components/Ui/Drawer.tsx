import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    maxWidth?: string;
    side?: "left" | "right";
}

export default function Drawer({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = "500px",
    side = "right"
}: DrawerProps) {
    const { i18n } = useTranslation();
    const dir = i18n.dir();
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);

    const effectiveSide = side || (dir === 'rtl' ? 'right' : 'left');

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    return createPortal(
        <div className="fixed inset-0 z-[110] flex overflow-hidden">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Sidebar Content */}
            <div
                className={`fixed top-0 bottom-0 w-full bg-[#F8F9FA] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${effectiveSide === 'right'
                    ? (isVisible ? 'right-0' : 'translate-x-full right-0')
                    : (isVisible ? 'left-0' : '-translate-x-full left-0')
                    }`}
                style={{ maxWidth }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3">
                    <h2 className="text-[21px] font-bold text-greenDark">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
