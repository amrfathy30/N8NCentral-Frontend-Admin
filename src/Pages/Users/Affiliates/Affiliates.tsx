import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Users,
    CheckCircle,
    DollarSign,
    ShoppingBag,
    Ban,
    Pause,
    Eye,
} from "lucide-react";
import StatsCard from "../../../Components/Ui/StatsCard";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import Header from "../../../Components/Ui/Header";

export default function Affiliates() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();
    const lang = i18n.language;

    const mockAffiliates = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        name: "محمد علي",
        userCode: "#12345",
        clicks: "1,200",
        sales: "350$",
        services: "12 خدمة",
        status: "verified",
    }));

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
                        <span className={`px-4 py-1 rounded-full text-[13px] font-medium flex items-center gap-1 ${isVerified ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
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
                        className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                    <button className="text-[#F68713] p-1 rounded-md hover:text-white hover:bg-[#F68713] transition-colors">
                        <Pause size={18} />
                    </button>
                    <button className="text-[#D00808] p-1 rounded-md hover:text-white hover:bg-[#D00808] transition-colors">
                        <Ban size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filterOptions = [
        { label: t("Common.All"), value: "all" },
        { label: t("Common.Verified"), value: "verified" },
        { label: t("Common.Suspended"), value: "suspended" },
        { label: t("Common.Blocked"), value: "blocked" },
    ];

    return (
        <div className="space-y-8" dir={dir}>
            <Header title={t("Affiliates.Title")} description={t("Affiliates.Welcome")} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("Affiliates.TotalAffiliates")}
                    value="542"
                    icon={Users}
                    color="bg-[#8B5CF6]"
                />
                <StatsCard
                    title={t("Affiliates.ActiveAffiliates")}
                    value="312"
                    icon={ShoppingBag}
                    color="bg-[#10B981]"
                />
                <StatsCard
                    title={t("Affiliates.PaidCommissions")}
                    value="$48,750"
                    icon={CheckCircle}
                    color="bg-[#10B9814D]"
                />
                <StatsCard
                    title={t("Affiliates.PendingCommissions")}
                    value="$125,480"
                    icon={DollarSign}
                    color="bg-[#F59E0B]"
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
