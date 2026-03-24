import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Drawer from "../../../Components/Ui/Drawer";

interface AccountDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    account: any;
}

export default function AccountDetailsDrawer({ isOpen, onClose, account }: AccountDetailsDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
        <div className={`flex items-center flex-wrap gap-2 ${className}`}>
            <span className="text-greenDark text-[14px] font-bold">{label}</span>
            <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
        </div>
    );

    const StatBox = ({ label, value, subValue }: { label: string; value: string; subValue?: string }) => (
        <div className="bg-white border border-gray-100 rounded-[12px] p-3 flex flex-col gap-1 shadow-sm">
            <span className="text-[#333A42] text-[16px] font-semibold">{label}</span>
            <span className="text-greenDark text-[16px] font-bold">{value}</span>
            {subValue && <span className="text-[#027A48] text-[11px] font-medium">{subValue}</span>}
        </div>
    );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={t("AccountDetails.Title")}
            maxWidth="500px"
            side={dir === 'rtl' ? 'left' : 'right'}
        >

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4">
                {/* Account Data */}
                <section className="space-y-3">
                    <div className="bg-[#fff] rounded-[12px] p-5">
                        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                            <DetailItem label={t("AccountDetails.Name")} value={account?.name || "أحمد خالد"} />
                            <DetailItem label={t("AccountDetails.ReferralCode")} value="A-9F-CR8" />
                            <DetailItem label={t("AccountDetails.RegistrationDate")} value="2024-05-12" />
                            <DetailItem label={t("AccountDetails.lastActivity")} value={t("AccountDetails.lastActivityTime")} />
                            <DetailItem label={t("AccountDetails.Email")} value="Ahm@123.com" className="col-span-1" />
                            <DetailItem label={t("AccountDetails.Country")} value="مصر" />
                        </div>
                    </div>
                </section>

                {/* Analytics */}
                <section className="space-y-4">
                    <h3 className="text-[#027A48] text-[21px] font-bold">
                        {t("AccountDetails.Analytics")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <StatBox label={t("AccountDetails.RiskScore")} value={t("AccountDetails.Low")} />
                        <StatBox label={t("AccountDetails.TotalCommissions")} value="68,540" />
                        <StatBox label={t("AccountDetails.CommissionRate")} value="12%" />
                        <StatBox label={t("AccountDetails.Sales")} value="312" />
                        <StatBox label={t("AccountDetails.ConversionRate")} value="3.5%" />
                        <StatBox label={t("AccountDetails.Clicks")} value="1,830" />
                    </div>
                </section>

                {/* Activity Log */}
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

                    {/* footer  */}
                    <div className="pt-4 pb-6 border-t border-gray-50 bg-[#F9FAFB] space-y-3" >
                        <button className="w-full bg-[#2B7B4C] hover:bg-[#23663f] text-white py-3 rounded-[12px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                            {t("AccountDetails.SendNotification")}
                        </button>
                        <button className="w-full bg-[#F68713] hover:bg-[#d97706] text-white py-3 rounded-[12px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                            {t("AccountDetails.RestoreAccount")}
                        </button>
                        <button className="w-full bg-[#D00808] hover:bg-[#b91c1c] text-white py-3 rounded-[12px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]">
                            {t("AccountDetails.BanAccount")}
                        </button>
                    </div>

                </section>
            </div>



        </Drawer>
    );
}
