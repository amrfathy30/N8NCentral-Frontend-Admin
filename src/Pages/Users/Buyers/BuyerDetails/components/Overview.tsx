import { Check, Facebook, Shield } from "lucide-react";
import { InfoItem, StatCard, VerificationItem } from "../../../../../Components/Ui/UserDetailLayout";

export default function Overview({ t }: { t: any }) {
    return (
        <>
            {/* Account Information */}
            <h2 className="text-[20px] font-bold text-greenDark mb-4">{t("AccountDetails.AccountData")}</h2>
            <div className="bg-white rounded-[12px] p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                    <InfoItem label={t("AccountDetails.Name")} value="محمد علي" />
                    <InfoItem label={t("AccountDetails.Phone")} value="0123456789" />
                    <InfoItem label={t("AccountDetails.Email")} value="abc@123.com" />
                    <InfoItem label={t("AccountDetails.RegistrationDate")} value="2024-05-12" />
                    <InfoItem label={t("AccountDetails.lastActivity")} value={t("AccountDetails.lastActivityTime")} />
                    <InfoItem label={t("AccountDetails.Country")} value="مصر" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Statistics */}
                <div className="space-y-4 lg:col-span-1">
                    <h2 className="text-[20px] font-bold text-greenDark">{t("AccountDetails.Analytics")}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <StatCard label={t("AccountDetails.OrdersCount")} value="12" />
                        <StatCard label={t("AccountDetails.TotalSpent")} value="$1,240" />
                        <StatCard label={t("AccountDetails.OpenDisputes")} value="0" />
                    </div>
                </div>

                {/* Verifications */}
                <div className="space-y-4 lg:col-span-2">
                    <h2 className="text-[20px] font-bold text-greenDark">{t("AccountDetails.Verifications")}</h2>
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 border-2 border-greenDark rounded-full bg-gradient-to-tr from-[#ECFDF5] to-[#fff]">
                                    <Shield className="text-greenDark" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[20px] font-bold text-[#101828]">{t("AccountDetails.VerifiedAccount")}</span>
                                        <Check className="text-[#101828]" size={18} />
                                    </div>
                                    <p className="text-[#4A5565] text-[14px]">{t("AccountDetails.VerifiedAccountDesc")}</p>
                                </div>
                            </div>
                            <button className="bg-gradient-to-tr from-[#3E8F60] to-[#2B7B4C] text-white px-6 py-2 rounded-[8px] font-semibold text-[17px] hover:opacity-90 transition-colors cursor-pointer">
                                {t("AccountDetails.VerificationFiles")}
                            </button>
                        </div>

                        <VerificationItem
                            label={t("AccountDetails.EmailVerified")}
                            date="15 يناير 2024"
                            isVerified={true}
                            icon={Check}
                            colorClass="bg-[#067647]"
                            verifiedOnText={t("AccountDetails.VerifiedOn")}
                        />
                        <VerificationItem
                            label={t("AccountDetails.PhoneVerified")}
                            date="15 يناير 2024"
                            isVerified={true}
                            icon={Check}
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
        </>)
}
