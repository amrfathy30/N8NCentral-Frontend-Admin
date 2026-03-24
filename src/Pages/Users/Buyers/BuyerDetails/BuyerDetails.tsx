import { useTranslation } from "react-i18next";
import {
    User,
    ShoppingBag,
    Clock,
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout from "../../../../Components/Ui/UserDetailLayout";
import Overview from "./components/Overview";
import Orders from "./components/Orders";
import Logs from "./components/Logs";

export default function BuyerDetails() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview"), icon: User },
        { id: "orders", label: t("AccountDetails.Orders"), icon: ShoppingBag },
        { id: "logs", label: t("AccountDetails.Logs"), icon: Clock },
    ];

    const orderColumns = [
        { field: "id", header: t("AccountDetails.OrderId") },
        { field: "service", header: t("AccountDetails.Service") },
        { field: "amount", header: t("AccountDetails.Amount") },
        { field: "date", header: t("AccountDetails.PurchaseDate") },
        {
            field: "status",
            header: t("AccountDetails.Status"),
            body: (rowData: any) => (
                <span>
                    {t(`Common.${rowData.status}`)}
                </span>
            )
        },
    ];

    const ordersData = Array.from({ length: 12 }).map((_, i) => ({
        id: `#${2143 + i}`,
        service: "ربط Google Sheets مع WhatsApp",
        amount: "50$",
        date: "12/2/2025",
        status: "Completed"
    }));

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

            {activeTab === "orders" && (
                <Orders orderColumns={orderColumns} ordersData={ordersData} />
            )}

            {activeTab === "logs" && (
                <Logs t={t} />
            )}

        </UserDetailLayout>
    );
}
