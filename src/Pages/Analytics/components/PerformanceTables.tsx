
import { useTranslation } from "react-i18next";
import DynamicTable from "../../../Components/Ui/DynamicTable";
import { Star } from "../../../icons";

export const TopServicesTable = () => {
    const { t } = useTranslation();

    const columns = [
        { field: "name", header: t("Analytics.Service") },
        { field: "orders", header: t("Analytics.OrdersCount") },
        { field: "revenue", header: t("Analytics.Revenue") },
        {
            field: "rating", header: t("Analytics.Rating"), body: (rowData: any) => {
                const score = parseFloat(rowData.rating);
                const isLow = score < 4.5;
                return (
                    <div className={`flex items-center gap-2 justify-center px-3 py-2 rounded-full text-xs font-medium w-fit mx-auto ${isLow ? "bg-[#FFF8E1] text-[#FF9800]" : "bg-[#E8F5E9] text-greenDark"
                        }`}>
                        <Star className="w-3 h-3" style={isLow ? { color: "#FF9800" } : {}} />
                        <span>
                            {rowData.rating}
                        </span>
                    </div>
                );
            }
        },
    ];

    const data = [
        { id: 1, name: t("Charts.Months.Jan") === "Jan" ? "WhatsApp Automation" : "أتمتة واتساب", orders: 154, revenue: "$2,400", rating: "4.8" },
        { id: 2, name: t("Charts.Months.Jan") === "Jan" ? "n8n Integration" : "ربط n8n", orders: 92, revenue: "$1,850", rating: "4.3" },
        { id: 3, name: t("Charts.Months.Jan") === "Jan" ? "Google Sheets" : "Google Sheets", orders: 75, revenue: "$1,200", rating: "4.9" },
    ];


    return (

        <div className="space-y-4 custom-card">
            <h4 className="font-bold text-gray-800 text-lg">{t("Analytics.TopServices")}</h4>
            <DynamicTable
                data={data}
                columns={columns}
                showSearch={false}
            />
        </div>
    );
};

export const TopAffiliatesTable = () => {
    const { t } = useTranslation();

    const columns = [
        { field: "name", header: t("Analytics.AffiliateName") },
        { field: "orders", header: t("Analytics.ReferralsCount") },
        { field: "conversionRate", header: t("Analytics.ConversionRate") },
        { field: "commission", header: t("Analytics.Commission") },
        {
            field: "status", header: t("Analytics.Status"), body: (rowData: any) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${rowData.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                    {rowData.status === "Active" ? t("Common.Active") : t("Common.week")}
                </span>
            )
        },
    ];

    const data = [
        { id: 1, name: t("Charts.Months.Jan") === "Jan" ? "Mohamed Ali" : "محمد علي", orders: 245, commission: "$4,800", conversionRate: "8.5%", status: "Active" },
        { id: 2, name: t("Charts.Months.Jan") === "Jan" ? "Ahmed Sayed" : "أحمد سيد", orders: 184, commission: "$3,250", conversionRate: "6.2%", status: "Active" },
        { id: 3, name: t("Charts.Months.Jan") === "Jan" ? "Sara Mohamed" : "سارة محمد", orders: 95, commission: "$1,500", conversionRate: "3.1%", status: "week" },
    ];

    return (
        <div className="space-y-4 custom-card">
            <h4 className="font-bold text-gray-800 text-lg">{t("Analytics.TopAffiliates")}</h4>
            <DynamicTable
                data={data}
                columns={columns}
                showSearch={false}
            />
        </div>
    );
};

