import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    type LucideIcon,
    Send
} from "lucide-react";
import ConfirmModal from '../../Components/Ui/ConfirmModal';
import Modal from '../../Components/Ui/Modal';
import TextEditor from '../../Components/Ui/TextEditor';
import { toast } from 'sonner';
import BanModal from "./BanModal";

interface Tab {
    id: string;
    label: string;
}

interface UserDetailLayoutProps {
    userName: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
    tabs: Tab[];
    children: React.ReactNode;
    tPrefix: string;
    userStatus?: string;
    onStatusChange?: (newStatus: string) => void;
}

interface VerificationItemProps {
    label: string;
    date?: string;
    isVerified: boolean;
    icon: LucideIcon;
    colorClass: string;
    verifiedOnText: string
}

export const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center flex-wrap gap-1">
        <span className="text-greenDark text-[16px] font-bold flex items-center gap-2">
            {label} :
        </span>
        <span className="text-greenDark text-wrap text-[16px] font-semibold flex items-center gap-2">
            {value}
        </span>
    </div>
);

export const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white rounded-[12px] p-4 shadow-sm border border-gray-50 flex flex-col items-start justify-center gap-2">
        <span className="text-[#333A42] text-[20px] font-semibold">{label}</span>
        <span className="text-greenDark text-[25px] font-bold">{value}</span>
    </div>
);

export const VerificationItem = ({
    label,
    date,
    isVerified,
    icon: Icon,
    colorClass,
    verifiedOnText
}: VerificationItemProps) => (

    <div className={`p-4 rounded-[12px] border ${isVerified ? "bg-[#ECFDF5] border-[#A4F4CF]" : "bg-[#EFF8FF] border-[#D1E9FF]"} flex items-center gap-2`}>
        <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white`}>
            <Icon size={20} />
        </div>
        <div className="flex flex-col gap-1">
            <span className={`text-[15px] font-semibold ${isVerified ? "text-[#101828]" : "text-[#175CD3]"}`}>{label}</span>
            {date && <span className="text-[#101828] text-[12px]">{verifiedOnText} {date}</span>}
        </div>
    </div>
);

export const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
        <span className="text-greenDark text-[14px] font-bold">{label}</span>
        <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
    </div>
);

const UserDetailLayout: React.FC<UserDetailLayoutProps> = ({
    userName,
    activeTab,
    setActiveTab,
    tabs,
    children,
    tPrefix,
    userStatus = "active",
    onStatusChange
}) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
    const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [notificationContent, setNotificationContent] = useState("");
    const [reason, setReason] = useState("");

    const handleBack = () => {
        navigate(-1);
    };

    const handleSendNotification = () => {
        if (!notificationContent.trim()) {
            toast.error(t("Common.EmptyContentError") || "Content cannot be empty");
            return;
        }
        // Simulated send
        console.log("Sending Notification to:", userName, "Content:", notificationContent);
        toast.success(t("Common.NotificationSentSuccess") || "Notification sent successfully");
        setIsNotificationModalOpen(false);
        setNotificationContent("");
    };

    const handleBan = () => {
        if (!reason.trim()) {
            toast.error(t("Common.EmptyContentError") || "Reason cannot be empty");
            return;
        }
        // Simulated ban
        console.log("Banning user:", userName, "Reason:", reason);
        toast.success(t("Merchants.BanSuccess") || "User banned successfully");
        setIsBanModalOpen(false);
        setReason("");
        onStatusChange?.("banned");
    };

    const handleReactivate = () => {
        // Simulated reactivate
        console.log("Reactivating user:", userName);
        toast.success(t("Common.ConfirmReactivateTitle") || "Accound reactivated");
        setIsReactivateModalOpen(false);
        onStatusChange?.("active");
    };

    const handleUnban = () => {
        // Simulated unban
        console.log("Unbanning user:", userName);
        toast.success(t("Merchants.UnBanSuccess") || "User unbanned successfully");
        setIsUnbanModalOpen(false);
        onStatusChange?.("active");
    };

    return (
        <div className="space-y-6 pb-20" dir={dir}>
            {/* Header */}

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Sidebar */}
                <div className="w-full lg:w-[280px] space-y-6 lg:sticky lg:top-0">
                    {/* Navigation Menu */}
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-50">
                        <div className="px-5 py-3 border-b border-gray-50">
                            <h2 className="text-[18px] font-extrabold text-greenDark">
                                {t(`${tPrefix}.SettingsTitle`)}
                            </h2>
                        </div>
                        <div className="p-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-[12px] transition-all ${activeTab === tab.id ? "bg-greenDark text-white" : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-[16px]">{tab.label}</span>
                                    </div>
                                    {dir === "rtl" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={() => setIsNotificationModalOpen(true)}
                            className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-3 rounded-[8px] font-semibold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
                        >
                            {t(`${tPrefix}.SendNotification`)}
                        </button>

                        {userStatus !== 'banned' && (
                            <>
                                {userStatus === 'active' ? (
                                    <button onClick={() => setIsStopModalOpen(true)} className="w-full bg-[#F68713] hover:bg-[#d97706] text-white py-3 rounded-[8px] font-semibold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                                        {t(`${tPrefix}.StopAccount`)}
                                    </button>
                                ) : (
                                    <button onClick={() => setIsReactivateModalOpen(true)} className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-3 rounded-[8px] font-semibold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                                        {t(`Common.ConfirmReactivateTitle`) || "Reactivate"}
                                    </button>
                                )}

                                <button onClick={() => setIsBanModalOpen(true)} className="w-full bg-[#D00808] hover:bg-[#b91c1c] text-white py-3 rounded-[8px] font-semibold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                                    {t(`${tPrefix}.BanAccount`)}
                                </button>
                            </>
                        )}

                        {userStatus === 'banned' && (
                            <button onClick={() => setIsUnbanModalOpen(true)} className="w-full bg-[#F68713] hover:bg-[#d97706] text-white py-3 rounded-[8px] font-semibold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                                {t(`Merchants.Unban`)}
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 w-full overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 justify-between w-full">
                            <h1 className="text-[24px] font-bold text-greenDark">{userName}</h1>
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-[#505E56] hover:text-greenDark transition-colors font-bold"
                            >
                                {t("Common.Back")}
                                {dir === "rtl" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                            </button>
                        </div>
                    </div>
                    {children}
                </div>
            </div>

            {/* Notification Modal */}
            <Modal
                isOpen={isNotificationModalOpen}
                onClose={() => setIsNotificationModalOpen(false)}
                title={t(`${tPrefix}.SendNotification`)}
                maxWidth="max-w-2xl"
            >
                <div className="space-y-6">
                    <div className="min-h-[300px]">
                        <TextEditor
                            value={notificationContent}
                            onChange={setNotificationContent}
                            placeholder={t(`${tPrefix}.NotificationPlaceholder`) || "Write your message here..."}
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleSendNotification}
                            className="bg-greenDark hover:bg-[#23663f] text-white py-2.5 px-8 rounded-[10px] font-bold text-[16px] flex items-center gap-2 transition-all active:scale-[0.98]"
                        >
                            <Send size={18} />
                            {t("Common.Send") || "Send"}
                        </button>
                        <button
                            onClick={() => setIsNotificationModalOpen(false)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-8 rounded-[10px] font-bold text-[16px] transition-all"
                        >
                            {t("Common.Cancel") || "Cancel"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Banned modal  */}
            <BanModal
                isBanModalOpen={isBanModalOpen}
                setIsBanModalOpen={setIsBanModalOpen}
                banReason={reason}
                setBanReason={setReason}
                handleConfirmBan={handleBan}
            // isBanning={isBanning}
            />

            <ConfirmModal
                isOpen={isStopModalOpen}
                onClose={() => setIsStopModalOpen(false)}
                onConfirm={() => {
                    console.log("إيقاف الحساب...");
                    setIsStopModalOpen(false);
                    onStatusChange?.("stopped");
                }}
                title={t(`${tPrefix}.ConfirmStopTitle`)}
                message={t(`${tPrefix}.ConfirmStopMessage`)}
                isStop={true}
            />

            <ConfirmModal
                isOpen={isReactivateModalOpen}
                onClose={() => setIsReactivateModalOpen(false)}
                onConfirm={handleReactivate}
                title={t(`Common.ConfirmReactivateTitle`)}
                message={t(`Common.ConfirmReactivateMessage`)}
            />

            <ConfirmModal
                isOpen={isUnbanModalOpen}
                onClose={() => setIsUnbanModalOpen(false)}
                onConfirm={handleUnban}
                title={t(`Merchants.ConfirmUnBanTitle`)}
                message={t(`Merchants.ConfirmUnBanMessage`)}
                isStop={true} // Unban use orange color for consistency with "reactivate" feel but usually it's green. Sellers.tsx uses Play icon for Unban.
            />
        </div>
    );
};

export default UserDetailLayout;
