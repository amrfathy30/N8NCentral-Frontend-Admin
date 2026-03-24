import { useTranslation } from "react-i18next";
import {
    Eye,
    Pause,
    Ban
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout from "../../../../Components/Ui/UserDetailLayout";
import { useNavigate } from "react-router-dom";
import Overview from "./components/Overview";
import Services from "./components/Services";
import Sales from "./components/Sales";
import Withdrawal from "./components/Withdrawal";
import Verification from "./components/Verification";
import Logs from "./components/Logs";

export default function SellerDetails() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate()
    const lang = i18n.language;

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview") },
        { id: "services", label: t("AccountDetails.Services") },
        { id: "withdrawal", label: t("AccountDetails.WithdrawalRequests") },
        { id: "verification", label: t("AccountDetails.Verification") },
        { id: "logs", label: t("AccountDetails.Logs") },
    ];

    const serviceColumns = [
        {
            field: "name", header: t("AccountDetails.ServiceName") || "الخدمة",
            body: (rowData: any) => (
                <span className="block !w-[250px]">{rowData.name}</span>
            )
        },
        { field: "price", header: t("AccountDetails.Price") || "السعر" },
        { field: "sales", header: t("AccountDetails.SalesCount") || "المبيعات" },
        { field: "createdAt", header: t("AccountDetails.CreateDate") || "المبيعات" },
        {
            field: "status",
            header: t("AccountDetails.Status") || "الحالة",
            body: () => (
                <span>مفعلة</span>
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

    const servicesData = Array.from({ length: 2 }).map((_, i) => ({
        id: i + 1,
        name: "ربط WhatsApp مع Google Sheets",
        price: "$45",
        sales: "24",
        status: "Active",
        createdAt: "2024-05-10"
    }));

    const salesColumns = [
        { field: "id", header: t("AccountDetails.OrderId") || "رقم الطلب" },
        { field: "buyer", header: t("AccountDetails.Buyer") || "المشتري" },
        { field: "amount", header: t("AccountDetails.Amount") || "المبلغ" },
        { field: "date", header: t("AccountDetails.Date") || "التاريخ" },
        { field: "status", header: t("AccountDetails.Status") || "الحالة" },
    ];

    const salesData = Array.from({ length: 10 }).map((_, i) => ({
        id: `#ORD-${1000 + i}`,
        buyer: "محمد أحمد",
        amount: "$50",
        date: "2024-05-10",
        status: "مكتمل"
    }));

    const withdrawalRequests = [
        {
            id: "WD-2145",
            date: "18 يونيو 2024",
            amount: "$1,200",
            method: t("AccountDetails.Withdrawal.BankTransfer"),
            balance: "$1,450",
            status: t("AccountDetails.Withdrawal.PendingReview")
        },
    ];

    const verificationDocuments = [
        {
            id: "id-front",
            title: t("AccountDetails.VerificationSection.IDFront"),
            image: "/images/id-image.png",
        },
        {
            id: "id-back",
            title: t("AccountDetails.VerificationSection.IDBack"),
            image: "/images/id-image.png",
        },
        {
            id: "selfie",
            title: t("AccountDetails.VerificationSection.SelfieWithID"),
            image: "/images/id-image.png",
        }
    ];

    return (
        <UserDetailLayout
            userName="محمد علي"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            tPrefix="AccountDetails"
        >

            {activeTab === "overview" && (
                <Overview t={t} />
            )}

            {activeTab === "services" && (
                <Services servicesData={servicesData} serviceColumns={serviceColumns} />
            )}

            {activeTab === "sales" && (
                <Sales salesData={salesData} salesColumns={salesColumns} />
            )}

            {activeTab === "withdrawal" && (
                <Withdrawal withdrawalRequests={withdrawalRequests} t={t} lang={lang} />
            )}

            {activeTab === "verification" && (
                <Verification verificationDocuments={verificationDocuments} t={t} />
            )}

            {activeTab === "logs" && (
                <Logs t={t} />
            )}

        </UserDetailLayout>
    );
}
