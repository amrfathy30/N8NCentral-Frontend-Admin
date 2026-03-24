import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Users,
    CheckCircle,
    DollarSign,
    UserCheck,
    Ban,
    Pause,
    Eye
} from "lucide-react";
import StatsCard from "../../../Components/Ui/StatsCard";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import Header from "../../../Components/Ui/Header";

export default function Buyers() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();
    const lang = i18n.language;

    const mockBuyers = Array.from({ length: 7 }).map((_, i) => ({
        id: i + 1,
        name: "محمد علي",
        email: "abc@123.com",
        phone: "12345678",
        orders: "12 (2143 $)",
        disputes: "0",
        status: i % 3 === 0 ? "verified" : i % 3 === 1 ? "suspended" : "blocked",
    }));

    const columns = [
        {
            header: t("Buyers.Name"),
            field: "name",
            body: (rowData: any) => (
                <span>{rowData.name}</span>
            ),
        },
        {
            header: t("Buyers.Email"),
            field: "email",
        },
        {
            header: t("Buyers.Phone"),
            field: "phone",
        },
        {
            header: t("Buyers.OrdersCount"),
            field: "orders",
        },
        {
            header: t("Buyers.OpenDisputes"),
            field: "disputes",
        },
        {
            header: t("Buyers.Status"),
            field: "status",
            body: (rowData: any) => {
                const isVerified = rowData.status === "verified";
                return (
                    <div className="flex justify-center">
                        <span className={`px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${isVerified ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            }`}>
                            {isVerified && <CheckCircle size={14} />}
                            {isVerified ? t("Common.Verified") : t("Common.Blocked")}
                        </span>
                    </div>
                );
            }
        },
        {
            header: t("Buyers.Actions"),
            body: (rowData: any) => (
                <div className="flex justify-center items-center gap-3 text-gray-400">
                    <button
                        onClick={() => navigate(`/${lang}/admin/users/details/buyer/${rowData.id}`)}
                        className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                    <button className="text-[#F68713] p-1 rounded-md hover:text-white hover:bg-[#F68713] transition-colors"><Pause size={18} /></button>
                    <button className="text-[#D00808] p-1 rounded-md hover:text-white hover:bg-[#D00808] transition-colors"><Ban size={18} /></button>
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
            {/* Header */}
            <Header title={t("Buyers.Title")} description={t("Buyers.Welcome")} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("Buyers.TotalBuyers")}
                    value="1,820 مستخدم"
                    icon={Users}
                    color="bg-[#8B5CF6]"
                />
                <StatsCard
                    title={t("Buyers.ActiveBuyers")}
                    value="1,820 مستخدم"
                    icon={UserCheck}
                    color="bg-[#10B981]"
                />
                <StatsCard
                    title={t("Buyers.SuspendedAccounts")}
                    value="115 حساب"
                    icon={CheckCircle}
                    color="bg-[#64748B4D]"
                />
                <StatsCard
                    title={t("Buyers.TotalSpent")}
                    value="$287,450"
                    icon={DollarSign}
                    color="bg-[#F59E0B]"
                />
            </div>

            {/* Dynamic Table */}
            <DynamicTable
                data={mockBuyers}
                columns={columns}
                searchPlaceholder={t("Buyers.SearchPlaceholder")}
                filterOptions={filterOptions}
            />
        </div>
    );
}
