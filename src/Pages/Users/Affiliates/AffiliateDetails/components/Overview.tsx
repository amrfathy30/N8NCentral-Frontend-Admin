import { InfoItem, StatCard } from '../../../../../Components/Ui/UserDetailLayout'

export default function Overview({ t }: { t: any }) {

    return (
        <>
            {/* Account Information */}
            <h2 className="text-[20px] font-bold text-greenDark mb-6">{t("AccountDetails.AffiliateData")}</h2>
            <div className="bg-white rounded-[12px] p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4">
                    <InfoItem label={t("AccountDetails.Name")} value=" محمد علي" />
                    <InfoItem label={t("AccountDetails.UserCode")} value="AFF-2024" />
                    <InfoItem label={t("AccountDetails.Email")} value="aff@example.com" />
                    <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-02-15" />
                    <InfoItem label={t("AccountDetails.Country")} value="مصر" />
                </div>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
                <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label={t("AccountDetails.Clicks")} value="4,820" />
                    <StatCard label={t("AccountDetails.Sales")} value="312" />
                    <StatCard label={t("AccountDetails.TotalCommissions")} value="$6,540" />
                    <StatCard label={t("AccountDetails.ConversionRate")} value="3.5%" />
                    <StatCard label={t("AccountDetails.CommissionRate")} value="15%" />
                    <StatCard label={t("AccountDetails.RiskScore")} value={t("AccountDetails.Low")} />
                </div>

            </div>
        </>)
}
