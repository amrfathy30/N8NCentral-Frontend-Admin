import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
    Users, 
    Clock, XCircle , 
    CheckCircle, 
} from "lucide-react";
import { Cart2, CashBag } from "../../icons";
import StatsCard from "../Dashboard/components/StatsCard";
import DynamicTable from "../../Components/Ui/DynamicTable";
import Header from "../../Components/Ui/Header";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
export default function OrdersPage() {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const OrderStatusBadge = ({ status }: { status: string }) => {
      const { t } = useTranslation();

      const getStatusStyles = (status: string) => {
        switch (status) {
          case "completed":
            return {
              label: t("Orders.Completed"),
              classes: "bg-[#2B7B4C33] text-[#2B7B4C]",
              icon: <CheckCircle className="w-4 h-4" />,
            };
          case "cancelled":
            return {
              label: t("Orders.Cancelled"),
              classes: "bg-[#D0080833] text-[#D00808]",
              icon: <XCircle className="w-4 h-4" />,
            };
          default:
            return {
              label: t("Orders.InExecution"),
              classes: "bg-[#F6871333] text-[#F68713]",
              icon: <Clock className="w-4 h-4" />,
            };
        }
      };

      const { label, classes, icon } = getStatusStyles(status);

      return (
        <div className="flex items-center justify-center">
          <span className={`px-4 py-2 rounded-full text-[13px] flex items-center gap-2 font-medium whitespace-nowrap ${classes}`}>
            <div className="flex-shrink-0">{icon}</div>
            {label}
          </span>
        </div>
      );
    };
    const handleViewDetails = (order: any) => {
      setSelectedOrder(order);
      setIsDrawerOpen(true);
  };

    const mockOrders = [
        { id: 1, service: "خدمة أتمتة الرسائل", merchant: "شركة التقنية", customer: "محمد علي", amount: "$250", deliveryDate: "12/2/2031", status: "in_progress" },
        { id: 2, service: "تصميم واجهة مستخدم", merchant: "مودرن ديزاين", customer: "سارة أحمد", amount: "$500", deliveryDate: "15/3/2031", status: "completed" },
        { id: 3, service: "برمجة بوت تليجرام", merchant: "أكواد مصر", customer: "ياسين حسن", amount: "$150", deliveryDate: "20/2/2031", status: "cancelled" },
        { id: 4, service: "إدارة حملات إعلانية", merchant: "سوشيال ميديا", customer: "ليلى محمود", amount: "$300", deliveryDate: "05/4/2031", status: "in_progress" },
    ];

    const columns = [
        {
            header: t("Orders.Service"),
            field: "service",
            body: (rowData: any) => (
                <span className="text-greenDark font-medium">{rowData.service}</span>
            ),
        },
        { header: t("Orders.Merchant"), field: "merchant" },
        { header: t("Orders.Customer"), field: "customer" },
        { header: t("Orders.Paid"), field: "amount" },
        { header: t("Orders.DeliveryDate"), field: "deliveryDate" },
        {
          header: t("Orders.Status"),
          field: "status",
          body: (rowData: any) => <OrderStatusBadge status={rowData.status} />,
        },
        {
            header: t("Orders.Actions"),
            body: (rowData: any) => (
                <button 
                    onClick={() => handleViewDetails(rowData)}
                    className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark transition-colors"
                >
                    {t("Common.View")}
                </button>
            ),
        },
    ];

    const filterOptions = [
        { label: t("Common.All"), value: "all" },
        { label: t("Orders.InExecution"), value: "in_progress" },
        { label: t("Orders.Completed"), value: "completed" },
        { label: t("Orders.Cancelled"), value: "cancelled" },
    ];

    return (
    <div className="flex flex-col gap-4" dir={dir}>
            <Header 
                title={t("Orders.Title")} 
                description={t("Orders.Welcome")} 
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title={t("Orders.TotalOrders")}
                    value="1,240"
                    icon={Users}
                    color="bg-[#AD46FF]"
                />
                <StatsCard
                    title={t("Orders.InExecution")}
                    value="120"
                    icon={Cart2}
                    color="bg-[#3E8F60]"
                />
                <StatsCard
                    title={t("Orders.Completed")}
                    value="820"
                    icon={CheckCircle}
                    color="bg-greenDark"
                />
                <StatsCard
                    title={t("Orders.Cancelled")}
                    value="80"
                    icon={CashBag}
                    color="bg-[#F0B100]"
                />
            </div>

            {/* Table Section */}
                <DynamicTable
                    data={mockOrders}
                    columns={columns}
                    searchPlaceholder={t("Orders.SearchPlaceholder")}
                    filterOptions={filterOptions}
                />
           {/* Drawer */}
            <OrderDetailsDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)} 
                order={selectedOrder} 
            />
        </div>
    );
}