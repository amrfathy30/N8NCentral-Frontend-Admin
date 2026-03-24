import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Users,
    CheckCircle
} from "lucide-react";
import StatsCard from "../Dashboard/components/StatsCard";
import DynamicTable from "../../Components/Ui/DynamicTable";
import { Cart2, CashBag } from "../../icons";
import ConfirmModal from "../../Components/Ui/ConfirmModal";

export default function AffiliatesPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();
    const lang = i18n.language;

    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [selectedAffiliate, setSelectedAffiliate] = useState<any>(null);

    const mockAffiliates = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        name: "محمد علي",
        userCode: "#12345",
        clicks: "1,200",
        sales: "350$",
        services: "12 خدمة",
        status: "verified",
    }));

    const handleStopClick = (affiliate: any) => {
        setSelectedAffiliate(affiliate);
        setIsStopModalOpen(true);
    };

    const handleBanClick = (affiliate: any) => {
        setSelectedAffiliate(affiliate);
        setIsBanModalOpen(true);
    };

    const handleConfirmStop = () => {
        console.log("Stopping affiliate:", selectedAffiliate);
        setIsStopModalOpen(false);
        setSelectedAffiliate(null);
    };

    const handleConfirmBan = () => {
        console.log("Banning affiliate permanently:", selectedAffiliate);
        setIsBanModalOpen(false);
        setSelectedAffiliate(null);
    };

    const columns = [
        {
            header: t("Affiliates.Name"),
            field: "name",
            body: (rowData: any) => (
                <span className="text-greenDark font-medium">{rowData.name}</span>
            ),
        },
        {
            header: t("Affiliates.UserCode"),
            field: "userCode",
        },
        {
            header: t("Affiliates.Clicks"),
            field: "clicks",
        },
        {
            header: t("Affiliates.Sales"),
            field: "sales",
        },
        {
            header: t("Affiliates.AddedServices"),
            field: "services",
        },
        {
            header: t("Affiliates.Status"),
            field: "status",
            body: (rowData: any) => {
                const isVerified = rowData.status === "verified";
                return (
                    <div className="flex justify-center">
                        <span className={`px-4 py-1 rounded-full text-[13px] font-medium flex items-center gap-1 ${isVerified ? "bg-[#2B7B4C33] text-greenDark" : "bg-red-50 text-red-600"
                            }`}>
                            {isVerified && <CheckCircle size={14} />}
                            {isVerified ? t("Common.Verified") : t("Common.Blocked")}
                        </span>
                    </div>
                );
            }
        },
        {
            header: t("Affiliates.Actions"),
            body: (rowData: any) => (
                <div className="flex justify-center items-center gap-3 text-gray-400">
                    <button
                        onClick={() => navigate(`/${lang}/admin/users/details/affiliate/${rowData.id}`)}
                        className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark transition-colors"
                    >
                        {t("AccountDetails.AddedServices.ViewDetails") || "عرض"}
                    </button>
                    <button
                        onClick={() => handleStopClick(rowData)}
                        className="bg-[#F68713] text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-[#F68713] transition-colors"
                    >
                        {t("AccountDetails.AddedServices.Stop") || "إيقاف"}
                    </button>
                    <button
                        onClick={() => handleBanClick(rowData)}
                        className="bg-[#D00808] text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-[#D00808] transition-colors"
                    >
                        {t("AccountDetails.BanAccount") || "حظر"}
                    </button>
                </div>
            ),
        },
    ];

    const filterOptions = [
        { label: t("Common.All"), value: "all" },
        { label: t("Common.Verified"), value: "verified" },
        { label: t("Common.WaitVerified"), value: "waitVerified" },
        { label: t("Common.Blocked"), value: "blocked" },
    ];

    return (
        <div className="space-y-8" dir={dir}>
            <ConfirmModal
                isOpen={isStopModalOpen}
                onClose={() => setIsStopModalOpen(false)}
                onConfirm={handleConfirmStop}
                title={t("Affiliates.ConfirmStopTitle")}
                message={t("Affiliates.ConfirmStopMessage")}
                isStop={true}
            />

            <ConfirmModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onConfirm={handleConfirmBan}
                title={t("Affiliates.ConfirmBanTitle")}
                message={t("Affiliates.ConfirmBanMessage")}
                isDanger={true}
            />

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-[#101828]">{t("Affiliates.Title")}</h1>
                <p className="text-gray-500 font-medium">{t("Affiliates.Welcome")}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("Affiliates.TotalClicks")}
                    value="542"
                    icon={Users}
                    color="bg-[#AD46FF]"
                />
                <StatsCard
                    title={t("Affiliates.Sales")}
                    value="312"
                    icon={Cart2}
                    color="bg-[#3E8F60]"
                />
                <StatsCard
                    title={t("Affiliates.ConversionRate")}
                    value="$48,750"
                    icon={CheckCircle}
                    color="bg-greenDark"
                />
                <StatsCard
                    title={t("Affiliates.TotalCommissions")}
                    value="$125,480"
                    icon={CashBag}
                    color="bg-[#F0B100]"
                />
            </div>

            {/* Dynamic Table */}
            <DynamicTable
                data={mockAffiliates}
                columns={columns}
                searchPlaceholder={t("Affiliates.SearchPlaceholder")}
                filterOptions={filterOptions}
            />
        </div>
    );
}
