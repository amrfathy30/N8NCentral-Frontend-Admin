import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-lg",
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
            <div
                className={`bg-white w-full ${maxWidth} rounded-2xl shadow-xl relative animate-in fade-in zoom-in-95`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5">
                    {title && (
                        <h3 className="text-[18px] font-bold text-main">{title}</h3>
                    )}
                    <button onClick={onClose}>
                        <X size={20} className="text-gray-500 hover:text-red-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}