import { useTranslation } from "react-i18next";
import { useState } from "react";
import UserDetailLayout from "../../../../Components/Ui/UserDetailLayout";
import AddedServices from "./components/AddedServices";
import Commissions from "./components/Commissions";
import Withdrawal from "./components/Withdrawal";
import Verification from "./components/Verification";
import Logs from "./components/Logs";
import Overview from "./components/Overview";

export default function AffiliateDetails() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview") },
        { id: "addedServices", label: t("AccountDetails.AddedServices.Title") },
        { id: "commissions", label: t("AccountDetails.Commissions") },
        { id: "withdrawal", label: t("AccountDetails.WithdrawalRequests") },
        { id: "verification", label: t("AccountDetails.Verification") },
        { id: "logs", label: t("AccountDetails.Logs") },
    ];

    const addedServicesData = [
        {
            id: 1,
            title: "أتمتة إرسال الرسائل التسويقية",
            status: "active",
            conversionRate: "9.1%",
            commissionRate: "22%",
            sales: "112",
            totalCommissions: "$544",
            expectedCommission: "-$44"
        },
        {
            id: 2,
            title: "أتمتة إرسال الرسائل التسويقية",
            status: "active",
            conversionRate: "9.1%",
            commissionRate: "22%",
            sales: "112",
            totalCommissions: "$544",
            expectedCommission: "-$44"
        }
    ];

    const commissionsColumns = [
        { field: "id", header: t("AccountDetails.OrderId") || "رقم الطلب" },
        { field: "service", header: t("AccountDetails.Service") || "المبلغ" },
        { field: "sellingValue", header: t("AccountDetails.SellingValue") || "المبلغ" },
        { field: "commission", header: t("AccountDetails.Commission") || "العمولة" },
        {
            field: "status", header: t("AccountDetails.Status") || "مفعل",
            body: (rowData: any) => (
                <div className="bg-[#F6871333] text-[#F68713] p-1 rounded-full">
                    {rowData.status}
                </div>
            )
        },
    ];

    const commissionsData = Array.from({ length: 8 }).map((_, i) => ({
        id: `#ORD-${5000 + i}`,
        service: "أتمتة إرسال الرسائل التسويقية",
        sellingValue: "$120",
        commission: "$18",
        status: "مفعل"
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
            userName=" محمد علي"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            tPrefix="AccountDetails"
        >
            {activeTab === "overview" && (
                <Overview t={t} />
            )}

            {activeTab === "addedServices" && (
                <AddedServices addedServicesData={addedServicesData} t={t} />
            )}

            {activeTab === "commissions" && (
                <Commissions commissionsColumns={commissionsColumns} t={t} commissionsData={commissionsData} />
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
