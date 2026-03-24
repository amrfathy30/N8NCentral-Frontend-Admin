import { useTranslation } from "react-i18next";
import {
  Users,
  ShoppingBag,
  Link as LinkIcon,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import StatsCard from "./components/StatsCard";
import DashboardChart from "./components/DashboardChart";
import Header from "../../Components/Ui/Header";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <div className="space-y-8" dir={dir}>
      {/* Header */}
      <Header title={t("Dashboard.Title")} description={t("Dashboard.Welcome")} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        <StatsCard
          title={t("Dashboard.PlatformRevenue")}
          value="$2,860"
          icon={DollarSign}
          color="bg-[#3E8F60]"
        />
        <StatsCard
          title={t("Dashboard.TotalUsers")}
          value={`1,820 ${t("Sidebar.Users")}`}
          icon={Users}
          color="bg-[#8B5CF6]"
        />
        <StatsCard
          title={t("Sidebar.Affiliate")}
          value={`87 ${t("Sidebar.Affiliate")}`}
          icon={LinkIcon}
          color="bg-[#3B82F6]"
        />
        <StatsCard
          title={t("Sidebar.Sellers")}
          value={`145 ${t("Sidebar.Sellers")}`}
          icon={ShoppingBag}
          color="bg-[#10B981]"
          trend="12%"
        />
        <StatsCard
          title={t("Sidebar.Complaints")}
          value={`4 ${t("Sidebar.Complaints")}`}
          icon={AlertCircle}
          color="bg-[#F59E0B]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
            <DashboardChart title={t("Dashboard.UserGrowth")} />
            <DashboardChart title={t("Dashboard.OrderGrowth")} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-800">{t("Dashboard.ImportantAlerts")}</h4>
            </div>
            <div className="space-y-">
              {[
                "5 طلبات توثيق تجار بانتظار المراجعة",
                "3 خدمات قيد الموافقة",
                "13 طلب سحب يحتاج اعتماد",
                "2 شكاوي جديدة من المستخدمين"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 group cursor-pointer border-b border-[#B5B5B54D] pb-3 last:border-0 last:pb-0">
                  <div className="mt-5 w-1.5 h-1.5 rounded-full bg-main group-hover:scale-150 transition-transform"></div>
                  <p className="text-sm pt-3 text-gray-600 hover:text-main transition-colors">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
            <DashboardChart title={t("Dashboard.ConversionRate")} />
            <DashboardChart title={t("Dashboard.MonthlyRevenue")} />
          </div>
        </div>
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-gray-800">{t("Dashboard.RecentActivity")}</h4>
            </div>
            <div className="space-y-5">
              {[
                { name: "أحمد خالد", action: "تسجيل مستخدم جديد" },
                { name: "نظام CRM", action: "إنشاء طلب جديد: تصميم نظام" },
                { name: "محمد علي", action: "طلب سحب جديد من تاجر" }
              ].map((act, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-gray-800">{act.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{act.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
