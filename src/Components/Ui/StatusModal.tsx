import { X, Check, Eye, Plus, ArrowRight, Clock, Edit3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export type ModalType = 'success' | 'pending' | 'rejected';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    serviceTitle: string;
    rejectionReason?: string;
    onViewServices: () => void;
    onAddAnother: () => void;
    onBackToDashboard: () => void;
    onEditService?: () => void;
}

export default function StatusModal({
    isOpen,
    onClose,
    type,
    serviceTitle,
    rejectionReason,
    onViewServices,
    onAddAnother,
    onBackToDashboard,
    onEditService
}: StatusModalProps) {
    const { t } = useTranslation();
    const lang = localStorage.getItem('i18nextLng') || 'ar';

    if (!isOpen) return null;

    const getConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <Check size={32} strokeWidth={3} />,
                    iconBg: 'bg-[#2B7B4C]',
                    outerBg: 'bg-[#EBF5EF]',
                    title: t("common.statusModal.success.title"),
                    description: t("common.statusModal.success.description"),
                    primaryBtn: {
                        label: t("common.statusModal.viewMyServices"),
                        icon: <Eye size={20} />,
                        onClick: onViewServices
                    }
                };
            case 'pending':
                return {
                    icon: <Clock size={32} strokeWidth={3} />,
                    iconBg: 'bg-[#F97316]',
                    outerBg: 'bg-[#FFF7ED]',
                    title: t("common.statusModal.pending.title"),
                    description: t("common.statusModal.pending.description"),
                    primaryBtn: {
                        label: t("common.statusModal.viewMyServices"),
                        icon: <Eye size={20} />,
                        onClick: onViewServices
                    }
                };
            case 'rejected':
                return {
                    icon: <X size={32} strokeWidth={3} />,
                    iconBg: 'bg-[#FB2C36]',
                    outerBg: 'bg-[#FEF2F2]',
                    title: t("common.statusModal.rejected.title"),
                    description: t("common.statusModal.rejected.description"),
                    primaryBtn: {
                        label: t("common.statusModal.editService"),
                        icon: <Edit3 size={20} />,
                        onClick: onEditService || onViewServices
                    }
                };
        }
    };

    const config = getConfig();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-[32px] w-full max-w-[500px] p-6 shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col items-center text-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`absolute top-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200 transition-colors ${lang === "en" ? "right-6" : "left-6"}`}
                >
                    <X size={20} />
                </button>

                {/* Status Icon */}
                <div className={`w-20 h-20 rounded-full ${config.outerBg} flex items-center justify-center mb-6`}>
                    <div className={`w-14 h-14 rounded-full ${config.iconBg} flex items-center justify-center text-white`}>
                        {config.icon}
                    </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-[28px] font-bold text-[#101828] mb-2 px-4">
                    {config.title}
                </h2>
                <p className="text-[#667085] text-[16px] mb-8 leading-relaxed px-4">
                    {config.description}
                </p>

                {/* Conditional Content Card */}
                {type === 'rejected' ? (
                    <div className="w-full border border-gray-100 rounded-[16px] p-4 mb-4 text-start">
                        <span className="text-[#101828] text-[14px] font-bold block mb-2">
                            {t("common.statusModal.rejected.rejectionReason")}
                        </span>
                        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] p-3 text-[#FB2C36] text-[13px] font-medium">
                            {rejectionReason || "الصور المرفوعة غير واضحة يرجى إعادة رفع صور واضحة للخدمة"}
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-gradient-to-r from-[#F0FDF4] to-[#FFFFFF] border border-[#D1FADF] rounded-[16px] p-4 mb-8 flex items-center justify-between">
                        <div className="flex flex-col text-start gap-1">
                            <span className="text-[#067647] text-[12px] font-medium">
                                {t("common.statusModal.currentStatus")}
                            </span>
                            <span className="text-[#101828] font-bold text-[14px]">
                                {serviceTitle}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#067647] flex items-center justify-center text-white">
                            <Check size={20} />
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={config.primaryBtn.onClick}
                        className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#2B7B4C]/20"
                    >
                        {config.primaryBtn.icon}
                        {config.primaryBtn.label}
                    </button>

                    <button
                        onClick={onAddAnother}
                        className="w-full border border-[#2B7B4C] text-[#2B7B4C] hover:bg-green-50 py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all"
                    >
                        <Plus size={20} />
                        {t("common.statusModal.addAnotherService")}
                    </button>

                    <button
                        onClick={onBackToDashboard}
                        className="mt-2 text-[#667085] hover:text-[#101828] flex items-center justify-center gap-2 transition-all font-medium"
                    >
                        <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                        {t("common.statusModal.backToDashboard")}
                    </button>
                </div>
            </div>
        </div>
    );
}
