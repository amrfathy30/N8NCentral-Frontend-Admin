import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    description?: string;
    isDanger?: boolean;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    description,
    isDanger = false
}: ConfirmModalProps) {
    const { t } = useTranslation()
    const lang = localStorage.getItem('i18nextLng') || 'ar';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-[20px] w-full max-w-[500px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200 hover:text-red-500 transition-colors ${lang === "en" ? "right-6" : "left-6"}`}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col mt-4">
                    <h2 className={`text-[24px] font-bold mb-4 ${isDanger ? 'text-[#FB2C36]' : 'text-[#2B7B4C]'}`}>
                        {title}
                    </h2>

                    <p className={`text-[22px] font-bold mb-2 ${isDanger ? 'text-[#FB2C36]' : 'text-[#2B7B4C]'}`}>
                        {message}
                    </p>

                    {description && (
                        <p className="text-[#4A5565] text-[18px] font-medium leading-relaxed mb-8 max-w-[400px]">
                            {description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 w-full">
                        <button
                            onClick={onConfirm}
                            className={`flex-1 py-2 rounded-[10px] border border-[#E5E7EB] text-white font-bold text-[18px] transition-all
                                ${isDanger
                                    ? 'bg-[#FB2C36] hover:bg-[#d9222b] shadow-lg shadow-[#FB2C36]/20'
                                    : 'bg-[#2B7B4C] hover:bg-[#23663f] shadow-lg shadow-[#2B7B4C]/20'
                                }`}
                        >
                            {t("Common.Yes")}
                        </button>

                        <button
                            onClick={onClose}
                            className="flex-1 py-2 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] font-bold text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all"
                        >
                            {t("Common.No")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
