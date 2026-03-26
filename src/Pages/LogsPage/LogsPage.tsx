import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DynamicTable from "../../Components/Ui/DynamicTable"; 
import CustomSelect from "../../Components/Ui/CustomSelect"; 
import Header from "../../Components/Ui/Header"; 
import Button from "../../Components/Ui/Button";
import { CheckCircle } from "lucide-react";
import LogsDetailsDrawer from "./LogsDetailsDrawer";

export default function LogsPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [activeTab, setActiveTab] = useState("activity");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleShowDetails = (rowData: any) => {
    setSelectedLog(rowData);
    setIsDrawerOpen(true); 
  };

  const activityData = [
    { id: 1, date: "2024-06-01 14:22", user: "Admin", action: "تعديل عمولة أفلييت", status: "completed" },
    { id: 2, date: "2024-06-01 14:22", user: "تاجر - أحمد", action: "نشر خدمة جديدة", status: "success" },
  ];

  const financialData = [
    { id: 1, txNumber: "#TX-4455", type: "عمولة منصة", amount: "$300", status: "completed" },
    { id: 2, txNumber: "#TX-4455", type: "طلب سحب", amount: "$300", status: "pending" },
  ];

  const securityData = [
    { id: 1, date: "2024-06-01 13:50", user: "Admin", ip: "192.168.1.1", status: "completed" },
    { id: 2, date: "2024-06-01 13:50", user: "Unknown", ip: "10.22.55.1", status: "failed" },
  ];

const statusBodyTemplate = (rowData: any) => {
  const statusMap: any = {
    success: { 
      bg: "bg-[#2B7B4C]/20", 
      color: "text-greenDark", 
      label: t("Logs.Table.Statuses.Success"),
      icon: CheckCircle,
    },
    completed: { 
      bg: "bg-[#2B7B4C]/20", 
      color: "text-greenDark", 
      label: t("Logs.Table.Statuses.Completed"),
      icon: CheckCircle, 
    },
    pending: { bg: "bg-[#F68713]/20", color: "text-[#F68713]", label: t("Logs.Table.Statuses.Pending") },
    failed: { bg: "bg-[#E7000B]/20", color: "text-[#E7000B]", label: t("Logs.Table.Statuses.Failed") },
  };

  const config = statusMap[rowData.status] || statusMap.pending;

  return (
    <div className="flex justify-center items-center">
        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium ${config.bg} ${config.color}`}>
            {config.label}
            {config.icon && <config.icon className="w-4 h-4" />}
        </span>
    </div>
  );
};

  const actionBodyTemplate = (rowData: any) => (
    <Button onClick={() => handleShowDetails(rowData)} className="!py-1 !px-3 !text-[12px] !font-medium !shadow-none">
      {t("Logs.Table.Details")}
    </Button>
  );

  const columns = useMemo(() => {
    switch (activeTab) {
      case "financial":
        return [
          { field: "txNumber", header: t("Logs.Table.TxNumber") },
          { field: "type", header: t("Logs.Table.Type") },
          { field: "amount", header: t("Logs.Table.Amount") },
          { field: "status", header: t("Logs.Table.Status"), body: statusBodyTemplate },
          { header: t("Logs.Table.Details"), body: actionBodyTemplate },
        ];
      case "security":
        return [
          { field: "date", header: t("Logs.Table.Date") },
          { field: "user", header: t("Logs.Table.User") },
          { field: "ip", header: t("Logs.Table.IP") },
          { field: "status", header: t("Logs.Table.Status"), body: statusBodyTemplate },
          { header: t("Logs.Table.Details"), body: actionBodyTemplate },
        ];
      default:
        return [
          { field: "date", header: t("Logs.Table.Date") },
          { field: "user", header: t("Logs.Table.User") },
          { field: "action", header: t("Logs.Table.Action") },
          { field: "status", header: t("Logs.Table.Status"), body: statusBodyTemplate },
          { header: t("Logs.Table.Details"), body: actionBodyTemplate },
        ];
    }
  }, [activeTab, i18n.language]);

  const data = useMemo(() => {
    if (activeTab === "financial") return financialData;
    if (activeTab === "security") return securityData;
    return activityData;
  }, [activeTab]);

  return (
    <div className="p-6 space-y-8" dir={dir}>
      <div className="flex justify-between items-center">
        <Header 
          title={t("Logs.Title")} 
        />
        <Button className="flex items-center gap-2 !text-[14px] !py-2">
          {t("Logs.ExportCSV")}
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#344054]">{t("Logs.Filters.Type")}</label>
          <CustomSelect options={[{value: 'all', label: t("Logs.Filters.AllTypes")}]} placeholder={t("Logs.Filters.AllTypes")} />
        </div>
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#344054]">{t("Logs.Filters.Users")}</label>
          <CustomSelect options={[{value: 'all', label: t("Logs.Filters.AllUsers")}]} placeholder={t("Logs.Filters.AllUsers")} />
        </div>
        <div className="space-y-2">
          <label className="text-[14px] font-semibold text-[#344054]">{t("Logs.Filters.Search")}</label>
          <input 
            type="text" 
            placeholder={t("Logs.Filters.SearchPlaceholder")} 
            className="w-full h-[44px] bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] px-4 text-sm focus:outline-none focus:ring-2 focus:ring-greenDark/20 transition-all"
          />
        </div>
      </div>

      <div className="flex justify-start items-center gap-4 py-2 overflow-x-auto no-scrollbar">
        {[
          { id: "activity", label: t("Logs.Tabs.Activity") },
          { id: "financial", label: t("Logs.Tabs.Financial") },
          { id: "security", label: t("Logs.Tabs.Security") }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`min-w-[160px] py-3 px-6 rounded-[12px] text-[16px] font-bold transition-all duration-300 shadow-sm border
              ${activeTab === tab.id 
                ? 'bg-gradient-to-b from-[#418D5F] to-[#2B7B4C] text-white border-transparent' 
                : 'bg-white text-[#2B7B4C] border-[#EAECF0] hover:bg-gray-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

        <DynamicTable 
          data={data} 
          columns={columns} 
          showSearch={false} 
        />

      <LogsDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        logData={selectedLog} 
      />
    </div>
  );
}