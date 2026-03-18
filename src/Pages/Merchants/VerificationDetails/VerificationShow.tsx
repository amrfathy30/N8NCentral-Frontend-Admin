import { createPortal } from "react-dom";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import idImage from "../../../../public/id.png";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

export default function VerificationShow({ isOpen, onClose, data }: Props) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar"; 

    if (!isOpen) return null;

    const items = [
        { id: 1, label: t("Merchants.SelfieWithID") },
        { id: 2, label: t("Merchants.SelfieWithID") },
        { id: 3, label: t("Merchants.SelfieWithID") },
    ];

    return createPortal(
        <div className={`fixed inset-0 z-[99999] flex justify-end`} dir={isRtl ? "rtl" : "ltr"}>
            <div 
                className="absolute inset-0 bg-[#0A2F64]/50 backdrop-blur-[0.5px] transition-opacity" 
                onClick={onClose} 
            />

            <div className={`relative w-full max-w-[550px] bg-[#F9FAFB] h-full shadow-2xl flex flex-col border-gray-200`}>
                
                <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-5 border border-gray-50 space-y-4 text-center">
                            <p className="text-[18px] font-bold text-blackq">{item.label}</p>

                            <div className="rounded-xl overflow-hidden border border-gray-50">
                                <img 
                                    src={idImage} 
                                    alt="Identity" 
                                    className="w-full h-44 object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-greenDark text-white py-2.5 rounded-md text-sm font-bold hover:bg-[#1f704b] transition-all active:scale-[0.97]">
                                    {t("Merchants.Approve")}
                                </button>
                                <button className="bg-[#E7000B] text-white py-2.5 rounded-md text-sm font-bold hover:bg-[#c11717] transition-all active:scale-[0.97]">
                                    {t("Merchants.Reject")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-5 bg-white border-t border-gray-100 space-y-3 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
                    <button className="w-full bg-greenDark text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#1f704b] transition-all active:scale-[0.98] shadow-sm">
                        <CheckCircle size={18} /> {t("Merchants.VerifyAction")}
                    </button>
                    <button className="w-full bg-[#E7000B] text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#c11717] transition-all active:scale-[0.98]">
                        {t("Merchants.RejectVerification")}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}