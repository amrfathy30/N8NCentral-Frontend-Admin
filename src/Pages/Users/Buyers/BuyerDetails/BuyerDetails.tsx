import { useTranslation } from "react-i18next";
import {
    User,
    ShoppingBag,
    DollarSign,
    ShieldCheck,
    Facebook,
    Clock
} from "lucide-react";
import { useState } from "react";
import DynamicTable from "../../../../Components/Ui/DynamicTable";
import UserDetailLayout, { DetailItem, InfoItem, StatCard, VerificationItem } from "../../../../Components/Ui/UserDetailLayout";

export default function BuyerDetails() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview"), icon: User },
        { id: "orders", label: t("AccountDetails.Orders"), icon: ShoppingBag },
        { id: "logs", label: t("AccountDetails.Logs"), icon: Clock },
    ];

    const orderColumns = [
        { field: "id", header: t("AccountDetails.OrderId") },
        { field: "service", header: t("AccountDetails.Service") },
        { field: "amount", header: t("AccountDetails.Amount") },
        { field: "date", header: t("AccountDetails.PurchaseDate") },
        { 
            field: "status", 
            header: t("AccountDetails.Status"),
            body: (rowData: any) => (
                <span className="text-[#2ECC71] font-bold">
                    {t(`AccountDetails.${rowData.status}`)}
                </span>
            )
        },
    ];

    const ordersData = Array.from({ length: 12 }).map((_, i) => ({
        id: `#${2143 + i}`,
        service: "ربط Google Sheets مع WhatsApp",
        amount: "50$",
        date: "12/2/2025",
        status: "Completed"
    }));

    return (
        <UserDetailLayout
            userName="محمد علي"
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
                                    verifiedOnText={t("AccountDetails.VerifiedOn")}
                                />
                                <VerificationItem
                                    label={t("AccountDetails.PhoneVerified")}
                                    date="15 يناير 2024"
                                    isVerified={true}
                                    icon={ShieldCheck}
                                    colorClass="bg-[#067647]"
                                    verifiedOnText={t("AccountDetails.VerifiedOn")}
                                />
                                <VerificationItem
                                    label={t("AccountDetails.FacebookConnected")}
                                    isVerified={false}
                                    icon={Facebook}
                                    colorClass="bg-[#2D6ADF]"
                                    verifiedOnText={t("AccountDetails.VerifiedOn")}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === "orders" && (
                <DynamicTable
                    data={ordersData}
                    columns={orderColumns}
                    showSearch={false}
                />
            )}

            {activeTab === "logs" && (
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

            
        </UserDetailLayout>
    );
}
