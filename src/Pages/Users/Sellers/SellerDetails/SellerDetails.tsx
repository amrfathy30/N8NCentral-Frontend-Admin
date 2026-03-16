import { useTranslation } from "react-i18next";
import {
    User,
    ShoppingBag,
    DollarSign,
    ShieldCheck,
    Clock,
    Briefcase
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout, { InfoItem, StatCard, VerificationItem } from "../../../../Components/Ui/UserDetailLayout";
import DynamicTable from "../../../../Components/Ui/DynamicTable";

export default function SellerDetails() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview"), icon: User },
        { id: "services", label: t("AccountDetails.Services"), icon: Briefcase },
        { id: "sales", label: t("AccountDetails.Sales"), icon: ShoppingBag },
        { id: "earnings", label: t("AccountDetails.Earnings"), icon: DollarSign },
        { id: "logs", label: t("AccountDetails.Logs"), icon: Clock },
    ];

    const serviceColumns = [
        { field: "id", header: "#" },
        { field: "name", header: t("AccountDetails.ServiceName") || "الخدمة" },
        { field: "price", header: t("AccountDetails.Price") || "السعر" },
        { field: "sales", header: t("AccountDetails.SalesCount") || "المبيعات" },
        { 
            field: "status", 
            header: t("AccountDetails.Status") || "الحالة",
            body: () => (
                <span className="text-[#2ECC71] font-bold">نشط</span>
            )
        },
    ];

    const servicesData = Array.from({ length: 5 }).map((_, i) => ({
        id: i + 1,
        name: "تحويل البيانات إلى Google Sheets",
        price: "$45",
        sales: "24",
        status: "Active"
    }));

    const salesColumns = [
        { field: "id", header: t("AccountDetails.OrderId") || "رقم الطلب" },
        { field: "buyer", header: t("AccountDetails.Buyer") || "المشتري" },
        { field: "amount", header: t("AccountDetails.Amount") || "المبلغ" },
        { field: "date", header: t("AccountDetails.Date") || "التاريخ" },
        { field: "status", header: t("AccountDetails.Status") || "الحالة" },
    ];

    const salesData = Array.from({ length: 10 }).map((_, i) => ({
        id: `#ORD-${1000 + i}`,
        buyer: "محمد أحمد",
        amount: "$50",
        date: "2024-05-10",
        status: "مكتمل"
    }));

    return (
        <UserDetailLayout
            userName="متجر الأتمتة"
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
                            <InfoItem label={t("AccountDetails.Name")} value="متجر الأتمتة" />
                            <InfoItem label={t("AccountDetails.Phone")} value="0123456789" />
                            <InfoItem label={t("AccountDetails.Email")} value="store@example.com" />
                            <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-01-10" />
                            <InfoItem label={t("AccountDetails.lastActivity")} value="منذ ساعة" />
                            <InfoItem label={t("AccountDetails.Country")} value="السعودية" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Statistics */}
                        <div className="space-y-4">
                            <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <StatCard label={t("AccountDetails.ServicesCount")} value="8" />
                                <StatCard label={t("AccountDetails.TotalSales")} value="150" />
                                <StatCard label={t("AccountDetails.TotalRevenue")} value="$4,500" />
                            </div>
                        </div>

                        {/* Verifications */}
                        <div className="space-y-4">
                            <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Verifications")}</h2>
                            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 space-y-4">
                                <VerificationItem
                                    label={t("AccountDetails.EmailVerified")}
                                    date="10 يناير 2024"
                                    isVerified={true}
                                    icon={ShieldCheck}
                                    colorClass="bg-[#067647]"
                                    verifiedOnText={t("AccountDetails.VerifiedOn")}
                                />
                                <VerificationItem
                                    label={t("AccountDetails.PhoneVerified")}
                                    date="12 يناير 2024"
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

            {activeTab === "services" && (
                <DynamicTable
                    data={servicesData}
                    columns={serviceColumns}
                    showSearch={false}
                />
            )}

            {activeTab === "sales" && (
                <DynamicTable
                    data={salesData}
                    columns={salesColumns}
                    showSearch={false}
                />
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "overview" && activeTab !== "services" && activeTab !== "sales" && (
                <div className="bg-white rounded-[24px] p-12 shadow-sm border border-gray-50 text-center">
                    <p className="text-gray-400 font-bold text-[20px]">
                        {t("Common.NoDataFound")}
                    </p>
                </div>
            )}
        </UserDetailLayout>
    );
}
