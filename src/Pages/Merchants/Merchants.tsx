import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Users,
    ShoppingCart,
    Clock,
    Eye,
    Play,
    Ban,
    CheckCircle,
} from "lucide-react";
import { HandCoins } from "../../icons";
import StatsCard from "../../Components/Ui/StatsCard";
import DynamicTable from "../../Components/Ui/DynamicTable";
import VerificationDetails from "./VerificationDetails/VerificationShow";
import Header from "../../Components/Ui/Header";

export default function Merchants() {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("verified");

    const getHeaderClass = (filter: string) => {
        const baseClass = "!text-white !font-bold !py-4 !border-none !text-[15px]";
        switch (filter) {
            case "verified": return `${baseClass} !bg-greenDark`;
            case "pending": return `${baseClass} !bg-[#F68713]`;
            case "blocked": return `${baseClass} !bg-[#E7000B]`;
            default: return `${baseClass} !bg-greenDark`;
        }
    };

    const mockMerchants = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        name: "محمد علي",
        type: "خبير أتمتة وربط الأنظمة",
        services: "12 خدمة",
        sales: "$4,250",
        country: "مصر",
        idNumber: "123456778",
        birthDate: "12/2/2001",
        stopReason: "Refund Rate مرتفع",
        stopDate: "2024-05-12",
        remainingBan: "12 يوم",
        status: i < 3 ? "verified" : i < 5 ? "pending" : "blocked"
    }));

    const getColumns = () => {
        const headerClassName = getHeaderClass(activeFilter);
        const baseColumns = [
            { header: t("Merchants.Expert"), field: "name", headerClassName }
        ];

        if (activeFilter === "verified") {
            return [
                ...baseColumns,
                { header: t("Merchants.ServicesCount"), field: "services", headerClassName },
                { header: t("Merchants.TotalSales"), field: "sales", width: "140px", headerClassName },
                { header: t("Merchants.Country"), field: "country", headerClassName },
                { header: t("Merchants.Disputes"), body: () => "0", headerClassName },
                {
                    header: t("Merchants.Status"),
                    headerClassName,
                    body: () => (
                        <div className="flex justify-center">
                            <span className="bg-[#2B7B4C]/20 text-greenDark px-3 py-1 rounded-full text-[11px] flex items-center gap-1 w-fit">
                                {t("Merchants.Approved")}<CheckCircle size={12} strokeWidth={3} />
                            </span>
                        </div>
                    ),
                },
                {
                    header: t("Merchants.Actions"),
                    headerClassName,
                    body: () => (
                        <div className="flex gap-2 items-center justify-center">
                            <button onClick={() => setIsModalOpen(true)} className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:opacity-90 transition-colors">{t("Merchants.View")}</button>
                            <button className="bg-[#F68713] text-white py-2 px-5 rounded-[10px] hover:opacity-90 transition-colors">{t("Merchants.Stop")}</button>
                            <button className="bg-[#E7000B] text-white py-2 px-5 rounded-[10px] hover:opacity-90 transition-colors">{t("Merchants.Blocked")}</button>
                        </div>
                    ),
                },
            ];
        } else if (activeFilter === "pending") {
            return [
                ...baseColumns,
                { header: t("Merchants.ExpertiseType"), field: "type", headerClassName },
                { header: t("Merchants.IDNumber"), field: "idNumber", headerClassName },
                { header: t("Merchants.Country"), field: "country", headerClassName },
                { header: t("Merchants.BirthDate"), field: "birthDate", headerClassName },
                {
                    header: t("Merchants.Status"),
                    headerClassName,
                    body: () => (
                        <div className="flex justify-center">
                            <span className="bg-[#F68713]/20 text-[#F68713] px-6 py-3 rounded-full text-[12px] flex items-center gap-1 w-fit">
                                 {t("Merchants.WaitingVerification")} <Clock size={14} strokeWidth={3} />
                            </span>
                        </div>
                    ),
                },
                {
                    header: t("Merchants.Actions"),
                    headerClassName,
                    body: () => (
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => setIsModalOpen(true)} className="bg-greenDark text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.ViewDetails")}</button>
                            <button className="bg-[#F68713] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.VerifyAction")}</button>
                            <button className="bg-[#E7000B] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.Reject")}</button>
                        </div>
                    ),
                },
            ];
        } else {
            return [
                ...baseColumns,
                { header: t("Merchants.Type"), field: "type", headerClassName },
                { header: t("Merchants.StopReason"), field: "stopReason", headerClassName },
                { header: t("Merchants.StopDate"), field: "stopDate", headerClassName },
                { header: t("Merchants.RemainingBan"), field: "remainingBan", headerClassName },
                {
                    header: t("Merchants.Status"),
                    headerClassName,
                    body: () => (
                        <div className="flex justify-center">
                            <span className="bg-[#E7000B]/20 text-[#E7000B] px-6 py-3 rounded-full text-[12px] font-bold w-fit flex items-center gap-1">
                                {t("Merchants.Blocked")}
                                <CheckCircle size={14} strokeWidth={3} />
                            </span>
                        </div>
                    )
                },
                {
                    header: t("Merchants.Actions"),
                    headerClassName,
                    body: () => (
                        <div className="flex gap-4 items-center justify-center">
                            <Eye className="text-greenDark cursor-pointer hover:opacity-70 transition-colors" size={24} />
                            <Play className="text-[#F68713] cursor-pointer hover:opacity-70 transition-colors" size={24} fill="currentColor" />
                            <Ban className="text-[#D00808] cursor-pointer hover:opacity-70 transition-colors" size={24} />
                        </div>
                    ),
                },
            ];
        }
    };

    const filterOptions = [
        { label: t("Merchants.Verified"), value: "verified" },
        { label: t("Merchants.WaitingVerification"), value: "pending" },
        { label: t("Merchants.Blocked"), value: "blocked" },
    ];

    return (
        <div className="flex flex-col gap-4" dir={dir}>
            <Header title={t("Merchants.Title")} description={t("Merchants.Welcome")} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard title={t("Merchants.TotalMerchants")} value="248" icon={Users} color="bg-[#AD46FF]" />
                <StatsCard title={t("Merchants.ActiveMerchants")} value="212" icon={ShoppingCart} color="bg-greenDark" />
                <StatsCard title={t("Merchants.PendingVerification")} value="18" icon={CheckCircle} color="bg-[#F6F6F6] !text-greenDark" />
                <StatsCard title={t("Merchants.TotalRevenue")} value="$125,480" icon={HandCoins} color="bg-[#F0B100]" />
            </div>

            <DynamicTable
                data={mockMerchants}
                columns={getColumns()}
                searchPlaceholder={t("Merchants.SearchPlaceholder")}
                filterOptions={filterOptions}
                activeFilter={activeFilter}
                onFilterChange={(val) => setActiveFilter(val)}
                filterField="status"
            />

            <VerificationDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}