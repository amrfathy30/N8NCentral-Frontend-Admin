import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../Components/Ui/Header";
import DynamicTable from "../../Components/Ui/DynamicTable";
import ComplaintDetailsDrawer from "./ComplaintDetailsDrawer";

const ComplaintStatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return {
          label: t("Complaints.Status.Open"),
          classes: "bg-[#2B7B4C33] text-[#2B7B4C]",
        };
      default:
        return {
          label: t("Complaints.Status.Closed"),
          classes: "bg-[#64748B33] text-greenDark",
        };
    }
  };

  const { label, classes } = getStatusStyles(status);

  return (
    <div className="flex justify-center">
      <span className={`px-4 py-1.5 rounded-full text-[13px] flex items-center gap-2 font-medium whitespace-nowrap ${classes}`}>
        {label}
      </span>
    </div>
  );
};

export default function Complaints() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const handleViewDetails = (complaint: any) => {
    setSelectedComplaint(complaint);
    setIsDrawerOpen(true);
  };
  const mockComplaints = [
    {
      id: 1,
      service: "خدمة أتمتة الوسائل",
      complaintId: "#CMP-1023",
      type: "بلاغ خدمة",
      complainant: "محمد علي",
      date: "2024-05-01",
      status: "open",
    },
    {
      id: 2,
      service: "خدمة أتمتة الوسائل",
      complaintId: "#CMP-1024",
      type: "بلاغ خدمة",
      complainant: "سارة أحمد",
      date: "2024-05-02",
      status: "closed",
    }
  ];

  const columns = [
    {
      field: "service",
      header: t("Complaints.Table.Service"),
      width: "200px",
    },
    {
      field: "complaintId",
      header: t("Complaints.Table.Id"),
    },
    {
      field: "type",
      header: t("Complaints.Table.Type"),
    },
    {
      field: "complainant",
      header: t("Complaints.Table.Complainant"),
    },
    {
      field: "date",
      header: t("Complaints.Table.Date"),
    },
    {
      field: "status",
      header: t("Complaints.Table.Status"),
      body: (rowData: any) => <ComplaintStatusBadge status={rowData.status} />,
    },
    {
      header: t("Complaints.Table.Actions"),
      body: (rowData: any) => (
        <div className="flex justify-center">
          <button
            onClick={() => handleViewDetails(rowData)}
            className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark transition-colors"
          >
            {t("Common.View")}
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = [
    { label: t("Common.All"), value: "all" },
    { label: t("Complaints.Filters.Open"), value: "open" },
    { label: t("Complaints.Filters.Closed"), value: "closed" },
  ];

  return (
    <div className="space-y-8" dir={dir}>
      <Header 
        title={t("Complaints.Title")} 
        description={t("Complaints.Welcome")} 
      />

      <DynamicTable
        data={mockComplaints}
        columns={columns}
        filterOptions={filterOptions}
        searchPlaceholder={t("Complaints.SearchPlaceholder")}
      />
      <ComplaintDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        data={selectedComplaint} 
      />
    </div>
  );
}