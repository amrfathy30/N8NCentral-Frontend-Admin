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
    Clock
} from "lucide-react";
import StatsCard from "../../../Components/Ui/StatsCard";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import Header from "../../../Components/Ui/Header";

export default function Sellers() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();
    const lang = i18n.language;

    const mockSellers = Array.from({ length: 2 }).map((_, i) => ({
        id: i + 1,
        name: "محمد علي",
        services: t("Sellers.ServicesValue", { count: 12 }),
        sales: "$4,250",
        country: "مصر",
        disputes: "0",
        status: i === 2 ? "pending" : "verified",
    }));

    const columns = [
        {
            header: t("Sellers.Expert"),
            field: "name",
            body: (rowData: any) => (
                <span>{rowData.name}</span>
            ),
        },
        {
            header: t("Sellers.ServicesCount"),
            field: "services",
            body: (rowData: any) => (
                <span>{rowData.services.count || "12 خدمة"}</span>
            ),
        },
        {
            header: t("Sellers.TotalSales"),
            field: "sales",
        },
        {
            header: t("Sellers.Country"),
            field: "country",
        },
        {
            header: t("Sellers.OpenDisputes"),
            field: "disputes",
        },
        {
            header: t("Sellers.Status"),
            field: "status",
            body: (rowData: any) => {
                const isVerified = rowData.status === "verified";
                const isPending = rowData.status === "pending";

                return (
                    <div className="flex justify-center">
                        <span className={`px-4 py-1 rounded-full text-[13px] font-medium flex items-center gap-1 ${isVerified ? "bg-green-50 text-green-600" :
                            isPending ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                            }`}>
                            {isVerified && <CheckCircle size={14} />}
                            {isVerified ? t("Common.Verified") :
                                isPending ? t("Common.PendingVerification") : t("Common.Blocked")}
                        </span>
                    </div>
                );
            }
        },
        {
            header: t("Sellers.Actions"),
            body: (rowData: any) => (
                <div className="flex justify-center items-center gap-3 text-gray-400">
                    <button
                        onClick={() => navigate(`/${lang}/admin/users/details/seller/${rowData.id}`)}
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
        { label: t("Common.PendingVerification"), value: "pending" },
        { label: t("Common.Blocked"), value: "blocked" },
    ];

    return (
        <div className="space-y-8" dir={dir}>
            {/* Header */}

            <Header title={t("Sellers.Title")} description={t("Sellers.Welcome")} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("Sellers.TotalSellers")}
                    value="248 تاجر"
                    icon={Users}
                    color="bg-[#8B5CF6]"
                />
                <StatsCard
                    title={t("Sellers.ActiveSellers")}
                    value="212 تاجر"
                    icon={ShoppingBag}
                    color="bg-[#10B981]"
                />
                <StatsCard
                    title={t("Sellers.PendingVerification")}
                    value="18 حساب"
                    icon={Clock}
                    color="bg-[#64748B4D]"
                />
                <StatsCard
                    title={t("Sellers.TotalRevenue")}
                    value="$125,480"
                    icon={DollarSign}
                    color="bg-[#F59E0B]"
                />
            </div>

            {/* Dynamic Table */}
            <DynamicTable
                data={mockSellers}
                columns={columns}
                searchPlaceholder={t("Sellers.SearchPlaceholder")}
                filterOptions={filterOptions}
            />
        </div>
    );
}
