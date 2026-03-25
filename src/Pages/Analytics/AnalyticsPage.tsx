
import { useTranslation } from "react-i18next";
import Header from "../../Components/Ui/Header";
import { SalesAreaChart, UserBarChart, ConversionDonutChart } from "./components/AnalyticsCharts";
import { TopServicesTable, TopAffiliatesTable } from "./components/PerformanceTables";

export default function AnalyticsPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const TotalSales = [
    {
      id: 1,
      title: t("Analytics.TotalSales"),
      value: "$128,450"
    },
    {
      id: 2,
      title: t("Analytics.WeeklyGrowth"),
      value: "+14%"
    },
    {
      id: 3,
      title: t("Analytics.ConversionRate"),
      value: "7.5%"
    },
    {
      id: 4,
      title: t("Analytics.ExpectedSales"),
      value: "$12,345"
    }
  ]

  return (
    <div className="space-y-8 pb-10" dir={dir}>
      {/* Header */}
      <Header title={t("Analytics.Title")} description={t("Analytics.Subtitle")} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TotalSales.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-[12px] shadow-md h-full flex flex-col justify-between gap-3">
            <h2 className="font-bold text-[14px] text-[#777777]">
              {item.title}
            </h2>
            <p className="font-bold text-[24px] text-[#0B1633]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 gap-6">
        <SalesAreaChart />
      </div>

      {/* Secondary Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <UserBarChart />
        <ConversionDonutChart />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <TopServicesTable />
        <TopAffiliatesTable />
      </div>
    </div>
  );
}
