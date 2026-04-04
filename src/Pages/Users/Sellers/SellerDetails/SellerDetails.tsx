import { useTranslation } from "react-i18next";
import {
    Eye,
    Pause,
    Ban
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout from "../../../../Components/Ui/UserDetailLayout";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "./components/Overview";
import Services from "./components/Services";
import Withdrawal from "./components/Withdrawal";
import Verification from "./components/Verification";
import Logs from "./components/Logs";
import { useGetSellerDetailsByIdQuery } from "../../../../store/Api/users/Sellers/useSellersApi";

export default function SellerDetails() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();
    const lang = i18n.language;

    const { id: sellerId } = useParams();

    const { data: sellerData, isLoading: isLoadingSellerData } = useGetSellerDetailsByIdQuery(
        { seller_id: sellerId! },
        { skip: !sellerId }
    );

    const overview = sellerData?.data?.overview;
    const services = sellerData?.data?.services?.data ?? [];
    const withdrawalRequests = sellerData?.data?.withdrawal_requests?.data ?? [];
    const verificationDocuments = sellerData?.data?.verification_documents ?? [];
    const activityLog = sellerData?.data?.activity_log?.data ?? [];

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview") },
        { id: "services", label: t("AccountDetails.Services") },
        { id: "withdrawal", label: t("AccountDetails.WithdrawalRequests") },
        { id: "verification", label: t("AccountDetails.Verification") },
        { id: "logs", label: t("AccountDetails.Logs") },
    ];

    const serviceColumns = [
        {
            field: "name",
            header: t("AccountDetails.ServiceName") || "الخدمة",
            body: (rowData: any) => (
                <span className="block !w-[250px]">{rowData.name || rowData.title}</span>
            )
        },
        { field: "price", header: t("AccountDetails.Price") || "السعر" },
        { field: "sales_count", header: t("AccountDetails.SalesCount") || "المبيعات" },
        {
            field: "created_at",
            header: t("AccountDetails.CreateDate") || "التاريخ",
            body: (rowData: any) => (
                <span>
                    {rowData.created_at.split("T")[0]}
                </span>
            )
        },
        {
            field: "status",
            header: t("AccountDetails.Status") || "الحالة",
            body: (rowData: any) => (
                <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${rowData.status === 'active' ? 'bg-green-100 text-greenDark' : rowData.status === 'draft' ? 'bg-yellow-100 text-yellow-600' : rowData.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {t(`Merchants.${rowData.status}`)}
                </span>
            )
        },
        {
            header: t("Affiliates.Actions"),
            body: (rowData: any) => (
                <div className="flex justify-center items-center gap-3 text-gray-400">
                    <button
                        onClick={() => navigate(`/${lang}/admin/services/details/${rowData.id}`)}
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

    if (isLoadingSellerData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-greenDark border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <UserDetailLayout
            userName={overview?.full_name ?? "—"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            tPrefix="AccountDetails"
        >

            {activeTab === "overview" && (
                <Overview t={t} sellerData={sellerData} />
            )}

            {activeTab === "services" && (
                <Services servicesData={services} serviceColumns={serviceColumns} />
            )}

            {activeTab === "withdrawal" && (
                <Withdrawal withdrawalRequests={withdrawalRequests} t={t} lang={lang} />
            )}

            {activeTab === "verification" && (
                <Verification verificationDocuments={verificationDocuments} t={t} sellerId={sellerId!} />
            )}

            {activeTab === "logs" && (
                <Logs t={t} activityLog={activityLog} />
            )}

        </UserDetailLayout>
    );
}
