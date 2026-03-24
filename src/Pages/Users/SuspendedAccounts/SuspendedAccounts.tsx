import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    CheckCircle,
    Ban,
    Play,
    Eye,
    Clock,
    Gavel,
    CreditCard
} from "lucide-react";
import StatsCard from "../../../Components/Ui/StatsCard";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import AccountDetailsDrawer from "../UserDetails/AccountDetailsDrawer";
import ConfirmModal from "../../../Components/Ui/ConfirmModal";
import Header from "../../../Components/Ui/Header";

export default function SuspendedAccounts() {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [drawerAccount, setDrawerAccount] = useState<any>(null);

    const mockData = [
        {
            id: 1,
            name: "محمد علي",
            type: "affiliate",
            reason: "مرتفع Refund Rate",
            date: "2024-05-12",
            remaining: "12",
            status: "verified",
        },
        {
            id: 2,
            name: "محمد علي",
            type: "seller",
            reason: "نزاعات متكررة",
            date: "2024-05-12",
            remaining: "12",
            status: "verified",
        },
        {
            id: 3,
            name: "محمد علي",
            type: "buyer",
            reason: "نزاع",
            date: "2024-05-12",
            remaining: "12",
            status: "blocked",
        },
        {
            id: 4,
            name: "محمد علي",
            type: "affiliate",
            reason: "مرتفع Refund Rate",
            date: "2024-05-12",
            remaining: "12",
            status: "verified",
        },
        {
            id: 5,
            name: "محمد علي",
            type: "affiliate",
            reason: "مرتفع Refund Rate",
            date: "2024-05-12",
            remaining: "12",
            status: "verified",
        },
        {
            id: 6,
            name: "محمد علي",
            type: "affiliate",
            reason: "مرتفع Refund Rate",
            date: "2024-05-12",
            remaining: "12",
            status: "verified",
        }
    ];

    const handleReactivateClick = (account: any) => {
        setSelectedAccount(account);
        setIsStatusModalOpen(true);
    };

    const handleBanClick = (account: any) => {
        setSelectedAccount(account);
        setIsBanModalOpen(true);
    };

    const handleShowDetails = (account: any) => {
        setDrawerAccount(account);
        setIsDrawerOpen(true);
    };

    const handleConfirmReactivate = () => {
        console.log("Reactivating account:", selectedAccount);
        setIsStatusModalOpen(false);
        setSelectedAccount(null);
    };

    const handleConfirmBan = () => {
        console.log("Banning account permanently:", selectedAccount);
        setIsBanModalOpen(false);
        setSelectedAccount(null);
    };

    const columns = [
        {
            header: t("SuspendedAccounts.Name"),
            field: "name",
            body: (rowData: any) => (
                <span className="text-greenDark font-medium">{rowData.name}</span>
            )
        },
        {
            header: t("SuspendedAccounts.Type"),
            field: "type",
            body: (rowData: any) => {
                const types: any = {
                    buyer: t("SuspendedAccounts.Buyer"),
                    seller: t("SuspendedAccounts.Seller"),
                    affiliate: t("SuspendedAccounts.Affiliate")
                };
                return <span>{types[rowData.type]}</span>;
            }
        },
        {
            header: t("SuspendedAccounts.Reason"),
            field: "reason",
            body: (rowData: any) => (
                <span className="text-gray-500">{rowData.reason}</span>
            )
        },
        {
            header: t("SuspendedAccounts.Date"),
            field: "date",
        },
        {
            header: t("SuspendedAccounts.RemainingTime"),
            field: "remaining",
            body: (rowData: any) => (
                <span>{rowData.remaining} {t("SuspendedAccounts.DaysValue")}</span>
            )
        },
        {
            header: t("SuspendedAccounts.Status"),
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
            header: t("SuspendedAccounts.Actions"),
            body: (rowData: any) => (
                <div className="flex justify-center items-center gap-3 text-gray-400">
                    <button
                        onClick={() => handleShowDetails(rowData)}
                        className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => handleReactivateClick(rowData)}
                        className="text-[#F68713] p-1 rounded-md hover:text-white hover:bg-[#F68713] transition-colors"
                    >
                        <Play size={18} />
                    </button>
                    <button
                        onClick={() => handleBanClick(rowData)}
                        className="text-[#D00808] p-1 rounded-md hover:text-white hover:bg-[#D00808] transition-colors"
                    >
                        <Ban size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const filterOptions = [
        { label: t("Common.All"), value: "all" },
        { label: t("SuspendedAccounts.Buyer"), value: "buyer" },
        { label: t("SuspendedAccounts.Seller"), value: "seller" },
        { label: t("SuspendedAccounts.Affiliate"), value: "affiliate" },
    ];

    return (
        <div className="space-y-8" dir={dir}>
            <ConfirmModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onConfirm={handleConfirmReactivate}
                title={t("SuspendedAccounts.ConfirmReactivateTitle")}
                message={t("SuspendedAccounts.ConfirmReactivateMessage")}
                isDanger={false}
            />

            <ConfirmModal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                onConfirm={handleConfirmBan}
                title={t("SuspendedAccounts.ConfirmBanTitle")}
                message={t("SuspendedAccounts.ConfirmBanMessage")}
                isDanger={true}
            />

            <AccountDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                account={drawerAccount}
            />

            <Header title={t("SuspendedAccounts.Title")} description={t("SuspendedAccounts.Welcome")} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("SuspendedAccounts.TotalSuspended")}
                    value="128"
                    icon={Ban}
                    color="bg-[#8B5CF6]"
                />
                <StatsCard
                    title={t("SuspendedAccounts.FinancialViolations")}
                    value="312"
                    icon={CreditCard}
                    color="bg-[#10B981]"
                />
                <StatsCard
                    title={t("SuspendedAccounts.DueToDisputes")}
                    value="312"
                    icon={Gavel}
                    color="bg-[#F59E0B]"
                />
                <StatsCard
                    title={t("SuspendedAccounts.PendingReview")}
                    value="312"
                    icon={Clock}
                    color="bg-[#64748B4D]"
                />
            </div>

            <DynamicTable
                data={mockData}
                columns={columns}
                searchPlaceholder={t("SuspendedAccounts.SearchPlaceholder")}
                filterOptions={filterOptions}
                filterField="type"
            />
        </div>
    );
}
