import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingBag,
  Link as LinkIcon,
  LayoutDashboard,
  FileText,
  Wallet,
  BarChart2,
  MessageSquare,
  Settings,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  const dir = i18n.dir();
  const [usersOpen, setUsersOpen] = useState(false);

  const menuItems = [
    {
      title: t("Sidebar.Dashboard"),
      icon: Home,
      path: `/${lang}/admin/dashboard`,
    },
    {
      title: t("Sidebar.Users"),
      icon: Users,
      isSubmenu: true,
      isOpen: usersOpen,
      setOpen: setUsersOpen,
      submenu: [
        { title: t("Sidebar.Buyers"), path: `/${lang}/admin/users/buyers` },
        { title: t("Sidebar.Sellers"), path: `/${lang}/admin/users/sellers` },
        { title: t("Sidebar.Affiliate"), path: `/${lang}/admin/users/affiliate` },
        { title: t("Sidebar.Suspended"), path: `/${lang}/admin/users/suspended` },
      ],
    },
    {
      title: t("Sidebar.Merchants"),
      icon: ShoppingBag,
      path: `/${lang}/admin/merchants`,
    },
    {
      title: t("Sidebar.AffiliateProgram"),
      icon: LinkIcon,
      path: `/${lang}/admin/affiliate-program`,
    },
    {
      title: t("Sidebar.Services"),
      icon: LayoutDashboard,
      path: `/${lang}/admin/services`,
    },
    {
      title: t("Sidebar.Orders"),
      icon: FileText,
      path: `/${lang}/admin/orders`,
    },
    {
      title: t("Sidebar.Financial"),
      icon: Wallet,
      path: `/${lang}/admin/financial`,
    },
    {
      title: t("Sidebar.Analytics"),
      icon: BarChart2,
      path: `/${lang}/admin/analytics`,
    },
    {
      title: t("Sidebar.Complaints"),
      icon: MessageSquare,
      path: `/${lang}/admin/complaints`,
    },
    {
      title: t("Sidebar.Settings"),
      icon: Settings,
      path: `/${lang}/admin/settings`,
    },
    {
      title: t("Sidebar.Logs"),
      icon: Clock,
      path: `/${lang}/admin/logs`,
    },
  ];

  return (
    <div
      className="w-full h-full flex flex-col"
      dir={dir}
    >
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-2 py-4 pb-10">
        {menuItems.map((item, index) => {
          if (item.isSubmenu) {
            return (
              <div key={index} className="space-y-1 text-[#D1D5DC] hover:text-white">
                <button
                  onClick={() => item.setOpen(!item.isOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-[#D1D5DC] group-hover:text-white" />
                    <span className="text-[15px] font-medium">{item.title}</span>
                  </div>
                  {item.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {item.isOpen && (
                  <div className="space-y-1 py-1 mr-4 ml-4 p-2 rounded-[9px] bg-[#1D293D]">
                    {item.submenu?.map((sub, idx) => {
                      const isActive = location.pathname === sub.path;
                      return (
                        <Link
                          key={idx}
                          to={sub.path}
                          className={`block p-2 text-[14px] rounded-lg transition-colors ${isActive
                              ? "bg-greenDark text-white"
                              : "text-[#D1D5DC] hover:text-white hover:bg-white/5"
                            }`}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path || "#"}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors group ${isActive
                  ? "bg-greenDark text-white shadow-lg shadow-greenDark/20"
                  : "hover:bg-white/5 text-[#D1D5DC] hover:text-white"
                }`}
            >
              <item.icon size={20} className={isActive ? "text-white" : "text-[#D1D5DC] group-hover:text-white"} />
              <span className="text-[15px] font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
