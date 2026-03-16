import { useTranslation } from "react-i18next";
import {
    User,
    MousePointerClick,
    TrendingUp,
    DollarSign,
    Clock,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout, { InfoItem, StatCard, VerificationItem } from "../../../../Components/Ui/UserDetailLayout";
import DynamicTable from "../../../../Components/Ui/DynamicTable";

export default function AffiliateDetails() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview"), icon: User },
        { id: "clicks", label: t("AccountDetails.Clicks"), icon: MousePointerClick },
        { id: "conversions", label: t("AccountDetails.Conversions"), icon: TrendingUp },
        { id: "commissions", label: t("AccountDetails.Commissions"), icon: DollarSign },
        { id: "logs", label: t("AccountDetails.Logs"), icon: Clock },
    ];

    const clickColumns = [
        { field: "id", header: "#" },
        { field: "ip", header: "IP Address" },
        { field: "device", header: t("AccountDetails.Device") || "الجهاز" },
        { field: "date", header: t("AccountDetails.Date") || "التاريخ" },
    ];

    const clicksData = Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        ip: `192.168.1.${10 + i}`,
        device: i % 2 === 0 ? "Desktop" : "Mobile",
        date: "2024-05-15 14:30"
    }));

    const conversionColumns = [
        { field: "id", header: t("AccountDetails.OrderId") || "رقم الطلب" },
        { field: "amount", header: t("AccountDetails.Amount") || "المبلغ" },
        { field: "commission", header: t("AccountDetails.Commission") || "العمولة" },
        { field: "date", header: t("AccountDetails.Date") || "التاريخ" },
    ];

    const conversionsData = Array.from({ length: 8 }).map((_, i) => ({
        id: `#ORD-${5000 + i}`,
        amount: "$120",
        commission: "$18",
        date: "2024-05-14"
    }));

    return (
        <UserDetailLayout
            userName="أحمد المسوق"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            tPrefix="AccountDetails"
        >
            {activeTab === "overview" && (
                <>
                    {/* Account Information */}
                    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-50">
                        <h2 className="text-[20px] font-extrabold text-greenDark mb-6">{t("AccountDetails.AccountData")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                            <InfoItem label={t("AccountDetails.Name")} value="أحمد المسوق" />
                            <InfoItem label={t("AccountDetails.UserCode")} value="AFF-2024" />
                            <InfoItem label={t("AccountDetails.Phone")} value="0123456789" />
                            <InfoItem label={t("AccountDetails.Email")} value="aff@example.com" />
                            <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-02-15" />
                            <InfoItem label={t("AccountDetails.Country")} value="الإمارات" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Statistics */}
                        <div className="space-y-4">
                            <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <StatCard label={t("AccountDetails.TotalCommissions")} value="$850" />
                                <StatCard label={t("AccountDetails.CommissionRate")} value="15%" />
                                <StatCard label={t("AccountDetails.ConversionRate")} value="3.5%" />
                            </div>
                        </div>

                        {/* Verifications */}
                        <div className="space-y-4">
                            <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Verifications")}</h2>
                            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 space-y-4">
                                <VerificationItem
                                    label={t("AccountDetails.EmailVerified")}
                                    date="15 فبراير 2024"
                                    isVerified={true}
                                    icon={ShieldCheck}
                                    colorClass="bg-[#067647]"
                                    verifiedOnText={t("AccountDetails.VerifiedOn")}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === "clicks" && (
                <DynamicTable
                    data={clicksData}
                    columns={clickColumns}
                    showSearch={false}
                />
            )}

            {activeTab === "conversions" && (
                <DynamicTable
                    data={conversionsData}
                    columns={conversionColumns}
                    showSearch={false}
                />
            )}

            {activeTab === "commissions" && (
                <DynamicTable
                    data={conversionsData} // Reuse same data for now
                    columns={conversionColumns}
                    showSearch={false}
                />
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "overview" && activeTab !== "clicks" && activeTab !== "conversions" && activeTab !== "commissions" && (
                <div className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-50 text-center">
                    <p className="text-gray-400 font-bold text-[20px]">
                        {t("Common.NoDataFound")}
                    </p>
                </div>
            )}
        </UserDetailLayout>
    );
}
