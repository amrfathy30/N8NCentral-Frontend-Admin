import { InfoItem, StatCard } from "../../../../../Components/Ui/UserDetailLayout";
import { CheckCircle, XCircle } from "lucide-react";

interface OverviewProps {
    t: any;
    sellerData: any;
}

export default function Overview({ t, sellerData }: OverviewProps) {
    const overview = sellerData?.data?.overview;
    const statistics = sellerData?.data?.statistics;

    if (!overview) return null;

    return (
        <>
            {/* Account Information */}
            <h2 className="text-[20px] font-extrabold text-greenDark mb-6">{t("AccountDetails.SellerData")}</h2>
            <div className="bg-white rounded-[12px] p-5 shadow-sm border border-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                    <InfoItem label={t("AccountDetails.StoreName")} value={overview.store?.store_name || "—"} />
                    <InfoItem label={t("AccountDetails.StoreOwner")} value={overview.full_name || "—"} />
                    <InfoItem label={t("AccountDetails.Email")} value={overview.email || "—"} />
                    <InfoItem label={t("AccountDetails.Phone")} value={overview.phone || "—"} />
                    <InfoItem label={t("AccountDetails.RegistrationDate")} value={overview.registration_date || "—"} />
                    <InfoItem
                        label={t("AccountDetails.lastActivity")}
                        value={overview.last_activity_at ? new Date(overview.last_activity_at).toLocaleDateString() : "—"}
                    />
                    <InfoItem label={t("AccountDetails.Country")} value={overview.country || "—"} />
                    <InfoItem label={t("AccountDetails.StoreType")} value={overview.store?.activity_type || "—"} />
                    <InfoItem label={t("AccountDetails.StoreStatus")} value={overview.store?.status || "—"} />
                </div>

                {/* Store Description */}
                {overview.store?.description && (
                    <div className="mt-6 pt-5 border-t border-gray-100">
                        <p className="text-greenDark text-[14px] font-bold mb-1">{t("AccountDetails.StoreDescription")}</p>
                        <p className="text-gray-600 text-[14px]">{overview.store.description}</p>
                    </div>
                )}

                {/* Account Verified Badge */}
                <div className="mt-5 flex items-center gap-2">
                    {overview.is_account_verified ? (
                        <span className="flex items-center gap-1.5 bg-green-50 text-greenDark text-[13px] font-semibold px-3 py-1.5 rounded-full border border-green-200">
                            <CheckCircle size={14} /> {t("AccountDetails.AccountVerified")}
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 bg-red-50 text-red-600 text-[13px] font-semibold px-3 py-1.5 rounded-full border border-red-200">
                            <XCircle size={14} /> {t("AccountDetails.AccountNotVerified")}
                        </span>
                    )}
                </div>
            </div>

            {/* Statistics */}
            {statistics && (
                <div className="space-y-4 mt-6">
                    <h2 className="text-[20px] font-extrabold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard label={t("AccountDetails.ServicesCount")} value={String(statistics.services_count ?? 0)} />
                        <StatCard label={t("AccountDetails.TotalSales")} value={String(statistics.total_sales_amount ?? 0)} />
                        <StatCard label={t("AccountDetails.TotalReview")} value={String(statistics.average_rating ?? 0)} />
                    </div>
                </div>
            )}
        </>
    );
}
