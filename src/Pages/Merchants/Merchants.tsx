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

    const themeColors: any = {
        verified: { bg: "#2B7B4C", text: "#2B7B4C", light: "#FFFFFF" },
        pending: { bg: "#F68713", text: "#F68713", light: "#FFFFFF" },
        blocked: { bg: "#E7000B", text: "#E7000B", light: "#FFFFFF" },
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
    }));

    const getColumns = () => {
        const baseColumns = [{ header: t("Merchants.Expert"), field: "name" }];

        if (activeFilter === "verified") {
            return [
                ...baseColumns,
                { header: t("Merchants.ServicesCount"), field: "services" },
                { header: t("Merchants.TotalSales"), field: "sales", width: "140px" },
                { header: t("Merchants.Country"), field: "country" },
                { header: t("Merchants.Disputes"), body: () => "0" },
                {
                    header: t("Merchants.Status"),
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
                    body: () => (
                        <div className="flex gap-2 items-center justify-center">
                            <button onClick={() => { setIsModalOpen(true); }} className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark/90 transition-colors"
                            >{t("Merchants.View")}</button>
                            <button className="bg-[#F68713] text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-[#F68713]/90 transition-colors">{t("Merchants.Stop")}</button>
                            <button className="bg-[#E7000B] text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-[#E7000B]/90 transition-colors">{t("Merchants.Blocked")}</button>
                        </div>
                    ),
                },
            ];
        } else if (activeFilter === "pending") {
            return [
                ...baseColumns,
                { header: t("Merchants.ExpertiseType"), field: "type" },
                { header: t("Merchants.IDNumber"), field: "idNumber" },
                { header: t("Merchants.Country"), field: "country" },
                { header: t("Merchants.BirthDate"), field: "birthDate" },
                {
                    header: t("Merchants.Status"),
                    body: () => (
                        <div className="flex justify-center">
                            <span className="bg-[#F68713]/20 text-[#F68713] px-6 py-3 rounded-full text-[12px] flex items-center gap-1 w-fit">
                                <Clock size={14} strokeWidth={3} /> {t("Merchants.WaitingVerification")}
                            </span>
                        </div>
                    ),
                },
                {
                    header: t("Merchants.Actions"),
                    body: () => (
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => { setIsModalOpen(true); }} className="bg-greenDark text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.ViewDetails")}</button>
                            <button className="bg-[#F68713] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.VerifyAction")}</button>
                            <button className="bg-[#E7000B] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">{t("Merchants.Reject")}</button>
                        </div>
                    ),
                },
            ];
        } else {
            return [
                ...baseColumns,
                { header: t("Merchants.Type"), field: "type" },
                { header: t("Merchants.StopReason"), field: "stopReason" },
                { header: t("Merchants.StopDate"), field: "stopDate" },
                { header: t("Merchants.RemainingBan"), field: "remainingBan" },
                {
                    header: t("Merchants.Status"),
                    body: (row: any) => {
                        const isVerified = row.status === "verified";

                        return (
                            <div className="flex justify-center">
                                <span className={`
                        flex items-center gap-1 px-6 py-3 rounded-full text-[12px] font-bold w-fit
                        ${isVerified
                                        ? "bg-[#2B7B4C]/20 text-greenDark"
                                        : "bg-[#E7000B]/20 text-[#E7000B]"
                                    }
                    `}>
                                    {isVerified ? (
                                        <>
                                            <CheckCircle size={14} strokeWidth={3} />
                                            <span>{t("Merchants.Verified")}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="relative flex items-center justify-center">
                                                <CheckCircle size={14} strokeWidth={3} />
                                            </div>
                                            <span>{t("Merchants.Unverified")}</span>
                                        </>
                                    )}
                                </span>
                            </div>
                        );
                    }
                },
                {
                    header: t("Merchants.Actions"),
                    body: () => (
                        <div className="flex gap-4 items-center justify-center">
                            <Eye className="text-greenDark cursor-pointer hover:text-gray-400 transition-colors" size={24} />
                            <Play className="text-[#F68713] cursor-pointer hover:text-orange-600 transition-colors" size={24} fill="currentColor" />
                            <Ban className="text-[#D00808] cursor-pointer hover:text-red-600 transition-colors" size={24} />
                        </div>
                    ),
                },
            ];
        }
    };

    return (
        <div className="flex flex-col gap-4" dir={dir}>
            <Header title={t("Merchants.Title")} description={t("Merchants.Welcome")} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard title={t("Merchants.TotalMerchants")} value={`248 ${t("Merchants.Stats.Unit")}`} icon={Users} color="bg-[#AD46FF]" />
                <StatsCard title={t("Merchants.ActiveMerchants")} value={`212 ${t("Merchants.Stats.Unit")}`} icon={ShoppingCart} color="bg-greenDark" />
                <StatsCard title={t("Merchants.PendingVerification")} value={`18 ${t("Merchants.Stats.AccountUnit")}`} icon={CheckCircle} color="bg-[#F6F6F6] !text-greenDark" />
                <StatsCard title={t("Merchants.TotalRevenue")} value="$125,480" icon={HandCoins} color="bg-[#F0B100]" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="p-4 flex items-center gap-2 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder={t("Merchants.SearchPlaceholder")}
                            className="w-full border border-gray-200 bg-[#F9FAFB] rounded-lg pr-10 pl-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-greenDark/20 transition-all"
                        />
                    </div>
                    <div className="flex bg-[#F9FAFB] p-1 rounded-lg border border-gray-100 w-fit">
                        <button
                            onClick={() => setActiveFilter("verified")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "verified" ? "bg-greenDark text-white shadow-md" : "text-[#98A2B3]"}`}
                        >
                            {t("Merchants.Verified")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("pending")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "pending" ? "bg-[#F68713] text-white shadow-md" : "text-[#98A2B3]"}`}
                        >
                            {t("Merchants.WaitingVerification")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("blocked")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "blocked" ? "bg-[#E7000B] text-white shadow-md" : "text-[#98A2B3]"}`}
                        >
                            {t("Merchants.Blocked")}
                        </button>
                    </div>

                </div>

                <div className="dynamic-table-wrapper overflow-x-auto">
                    <style>{`
                        .dynamic-table-wrapper thead th { 
                            background-color: ${themeColors[activeFilter].bg} !important;
                            color: white !important;
                            padding-top: 1rem;
                            padding-bottom: 1rem;
                        }
                        .dynamic-table-wrapper table { border-radius: 0 !important; }
                    `}</style>
                    <DynamicTable
                        data={mockMerchants}
                        columns={getColumns()}
                        showSearch={false}
                    />
                </div>
            </div>

            <VerificationDetails isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}