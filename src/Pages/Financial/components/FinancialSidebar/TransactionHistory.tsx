
import { useTranslation } from "react-i18next";
import CustomSelect from "../../../../Components/Ui/CustomSelect";
import { Search } from "lucide-react";
import { Input } from "../../../../Components/Ui/Input";

export default function TransactionHistory({ transactions }: { transactions: any[] }) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const options = [
        { value: "all", label: t("Common.All") },
        { value: "OrderPayment", label: t("Financial.Sidebar.OrderPayment") },
        { value: "PlatformCommission", label: t("Financial.Sidebar.PlatformCommission") },
        { value: "AffiliateCommission", label: t("Financial.Sidebar.AffiliateCommission") },
        { value: "Refund", label: t("Financial.Sidebar.Refund") },
        { value: "Withdrawal", label: t("Financial.Sidebar.Withdrawal") },
    ];

    const getBadgeStyles = (type: string) => {
        switch (type) {
            case "OrderPayment":
                return "bg-[#E6F4EA] text-greenDark";
            case "PlatformCommission":
                return "bg-[#E8EAF6] text-[#3F51B5]";
            case "AffiliateCommission":
                return "bg-[#F3E5F5] text-[#9C27B0]";
            case "Refund":
                return "bg-[#FFF3E0] text-[#EF6C00]";
            case "Withdrawal":
                return "bg-[#F5F5F5] text-[#616161]";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="custom-card space-y-6">
            <div className="flex flex-col gap-1">
                <h4 className="font-bold text-gray-800">{t("Financial.Sidebar.TransactionHistory")}</h4>
                <p className="text-[#6B7280] text-[14px]">{t("Financial.Sidebar.TransactionHistoryDescription")}</p>
            </div>

            <div className="flex items-center gap-3">
                <CustomSelect
                    options={options}
                    className="w-40"
                    placeholder={t("Financial.Sidebar.FilterType")}
                    value={options[0]}
                    isSearchable={true}
                />
                <div className="flex-1 relative">
                    <Input
                        placeholder={t("Financial.Sidebar.Search")}
                        className="!mb-0"
                        inputClassName="!bg-[#F9FAFB] !border-[#E5E7EB] !rounded-[12px] !py-2 !h-10 !text-xs !pr-10"
                    />
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} size={16} />
                </div>
            </div>

            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 rounded-[20px] border border-[#E5E7EB] bg-white hover:shadow-md transition-shadow relative">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex gap-2 items-center">
                                    {/* <span className={`text-[14px] font-extrabold`}>
                                    {t(`Financial.Sidebar.${tx.type}`)}
                                </span> */}
                                    <span className={`px-3 py-1 rounded-full text-[12px] font-extrabold ${getBadgeStyles(tx.type)}`}>
                                        {t(`Financial.Sidebar.${tx.type}`)}
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 font-medium">
                                    {tx.date} • {tx.time} • {tx.txId}
                                </p>
                                <p className="text-[12px] text-[#4B5563] font-medium">{tx.description}</p>
                            </div>
                            <div>
                                <p className={`text-[18px] font-extrabold ${tx.status === 'positive' ? 'text-greenDark' : 'text-[#D00808]'}`}>
                                    {tx.amount}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold">{tx.code}</p>
                            </div>
                        </div>

                        <div className="mt-3 flex justify-between items-start">
                            <button className="text-greenDark text-[12px] font-bold hover:underline transition-all">
                                {t("Financial.Sidebar.ViewDetails")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
