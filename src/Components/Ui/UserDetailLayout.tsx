import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Bell,
    PauseCircle,
    Ban,
    type LucideIcon
} from "lucide-react";

interface Tab {
    id: string;
    label: string;
    icon: LucideIcon;
}

interface UserDetailLayoutProps {
    userName: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
    tabs: Tab[];
    children: React.ReactNode;
    tPrefix: string; // e.g., "BuyerDetails" or "SellerDetails"
}

export const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-[14px] font-medium flex items-center gap-2">
            {label}
        </span>
        <span className="text-greenDark text-[15px] font-bold flex items-center gap-2">
            {value}
        </span>
    </div>
);

export const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center gap-2">
        <span className="text-gray-500 text-[16px] font-medium">{label}</span>
        <span className="text-greenDark text-[28px] font-extrabold">{value}</span>
    </div>
);

export const VerificationItem = ({ label, date, isVerified, icon: Icon, colorClass, verifiedOnText }: { label: string; date?: string; isVerified: boolean; icon: LucideIcon; colorClass: string; verifiedOnText: string }) => (
    <div className={`p-4 rounded-[12px] border ${isVerified ? "bg-[#F0FDF4] border-[#D1FADF]" : "bg-[#EFF8FF] border-[#D1E9FF]"} flex items-center justify-between`}>
        <div className="flex flex-col gap-1">
            <span className={`text-[15px] font-bold ${isVerified ? "text-[#067647]" : "text-[#175CD3]"}`}>{label}</span>
            {date && <span className="text-gray-400 text-[12px]">{verifiedOnText} {date}</span>}
        </div>
        <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white`}>
            <Icon size={20} />
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
    tPrefix
}) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="space-y-6 pb-20" dir={dir}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 justify-between w-full">
                    <h1 className="text-[28px] font-extrabold text-greenDark">{userName}</h1>
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-greenDark transition-colors font-bold"
                    >
                        {t("Common.Back")}
                        {dir === "rtl" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                    </button>
                </div>
            </div>

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
                                        <tab.icon size={20} />
                                        <span className="font-bold text-[16px]">{tab.label}</span>
                                    </div>
                                    {dir === "rtl" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                        <button className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <Bell size={20} />
                            {t(`${tPrefix}.SendNotification`)}
                        </button>
                        <button className="w-full bg-[#F68713] hover:bg-[#d97706] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <PauseCircle size={20} />
                            {t(`${tPrefix}.StopAccount`)}
                        </button>
                        <button className="w-full bg-[#D00808] hover:bg-[#b91c1c] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <Ban size={20} />
                            {t(`${tPrefix}.BanAccount`)}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 w-full overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserDetailLayout;
