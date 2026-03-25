
import { useTranslation } from "react-i18next";
import Button from "../../Components/Ui/Button";
import StatsCard from "../../Components/Ui/StatsCard";
import DynamicTable from "../../Components/Ui/DynamicTable";
import {
  Users,
  Megaphone,
  PauseCircle,
  Ban,
  CheckCircle,
  Clock
} from "lucide-react";
import Header from "../../Components/Ui/Header";
import { Cart2, CashBag, Star } from "../../icons";
import { useState } from "react";
import ConfirmModal from "../../Components/Ui/ConfirmModal";
import CategoriesDrawer from "./CategoriesDrawer";
import ServiceDetailsDrawer from "./ServiceDetailsDrawer";
import { useNavigate } from "react-router-dom";

interface ServiceData {
  id: number;
  service: string;
  merchant: string;
  price: string;
  orders: number;
  category: string;
  rating: number;
  status: string;
  image?: string;
}

const mockServices: ServiceData[] = [
  {
    id: 1,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    image: "/images/services/services-2.jpg",
    status: "active",
  },
  {
    id: 2,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    image: "/images/services/services-2.jpg",
    status: "Inactive",
  },
  {
    id: 3,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    image: "/images/services/services-2.jpg",
    status: "active",
  },
  {
    id: 4,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    image: "/images/services/services-2.jpg",
    status: "active",
  },
  {
    id: 5,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    image: "/images/services/services-2.jpg",
    status: "PendingReview",
  },
  {
    id: 6,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    status: "Rejected",
  },
  {
    id: 7,
    service: "خدمة أتمتة الوسائل",
    merchant: "شركة التقنية",
    price: "$250",
    orders: 120,
    category: "التسويق",
    rating: 4.8,
    status: "Blocked",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: t("Common.Active"),
          classes: "bg-[#2B7B4C33] text-greenDark",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "PendingReview":
        return {
          label: t("Common.PendingReview"),
          classes: "bg-[#F6871333] text-[#F68713]",
          icon: <Clock className="w-4 h-4" />,
        };
      case "Rejected":
        return {
          label: t("Common.Rejected"),
          classes: "bg-[#D0080833] text-[#D00808]",
          icon: <Megaphone className="w-4 h-4" />,
        };
      case "Blocked":
        return {
          label: t("Common.Blocked"),
          classes: "bg-[#D0080833] text-[#E7000B]",
          icon: <Ban className="w-4 h-4" />,
        };
      case "Inactive":
        return {
          label: t("Common.Inactive"),
          classes: "bg-[#64748B33] text-[#64748B]",
          icon: <PauseCircle className="w-4 h-4" />,
        };
      default:
        return {
          label: status,
          classes: "bg-gray-100 text-gray-700",
          icon: <PauseCircle className="w-4 h-4" />,
        };
    }
  };

  const { label, classes, icon } = getStatusStyles(status);

  return (
    <div className="flex items-center justify-center">
      <span className={`px-4 py-2 rounded-full text-[14px] flex items-center gap-2 whitespace-nowrap ${classes}`}>
        <div className="flex-shrink-0">{icon}</div>
        {label}
      </span>
    </div>
  );
};

const ActionButtons = ({
  rowData,
  handleViewClick,
  handleStopClick,
  handleBanClick,
  activeFilter,
  navigate,
}: {
  rowData: any;
  handleViewClick: (data: any) => void;
  handleStopClick: (data: any) => void;
  handleBanClick: (data: any) => void;
  activeFilter: string;
  navigate: (path: string) => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isActive = rowData.status === "active";
  const isPending = rowData.status === "PendingReview";
  const showAll = activeFilter === "all" || isActive;

  return (
    <div className="flex justify-center items-center gap-3 text-gray-400">
      <button
        onClick={() => {
          if (isPending) {
            navigate(`/${lang}/admin/services-details/${rowData.id}`);
          } else {
            handleViewClick(rowData);
          }
        }}
        className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark transition-colors"
      >
        {t("Common.View") || "عرض"}
      </button>

      {showAll && (
        <>
          <button
            onClick={() => handleStopClick(rowData)}
            disabled={!isActive}
            className={`bg-[#F68713] text-white py-2 px-5 rounded-[10px] transition-all ${!isActive ? "opacity-30 cursor-not-allowed" : "hover:text-white hover:bg-[#F68713]"
              }`}
          >
            {t("Common.Stop") || "إيقاف"}
          </button>
          <button
            onClick={() => handleBanClick(rowData)}
            disabled={!isActive}
            className={`bg-[#D00808] text-white py-2 px-5 rounded-[10px] transition-all ${!isActive ? "opacity-30 cursor-not-allowed" : "hover:text-white hover:bg-[#D00808]"
              }`}
          >
            {t("Common.Ban") || "حظر"}
          </button>
        </>
      )}
    </div>
  );
};

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);
  const [isServiceDetailsDrawerOpen, setIsServiceDetailsDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAffiliate, setSelectedAffiliate] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);

  const stats = [
    {
      title: t("Services.TotalServices"),
      value: "1,240",
      icon: Users,
      color: "bg-[#AD46FF]",
    },
    {
      title: t("Services.ServicesUnderReview"),
      value: "120",
      icon: Cart2,
      color: "bg-[#3E8F60]",
    },
    {
      title: t("Services.FeaturedServices"),
      value: "80",
      icon: CheckCircle,
      color: "bg-greenDark",
    },
    {
      title: t("Services.RejectedServices"),
      value: "30",
      icon: CashBag,
      color: "bg-[#F0B100]",
    },
  ];

  const handleStopClick = (affiliate: any) => {
    setSelectedAffiliate(affiliate);
    setIsStopModalOpen(true);
  };

  const handleBanClick = (affiliate: any) => {
    setSelectedAffiliate(affiliate);
    setIsBanModalOpen(true);
  };

  const handleConfirmStop = () => {
    console.log("Stopping affiliate:", selectedAffiliate);
    setIsStopModalOpen(false);
    setSelectedAffiliate(null);
  };

  const handleConfirmBan = () => {
    console.log("Banning affiliate permanently:", selectedAffiliate);
    setIsBanModalOpen(false);
    setSelectedAffiliate(null);
  };

  const handleViewClick = (service: any) => {
    setSelectedService(service);
    setIsServiceDetailsDrawerOpen(true);
  };

  const columns = [
    {
      field: "service",
      header: t("Services.Table.Service"),
      width: "160px",
    },
    {
      field: "merchant",
      header: t("Services.Table.Merchant"),
    },
    {
      field: "price",
      header: t("Services.Table.Price"),
    },
    {
      field: "orders",
      header: t("Services.Table.Orders"),
    },
    {
      field: "category",
      header: t("Services.Table.Category"),
    },
    {
      field: "rating",
      header: t("Services.Table.Rating"),
      body: (rowData: ServiceData) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="text-[#FACC15] fill-[#FACC15]"/>
          <span className="text-gray-600 font-bold">{rowData.rating}</span>
        </div>
      ),
    },
    {
      field: "status",
      header: t("Services.Table.Status"),
      body: (rowData: ServiceData) => <StatusBadge status={rowData.status} />,
    },
    {
      header: t("Services.Table.Actions"),
      body: (rowData: any) => (
        <ActionButtons
          rowData={rowData}
          handleViewClick={handleViewClick}
          handleStopClick={handleStopClick}
          handleBanClick={handleBanClick}
          activeFilter={activeFilter}
          navigate={navigate}
        />
      ),
      // width: "300px",
    },
  ];

  const filterOptions = [
    { label: t("Common.All"), value: "all" },
    { label: t("Services.Active"), value: "active" },
    { label: t("Services.PendingReview"), value: "PendingReview" },
    { label: t("Services.Rejected"), value: "Rejected" },
    { label: t("Services.Blocked"), value: "Blocked" },
  ];

  return (
    <div className="flex flex-col gap-4" dir={dir}>

      <ConfirmModal
        isOpen={isStopModalOpen}
        onClose={() => setIsStopModalOpen(false)}
        onConfirm={handleConfirmStop}
        title={t("Common.ConfirmStopTitle")}
        message={t("Services.ConfirmStopMessage")}
        isStop={true}
      />

      <ConfirmModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        onConfirm={handleConfirmBan}
        title={t("Affiliates.ConfirmBanTitle")}
        message={t("Affiliates.ConfirmBanMessage")}
        isDanger={true}
      />

      <CategoriesDrawer
        isOpen={isCategoriesDrawerOpen}
        onClose={() => setIsCategoriesDrawerOpen(false)}
      />

      <ServiceDetailsDrawer
        isOpen={isServiceDetailsDrawerOpen}
        onClose={() => setIsServiceDetailsDrawerOpen(false)}
        service={selectedService}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Header title={t("Services.Title")} description={t("Services.Welcome")} />
        </div>
        <Button onClick={() => setIsCategoriesDrawerOpen(true)}>
          {t("Services.ViewCategories")}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

          <DynamicTable
            data={mockServices}
            columns={columns}
            filterOptions={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchPlaceholder={t("Services.SearchPlaceholder")}
          />
    </div>
  );
}
