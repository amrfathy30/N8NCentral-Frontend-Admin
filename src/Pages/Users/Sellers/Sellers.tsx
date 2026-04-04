import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Ban,
    Eye,
    Clock,
    Play,
    Search,
    X
} from "lucide-react";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import Header from "../../../Components/Ui/Header";
import { useApproveSellerMutation, useBanSellerMutation, useGetAllSellerDataQuery, useGetSellerStatsDataQuery, useRejectSellerMutation, useStopSellerMutation, useUnBanSellerMutation } from "../../../store/Api/users/Sellers/useSellersApi";
import { useState } from "react";
import StatsCardSkeleton from "../../../Components/Skeleton/StatsCard/StatsCardSkeleton";
import SellerStats from "../../Merchants/components/SellerStats";
import TableSkeleton from "../../../Components/Skeleton/Table/TableSkeleton";
import ConfirmModal from "../../../Components/Ui/ConfirmModal";
import BanModal from "../../../Components/Ui/BanModal";
import { showToastSuccess } from "../../../Components/Helper/toastHelper";
import { handleApiError } from "../../../Components/Helper/handleApiError";

export default function Sellers() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();
    const lang = i18n.language;

    const [activeFilter, setActiveFilter] = useState("active");
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isUnBanModalOpen, setIsUnBanModalOpen] = useState(false);
    const [selectedSellerId, setSelectedSellerId] = useState<string | number | null>(null);
    const [banReason, setBanReason] = useState("");


    const { data: statsData, isLoading: isStatsLoading } = useGetSellerStatsDataQuery();
    const { data: sellersData, isLoading: isSellersLoading, isFetching: isSellersFetching } = useGetAllSellerDataQuery({
        status: activeFilter,
        search: searchQuery,
        page: 1,
        per_page: 15
    });

    const [banSeller, { isLoading: isBanning }] = useBanSellerMutation();
    const [unBanSeller, { isLoading: isUnBanning }] = useUnBanSellerMutation();
    const [approveSeller, { isLoading: isApproving }] = useApproveSellerMutation();
    const [rejectSeller, { isLoading: isRejecting }] = useRejectSellerMutation();
    const [stopSeller, { isLoading: isStopping }] = useStopSellerMutation();

    const handleConfirmStop = async () => {
        if (!selectedSellerId) return;

        try {
            const res = await stopSeller({ id: selectedSellerId }).unwrap();
            setIsStopModalOpen(false);
            setSelectedSellerId(null);
            showToastSuccess(res.message || t("Merchants.StopSuccess"));

        } catch (error) {
            console.error(error);
            handleApiError(error)
        }
    };

    const handleConfirmReject = async () => {
        if (!selectedSellerId) return;

        try {
            const res = await rejectSeller({ id: selectedSellerId }).unwrap();
            setIsRejectModalOpen(false);
            setSelectedSellerId(null);
            showToastSuccess(res.message || t("Merchants.RejectSuccess"));
        } catch (error) {
            console.error(error);
            handleApiError(error)
        }
    };

    const handleConfirmApprove = async () => {
        if (!selectedSellerId) return;

        try {
            const res = await approveSeller({ id: selectedSellerId }).unwrap();
            setIsApproveModalOpen(false);
            setSelectedSellerId(null);
            showToastSuccess(res.message || t("Merchants.ApproveSuccess"));
        } catch (error) {
            console.error(error);
            handleApiError(error)
        }
    };

    const handleConfirmBan = async () => {
        if (!selectedSellerId || !banReason.trim()) return;

        try {
            const res = await banSeller({ id: selectedSellerId, reason: banReason.trim() }).unwrap();
            setIsBanModalOpen(false);
            setSelectedSellerId(null);
            setBanReason("");
            showToastSuccess(res.message || t("Merchants.BanSuccess"));
        } catch (error) {
            console.error(error);
            handleApiError(error)
        }
    };

    const handleConfirmUnBan = async () => {
        if (!selectedSellerId) return;

        try {
            const res = await unBanSeller({ sellerId: selectedSellerId }).unwrap();
            setIsUnBanModalOpen(false);
            setSelectedSellerId(null);
            showToastSuccess(res.message || t("Merchants.UnBanSuccess"));
        } catch (error) {
            console.error(error);
            handleApiError(error)
        }
    };

    const themeColors: any = {
        active: { bg: "#2B7B4C", text: "#2B7B4C" },
        pending_kyc: { bg: "#F68713", text: "#F68713" },
        banned: { bg: "#E7000B", text: "#E7000B" },
    };

    const getColumns = () => {
        const baseColumns = [
            {
                header: t("Merchants.Expert"),
                body: (row: any) => (
                    <div className="flex items-center justify-start gap-2">
                        {row.avatar &&
                            <img
                                src={row.avatar || "/default.png"}
                                onError={(e => {
                                    e.currentTarget.src = "/default.png"
                                })}
                                alt={row.name}
                                className="w-8 h-8 rounded-full object-cover border" />
                        }
                        <span className="line-clamp-2" title={row.name}>{row.name || "__"}</span>
                    </div>
                )
            }
        ];

        if (activeFilter === "active") {
            return [
                ...baseColumns,
                { header: t("Merchants.ServicesCount"), field: "services_count" },
                { header: t("Merchants.TotalSales"), field: "total_sales", width: "140px" },
                {
                    header: t("Merchants.Country"),
                    field: "country",
                    body: (row: any) => (
                        <div className="flex justify-center">
                            {row.country || "__"}
                        </div>
                    ),
                },
                { header: t("Merchants.Disputes"), field: "disputes_count" },
                {
                    header: t("Merchants.Status"),
                    body: (row: any) => (
                        <div className="flex justify-center">
                            <span className="bg-[#2B7B4C]/20 text-greenDark px-3 py-1 rounded-full text-[11px] flex items-center gap-1 w-fit">
                                {t(`Merchants.${row.seller_status}`)}<CheckCircle size={12} strokeWidth={3} />
                            </span>
                        </div>
                    ),
                },
                {
                    header: t("Merchants.created_at"),
                    body: (row: any) => (
                        <div className="flex justify-center">
                            {row.created_at.split("T")[0] || "__"}
                        </div>
                    ),
                },
                {
                    header: t("Merchants.Actions"),
                    body: (row: any) => (
                        <div className="flex gap-2 items-center justify-center">
                            <button onClick={() => {
                                navigate(`/${lang}/admin/users/details/seller/${row.id}`)
                            }}
                                className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                            >
                                <Eye size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedSellerId(row.id);
                                    setIsBanModalOpen(true);
                                }}
                                className="text-[#D00808] p-1 rounded-md hover:text-white hover:bg-[#D00808] transition-colors"                            >
                                <Ban size={18} />
                            </button>
                        </div>
                    ),
                },
            ];
        } else if (activeFilter === "pending_kyc") {
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
                    body: (row: any) => (
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => {
                                navigate(`/${lang}/admin/users/details/seller/${row.id}`)
                            }}
                                className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                            >
                                <Eye size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedSellerId(row.id);
                                    setIsApproveModalOpen(true);
                                }}
                                className="bg-[#F68713] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">
                                {t("Merchants.VerifyAction")}
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedSellerId(row.id);
                                    setIsRejectModalOpen(true);
                                }}
                                className="bg-[#E7000B] text-white px-6 py-3 rounded-lg text-xs font-bold hover:opacity-90">
                                {t("Merchants.Reject")}
                            </button>
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
                        const isVerified = row.status === "active";

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
                                            <span>{t("Merchants.Banned")}</span>
                                        </>
                                    )}
                                </span>
                            </div>
                        );
                    }
                },
                {
                    header: t("Merchants.Actions"),
                    body: (row: any) => (
                        <div className="flex gap-4 items-center justify-center">
                            <button onClick={() => {
                                navigate(`/${lang}/admin/users/details/seller/${row.id}`)
                            }}
                                className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                            >
                                <Eye size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedSellerId(row.id);
                                    setIsUnBanModalOpen(true);
                                }}
                                className="text-[#F68713] cursor-pointer hover:text-orange-600 transition-colors"
                                title={t("Merchants.Unban")}
                            >
                                <Play size={24} fill="currentColor" />
                            </button>

                        </div>
                    ),
                },
            ];
        }
    };

    const handleSearch = () => {
        if (!search.trim()) {
            setSearchQuery("");
            return;
        }

        setSearchQuery(search);
    };

    const handleClearSearch = () => {
        setSearch("");
        setSearchQuery("");
    };

    return (
        <div className="flex flex-col gap-4" dir={dir}>
            {/* Header */}

            <Header title={t("Sellers.Title")} description={t("Sellers.Welcome")} />

            {/* Stats Cards */}
            {isStatsLoading ? (
                <StatsCardSkeleton />
            ) : (
                <SellerStats t={t} statsData={statsData} />
            )}


            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="p-4 flex items-center gap-2 justify-between">
                    <div className="relative flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearch(val);
                                    if (!val.trim()) setSearchQuery("");
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder={t("Merchants.SearchPlaceholder")}
                                className="w-full border border-gray-200 bg-[#F9FAFB] rounded-lg pr-10 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-greenDark/20 transition-all"
                            />
                            {search && (
                                <button
                                    onClick={handleClearSearch}
                                    className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${dir === 'rtl' ? 'left-4' : 'right-4'}`}
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} size={18} />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-greenDark text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-greenDark/90 transition-colors"
                        >
                            {t("Merchants.SearchButton") || "Search"}
                        </button>
                    </div>
                    <div className="flex bg-[#F9FAFB] p-1 rounded-lg border border-gray-100 w-fit">
                        <button
                            onClick={() => setActiveFilter("active")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "active" ? "bg-greenDark text-white shadow-md" : "text-[#98A2B3]"}`}
                        >
                            {t("Merchants.Active")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("pending_kyc")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "pending_kyc" ? "bg-[#F68713] text-white shadow-md" : "text-[#98A2B3]"}`}
                        >
                            {t("Merchants.WaitingVerification")}
                        </button>
                        <button
                            onClick={() => setActiveFilter("banned")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeFilter === "banned" ? "bg-[#E7000B] text-white shadow-md" : "text-[#98A2B3]"}`}
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
                    {isSellersLoading || isSellersFetching ? (
                        <div style={{ "--header-bg": themeColors[activeFilter].bg } as any}>
                            <TableSkeleton columns={getColumns().length} />
                            <style>{`
                                            .bg-custom { background-color: var(--header-bg) !important; }
                                        `}</style>
                        </div>
                    ) : (
                        <DynamicTable
                            data={sellersData?.data?.sellers?.filter((seller: any) => {
                                if (activeFilter === "active") return seller.account_status !== "banned";
                                if (activeFilter === "pending_kyc") return seller.status === "pending" || seller.status === "pending_kyc";
                                if (activeFilter === "banned") return seller.account_status === "banned";
                                return true;
                            }) || []}
                            columns={getColumns()}
                            showSearch={false}
                        />
                    )}
                </div>
            </div>

            {/* Approve Modal */}
            <ConfirmModal
                isOpen={isApproveModalOpen}
                onClose={() => {
                    setIsApproveModalOpen(false);
                    setSelectedSellerId(null);
                }}
                onConfirm={handleConfirmApprove}
                title={t("Merchants.ConfirmApproveTitle")}
                message={t("Merchants.ConfirmApproveMessage")}
                loading={isApproving}
            />

            {/* Stop Modal */}
            <ConfirmModal
                isOpen={isStopModalOpen}
                onClose={() => {
                    setIsStopModalOpen(false);
                    setSelectedSellerId(null);
                }}
                onConfirm={handleConfirmStop}
                title={t("Merchants.ConfirmStopTitle")}
                message={t("Merchants.ConfirmStopMessage")}
                isStop={true}
                loading={isStopping}
            />

            {/* reject Modal */}
            <ConfirmModal
                isOpen={isRejectModalOpen}
                onClose={() => {
                    setIsRejectModalOpen(false);
                    setSelectedSellerId(null);
                }}
                onConfirm={handleConfirmReject}
                title={t("Merchants.ConfirmRejectTitle")}
                message={t("Merchants.ConfirmRejectMessage")}
                isDanger={true}
                loading={isRejecting}
            />

            {/* UnBan Modal */}
            <ConfirmModal
                isOpen={isUnBanModalOpen}
                onClose={() => {
                    setIsUnBanModalOpen(false);
                    setSelectedSellerId(null);
                }}
                onConfirm={handleConfirmUnBan}
                title={t("Merchants.ConfirmUnBanTitle")}
                message={t("Merchants.ConfirmUnBanMessage")}
                isDanger={true}
                loading={isUnBanning}
            />

            {/* Ban Modal */}
            <BanModal
                isBanModalOpen={isBanModalOpen}
                setIsBanModalOpen={setIsBanModalOpen}
                banReason={banReason}
                setBanReason={setBanReason}
                handleConfirmBan={handleConfirmBan}
                isBanning={isBanning}
            />
        </div>
    );
}
