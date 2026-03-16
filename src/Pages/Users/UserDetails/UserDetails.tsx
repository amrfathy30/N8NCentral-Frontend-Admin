import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    ChevronLeft,
    ChevronRight,
    User,
    ShoppingBag,
    DollarSign,
    ShieldCheck,
    Facebook,
    Bell,
    PauseCircle,
    Ban,
    Clock
} from "lucide-react";
import { useState } from "react";

export default function UserDetails() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const [activeTab, setActiveTab] = useState("overview");

    const handleBack = () => {
        navigate(-1);
    };

    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-[14px] font-medium flex items-center gap-2">
                {label}
            </span>
            <span className="text-greenDark text-[15px] font-bold flex items-center gap-2">
                {value}
            </span>
        </div>
    );

    const StatCard = ({ label, value }: { label: string; value: string }) => (
        <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-50 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-gray-500 text-[16px] font-medium">{label}</span>
            <span className="text-greenDark text-[28px] font-extrabold">{value}</span>
        </div>
    );

    const VerificationItem = ({ label, date, isVerified, icon: Icon, colorClass }: { label: string; date?: string; isVerified: boolean; icon: any; colorClass: string }) => (
        <div className={`p-4 rounded-[12px] border ${isVerified ? "bg-[#F0FDF4] border-[#D1FADF]" : "bg-[#EFF8FF] border-[#D1E9FF]"} flex items-center justify-between`}>
            <div className="flex flex-col gap-1">
                <span className={`text-[15px] font-bold ${isVerified ? "text-[#067647]" : "text-[#175CD3]"}`}>{label}</span>
                {date && <span className="text-gray-400 text-[12px]">{t("AccountDetails.VerifiedOn")} {date}</span>}
            </div>
            <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white`}>
                <Icon size={20} />
            </div>
        </div>
    );

    const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
        <div className={`flex items-center flex-wrap gap-2 ${className}`}>
            <span className="text-greenDark text-[14px] font-bold">{label}</span>
            <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
        </div>
    );

    return (
        <div className="space-y-6 pb-20" dir={dir}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 justify-between w-full">
                    <h1 className="text-[28px] font-extrabold text-greenDark">محمد علي</h1>
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
                                {t("AccountDetails.SettingsTitle")}
                            </h2>
                        </div>
                        <div className="p-3">
                            {[
                                { id: "overview", label: t("AccountDetails.Overview"), icon: User },
                                { id: "orders", label: t("AccountDetails.Orders"), icon: ShoppingBag },
                                { id: "sales", label: t("AccountDetails.Transactions"), icon: DollarSign },
                                { id: "logs", label: t("AccountDetails.Logs"), icon: Clock },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-[12px] transition-all ${activeTab === tab.id ? "bg-greenDark text-white" : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className="font-bold text-[16px]">{tab.label}</span>
                                    {dir === "rtl" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-3">
                        <button className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <Bell size={20} />
                            {t("AccountDetails.SendNotification")}
                        </button>
                        <button className="w-full bg-[#F68713] hover:bg-[#d97706] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <PauseCircle size={20} />
                            {t("AccountDetails.StopAccount")}
                        </button>
                        <button className="w-full bg-[#D00808] hover:bg-[#b91c1c] text-white py-4 rounded-[16px] font-bold text-[18px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                            <Ban size={20} />
                            {t("AccountDetails.BanAccount")}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6 w-full overflow-hidden">
                    {activeTab === "overview" && (
                        <>
                            {/* Account Information */}
                            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-50">
                                <h2 className="text-[20px] font-extrabold text-greenDark mb-6">{t("AccountDetails.AccountData")}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                                    <InfoItem label={t("AccountDetails.Name")} value="محمد علي" />
                                    <InfoItem label={t("AccountDetails.Phone")} value="0123456789" />
                                    <InfoItem label={t("AccountDetails.Email")} value="abc@123.com" />
                                    <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-05-12" />
                                    <InfoItem label={t("AccountDetails.lastActivity")} value={t("AccountDetails.lastActivityTime")} />
                                    <InfoItem label={t("AccountDetails.Country")} value="مصر" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Statistics */}
                                <div className="space-y-4">
                                    <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        <StatCard label={t("AccountDetails.OrdersCount")} value="12" />
                                        <StatCard label={t("AccountDetails.TotalSpent")} value="$1,240" />
                                        <StatCard label={t("AccountDetails.OpenDisputes")} value="0" />
                                    </div>
                                </div>

                                {/* Verifications */}
                                <div className="space-y-4">
                                    <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Verifications")}</h2>
                                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[18px] font-extrabold text-[#101828]">{t("AccountDetails.VerifiedAccount")}</span>
                                                    <ShieldCheck className="text-[#067647]" size={20} />
                                                </div>
                                                <p className="text-gray-500 text-[14px]">{t("AccountDetails.VerifiedAccountDesc")}</p>
                                            </div>
                                            <button className="bg-greenDark text-white px-6 py-2 rounded-lg font-bold text-[14px] hover:bg-green-700 transition-colors">
                                                {t("AccountDetails.VerificationFiles")}
                                            </button>
                                        </div>

                                        <VerificationItem
                                            label={t("AccountDetails.EmailVerified")}
                                            date="15 يناير 2024"
                                            isVerified={true}
                                            icon={ShieldCheck}
                                            colorClass="bg-[#067647]"
                                        />
                                        <VerificationItem
                                            label={t("AccountDetails.PhoneVerified")}
                                            date="15 يناير 2024"
                                            isVerified={true}
                                            icon={ShieldCheck}
                                            colorClass="bg-[#067647]"
                                        />
                                        <VerificationItem
                                            label={t("AccountDetails.FacebookConnected")}
                                            isVerified={false}
                                            icon={Facebook}
                                            colorClass="bg-[#2D6ADF]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "orders" && (
                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden">
                            <table className="w-full text-right border-collapse">
                                <thead className="bg-[#2B7B4C] text-white">
                                    <tr>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.OrderId")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Service")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Amount")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.PurchaseDate")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Status")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <tr key={i} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}>
                                            <td className="p-4 text-gray-400 font-medium border-none">#2143</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">ربط Google Sheets مع WhatsApp</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">50$</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">12/2/2025</td>
                                            <td className="p-4 text-[#2ECC71] font-bold border-none">{t("AccountDetails.Completed")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === "sales" && (
                        <section className="space-y-4">
                            <h3 className="text-[#027A48] text-[21px] font-bold">
                                {t("AccountDetails.ActivityLog")}
                            </h3>
                            <div className="bg-[#fff] rounded-[12px] p-5">
                                <div className="grid grid-cols-1 gap-y-5 gap-x-4">
                                    <DetailItem label={t("AccountDetails.CreateRequest")} value="2024-06-18" />
                                    <DetailItem label={t("AccountDetails.UpdatePhoneNumber")} value="A2024-06-12" />
                                </div>
                            </div>

                        </section>
                    )}
                    {activeTab === "logs" && (
                        <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 overflow-hidden">
                            <table className="w-full text-right border-collapse">
                                <thead className="bg-[#2B7B4C] text-white">
                                    <tr>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.OrderId")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Service")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Amount")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.PurchaseDate")}</th>
                                        <th className="p-4 font-bold border-none">{t("AccountDetails.Status")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <tr key={i} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}>
                                            <td className="p-4 text-gray-400 font-medium border-none">#2143</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">ربط Google Sheets مع WhatsApp</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">50$</td>
                                            <td className="p-4 text-gray-500 font-medium border-none">12/2/2025</td>
                                            <td className="p-4 text-[#2ECC71] font-bold border-none">{t("AccountDetails.Completed")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
