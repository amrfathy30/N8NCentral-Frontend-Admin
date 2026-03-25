
import { useTranslation } from "react-i18next";
import Header from "../../Components/Ui/Header";
import DynamicTable from "../../Components/Ui/DynamicTable";
import { FinancialSidebar } from "./components/FinancialSidebar/FinancialSidebar";
import { RevenuePerformanceChart, UsedFinancial } from "./components/FinancialCharts";
import { useState } from "react";
import Button from "../../Components/Ui/Button";

interface WithdrawalRequest {
  id: string;
  city: string;
  amount: string;
  type: string;
}

export default function FinancialPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const [activeFilter, setActiveFilter] = useState("all");

  const stats = [
    {
      title: t("Financial.TotalRevenue"),
      value: "$548,000",
      lastMonth: "+12.5%",
    },
    {
      title: t("Financial.Withdrawals"),
      value: "$102,300",
      netCommission: "$102,300"
    },
    {
      title: t("Financial.GrowthRate"),
      value: "$19,780",
      includesPendingAndCompletedProjects: "2"
    },
    {
      title: t("Financial.ExpectedRevenue"),
      value: "$18,750",
      refundRate: "3.1%",
    },
    {
      title: t("Financial.WithdrawalRequestsOpen"),
      value: "$18,750",
      underReview: "3"
    }
  ];

  const withdrawalRequests: WithdrawalRequest[] = [
    {
      id: "3954845",
      city: "محمد علي",
      amount: "$1,200",
      type: "أفلييت",
    },
    {
      id: "4325672",
      city: "أحمد حسن",
      amount: "$850",
      type: "تاجر",
    },
    {
      id: "4325673",
      city: "ياسين علي",
      amount: "$2,400",
      type: "تاجر",
    },
    {
      id: "4325674",
      city: "سارة محمود",
      amount: "$1,500",
      type: "تاجر",
    },
    {
      id: "4325675",
      city: "خالد محمد",
      amount: "$3,200",
      type: "أفلييت",
    }
  ];

  const ActionButtons = () => (
    <div className="flex justify-center items-center gap-2">
      <button className="bg-greenDark text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
        {t("Common.View")}
      </button>
      <button className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
        {t("Common.Adoption")}
      </button>
      <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
        {t("Common.Reject")}
      </button>
    </div>
  );

  const columns = [
    { field: "id", header: t("Financial.Table.ID"), width: "100px" },
    { field: "city", header: t("Financial.Table.City") },
    { field: "type", header: t("Financial.Table.Type") },
    { field: "amount", header: t("Financial.Table.Amount") },
    {
      header: t("Financial.Table.Actions"),
      body: () => <ActionButtons />,
      // width: "350px"
    }
  ];

  const filterOptions = [
    { label: t("Financial.AllRequests"), value: "all" },
  ];

  return (
    <div className="space-y-8 pb-10" dir={dir}>
      <div className="flex items-center justify-between">
        <Header title={t("Financial.Title")} description={t("Financial.Welcome")} />
        <Button className="px-8 py-2">
          {t("Financial.CSVExport")}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[16px] shadow-md h-full flex flex-col justify-between">
            <h2 className="text-[#6B7280] text-[14px] mb-2">{stat?.title}</h2>
            <p className="text-[#101828] text-[20px] font-extrabold mb-2">{stat?.value}</p>
            {stat?.netCommission &&
              <p className="text-[#4B5563] text-[12px] font-bold">{t("Financial.NetCommission")}</p>
            }
            {stat?.includesPendingAndCompletedProjects &&
              <p className="text-[#4B5563] text-[12px] font-bold">{t("Financial.IncludesPendingAndCompletedProjects")}</p>
            }
            {stat?.lastMonth &&
              <div className="text-greenDark font-bold bg-[#EFF6FF] p-2 rounded-full w-fit text-[12px] flex gap-1">
                <span>
                  {stat?.lastMonth}
                </span>
                <span>
                  {t("Financial.LastMonth")}
                </span>
              </div>
            }
            {stat?.refundRate &&
              <div className="text-[#B91C1C] font-bold bg-[#EFF6FF] p-2 rounded-full w-fit text-[12px] flex gap-1">
                <span>
                  {stat?.refundRate}
                </span>
                <span>
                  {t("Financial.RefundRate")}
                </span>
              </div>
            }
            {stat?.underReview &&
              <div className="text-[#A16207] font-bold bg-[#FEFCE8] p-2 rounded-full w-fit text-[12px] flex gap-1">
                <span>
                  {t("Financial.underReview")}
                </span>
                <span>
                  {stat?.underReview}
                </span>
              </div>
            }
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Right Column (Charts & Table) - Using 3/4 based on layout */}
        <div className="lg:col-span-4 space-y-8">
          <RevenuePerformanceChart />
          <UsedFinancial />

          <div className="custom-card">
            <div className="flex flex-col items-start mb-6">
              <h4 className="font-bold text-gray-800">
                {t("Financial.WithdrawalRequests")}
              </h4>
              <p className="text-[#6B7280] text-sm">
                مراجعة/اعتماد/رفض/تحويل
              </p>
            </div>
            <DynamicTable
              data={withdrawalRequests}
              columns={columns}
              filterOptions={filterOptions}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchPlaceholder={t("Financial.SearchPlaceholder")}
            />
          </div>
        </div>

        {/* Left Column (Sidebar) - Using 1/4 */}
        <div className="lg:col-span-2">
          <FinancialSidebar />
        </div>
      </div>
    </div>
  );
}
