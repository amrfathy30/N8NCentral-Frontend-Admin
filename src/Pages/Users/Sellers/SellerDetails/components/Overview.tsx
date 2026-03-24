import { InfoItem, StatCard } from "../../../../../Components/Ui/UserDetailLayout";

interface OverviewProps {
    t: any;
}

export default function Overview({ t }: OverviewProps) {
    return (
        <>
            {/* Account Information */}
            <h2 className="text-[20px] font-extrabold text-greenDark mb-6">{t("AccountDetails.SellerData")}</h2>
            <div className="bg-white rounded-[12px] p-5 shadow-sm border border-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                    <InfoItem label={t("AccountDetails.StoreName")} value="متجر الأتمتة" />
                    <InfoItem label={t("AccountDetails.StoreOwner")} value="متجر الأتمتة" />
                    <InfoItem label={t("AccountDetails.Email")} value="store@example.com" />
                    <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-01-10" />
                    <InfoItem label={t("AccountDetails.lastActivity")} value="منذ 3 ساعة" />
                    <InfoItem label={t("AccountDetails.Country")} value="مصر" />
                </div>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
                <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label={t("AccountDetails.ServicesCount")} value="8" />
                    <StatCard label={t("AccountDetails.TotalSales")} value="150" />
                    <StatCard label={t("AccountDetails.TotalReview")} value="4.5" />
                </div>
            </div>
        </>)
}
