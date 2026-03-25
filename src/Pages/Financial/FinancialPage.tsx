
import { useTranslation } from "react-i18next";
import Header from "../../Components/Ui/Header";
import { FinancialSidebar } from "./components/FinancialSidebar/FinancialSidebar";
import { RevenuePerformanceChart, UsedFinancial } from "./components/FinancialCharts";
import Button from "../../Components/Ui/Button";
import WithdrawalRequests from "./components/WithdrawalRequests";
import Stats from "./components/Stats";

interface WithdrawalRequest {
  id: string;
  name: string;
  amount: string;
  type: string;
  userId: string;
  status: string;
}

export default function FinancialPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

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
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },
    { id: "WD-9012", status: "Approved", name: "محمد علي", userId: "AFF-1021", type: "Merchant", amount: "350$" },
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },
    { id: "WD-9012", status: "PendingReview", name: "محمد علي", userId: "AFF-1021", type: "Affiliate", amount: "350$" },

  ];

  const UsedFinancialData = [
    { name: t("Charts.Days.Sat"), visa: 4000, stripe: 2400, digitalCurrencies: 2400 },
    { name: t("Charts.Days.Sun"), visa: 3000, stripe: 1398, digitalCurrencies: 2210 },
    { name: t("Charts.Days.Mon"), visa: 2000, stripe: 9800, digitalCurrencies: 2290 },
    { name: t("Charts.Days.Tue"), visa: 2780, stripe: 3908, digitalCurrencies: 2000 },
    { name: t("Charts.Days.Wed"), visa: 1890, stripe: 4800, digitalCurrencies: 2181 },
    { name: t("Charts.Days.Thu"), visa: 2390, stripe: 3800, digitalCurrencies: 2500 },
    { name: t("Charts.Days.Fri"), visa: 3490, stripe: 4300, digitalCurrencies: 2100 },
  ];

  const RevenuePerformanceChartData = [
    { name: t("Charts.Days.Sat"), merchant: 4000, platform: 2400, affiliates: 2400 },
    { name: t("Charts.Days.Sun"), merchant: 3000, platform: 1398, affiliates: 2210 },
    { name: t("Charts.Days.Mon"), merchant: 2000, platform: 9800, affiliates: 2290 },
    { name: t("Charts.Days.Tue"), merchant: 2780, platform: 3908, affiliates: 2000 },
    { name: t("Charts.Days.Wed"), merchant: 1890, platform: 4800, affiliates: 2181 },
    { name: t("Charts.Days.Thu"), merchant: 2390, platform: 3800, affiliates: 2500 },
    { name: t("Charts.Days.Fri"), merchant: 3490, platform: 4300, affiliates: 2100 },
  ];

  const transactions = [
    {
      id: 1,
      amount: "+$260",
      code: "#ORD-45552",
      type: "OrderPayment",
      txId: "TX-78911",
      time: "11:25 م",
      date: t("Dashboard.Today"),
      description: "خدمة أتمتة رسائل واتساب",
      status: "positive"
    },
    {
      id: 2,
      amount: "+$26",
      code: "#ORD-45553",
      type: "PlatformCommission",
      txId: "TX-78912",
      time: "11:20 م",
      date: t("Dashboard.Today"),
      description: "10% من إجمالي الطلب",
      status: "positive"
    },
    {
      id: 3,
      amount: "+$15",
      code: "#AFF-521",
      type: "AffiliateCommission",
      txId: "TX-78913",
      time: "11:05 م",
      date: t("Dashboard.Today"),
      description: "عمولة %2",
      status: "positive"
    },
    {
      id: 4,
      amount: "$120",
      code: "#ORD-43102",
      type: "Refund",
      txId: "TX-78914",
      time: "10:10 م",
      date: "أمس",
      description: "سار الملف قبل التنفيذ",
      status: "negative"
    },
    {
      id: 5,
      amount: "$540",
      code: "#WDR-5014",
      type: "Withdrawal",
      txId: "TX-78915",
      time: "12:00 م",
      date: "أمس",
      description: "أفلييت",
      status: "negative"
    },
    {
      id: 6,
      amount: "+$90",
      code: "#ORD-44501",
      type: "OrderPayment",
      txId: "TX-78916",
      time: "10:15 م",
      date: "أمس",
      description: "خدمة تحرير PDF تلقائي",
      status: "positive"
    }
  ];

  return (
    <div className="space-y-8 pb-10" dir={dir}>
      <div className="flex items-center justify-between">
        <Header title={t("Financial.Title")} description={t("Financial.Welcome")} />
        <Button className="px-8 py-2">
          {t("Financial.CSVExport")}
        </Button>
      </div>

      {/* Stats */}
      <Stats stats={stats} />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          <RevenuePerformanceChart RevenuePerformanceChartData={RevenuePerformanceChartData} />
          <UsedFinancial UsedFinancialData={UsedFinancialData} />
          <WithdrawalRequests withdrawalRequests={withdrawalRequests} />
        </div>

        {/* Left Column */}
        <div className="lg:col-span-2">
          <FinancialSidebar transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
