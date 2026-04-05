
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
import { useGetAllServicesDataQuery, useGetServicesStatsDataQuery, useApproveServiceMutation, useRejectServiceMutation, useReactivateServiceMutation, useStopServiceMutation } from "../../store/Api/Services/useServicesApi";
import { useGetAllServicesCategoriesQuery } from "../../store/Api/Services/useServiceCategoriesApi";
import { Search, X } from "lucide-react";
import CustomSelect from "../../Components/Ui/CustomSelect";
import StatsCardSkeleton from "../../Components/Skeleton/StatsCard/StatsCardSkeleton";
import TableSkeleton from "../../Components/Skeleton/Table/TableSkeleton";
import Modal from "../../Components/Ui/Modal";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Components/Ui/Input";
import { showToastError, showToastSuccess } from "../../Components/Helper/toastHelper";
import { handleApiError } from "../../Components/Helper/handleApiError";
import type { ServiceData } from "../../types/services";

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
      case "pending":
      case "pending_kyc":
        return {
          label: t("Common.PendingReview"),
          classes: "bg-[#F6871333] text-[#F68713]",
          icon: <Clock className="w-4 h-4" />,
        };
      case "Rejected":
      case "rejected":
        return {
          label: t("Common.Rejected"),
          classes: "bg-[#D0080833] text-[#D00808]",
          icon: <Megaphone className="w-4 h-4" />,
        };
      case "Inactive":
      case "inactive":
        return {
          label: t("Common.Inactive"),
          classes: "bg-[#64748B33] text-[#64748B]",
          icon: <PauseCircle className="w-4 h-4" />,
        };
      case "draft":
        return {
          label: t("Common.Draft"),
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
  handleApproveClick,
  handleRejectClick,
  handleReactivateClick,
  activeFilter,
}: {
  rowData: any;
  handleViewClick: (data: any) => void;
  handleStopClick: (data: any) => void;
  handleApproveClick: (data: any) => void;
  handleRejectClick: (data: any) => void;
  handleReactivateClick: (data: any) => void;
  activeFilter: string;
  navigate: (path: string) => void;
}) => {
  const { t } = useTranslation();
  const isActive = rowData.status === "active";
  const isPending = rowData.status === "pending_kyc" || rowData.status === "pending_review" || rowData.status === "pending";
  const isRejected = rowData.status === "Rejected" || rowData.status === "rejected";
  const showAll = isActive || isPending || isRejected;

  return (
    <div className="flex justify-center items-center gap-3 text-gray-400">
      <button
        onClick={() => {
          // if (isPending) {
          //   navigate(`/${lang}/admin/services-details/${rowData.id}`);
          // } else {
          handleViewClick(rowData);
          // }
        }}
        className="bg-greenDark text-white py-2 px-5 rounded-[10px] hover:text-white hover:bg-greenDark transition-colors"
      >
        {t("Common.ViewDetails")}
      </button>

      {showAll && !isPending && !isRejected && (
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
            onClick={() => handleRejectClick(rowData)}
            disabled={!isActive}
            className={`bg-[#D00808] text-white py-2 px-5 rounded-[10px] transition-all ${!isActive ? "opacity-30 cursor-not-allowed" : "hover:text-white hover:bg-[#D00808]"
              }`}
          >
            {t("Services.Reject") || "رفض"}
          </button>
        </>
      )}

      {(activeFilter === "pending_kyc" || isPending) && (
        <>
          <button
            onClick={() => handleApproveClick(rowData)}
            className="bg-[#2B7B4C] text-white py-2 px-5 rounded-[10px] transition-all hover:bg-[#23663f]"
          >
            {t("Services.Approve") || "موافقة"}
          </button>
          <button
            onClick={() => handleRejectClick(rowData)}
            className="bg-[#FB2C36] text-white py-2 px-5 rounded-[10px] transition-all hover:bg-[#d9222b]"
          >
            {t("Services.Reject") || "رفض"}
          </button>
        </>
      )}

      {(activeFilter === "rejected" || isRejected) && (
        <button
          onClick={() => handleReactivateClick(rowData)}
          className="bg-[#F68713] text-white py-2 px-5 rounded-[10px] transition-all hover:bg-[#d97706]"
        >
          {t("Services.Reactivate") || "إعادة تفعيل"}
        </button>
      )}
    </div>
  );
};

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState({ ar: "", en: "" });
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);
  const [isServiceDetailsDrawerOpen, setIsServiceDetailsDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("active");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [approveService, { isLoading: isApproving }] = useApproveServiceMutation();


  const [ReactivateService, { isLoading: isReactivating }] = useReactivateServiceMutation();
  const [stopService, { isLoading: isStopping }] = useStopServiceMutation();

  const filterStatusMapping: any = {
    active: "active",
    PendingReview: "pending",
    Rejected: "rejected",
  };

  const { data: statsData, isLoading: isStatsLoading } = useGetServicesStatsDataQuery();
  const [rejectService, { isLoading: isRejecting }] = useRejectServiceMutation();

  const { data: categoriesData } = useGetAllServicesCategoriesQuery({ per_page: 100 });

  const { data: servicesData, isLoading: isServicesLoading, isFetching: isServicesFetching } = useGetAllServicesDataQuery({
    status: filterStatusMapping[activeFilter] || "",
    categoryId: selectedCategory?.value || "",
    search: searchQuery,
    page: 1,
    per_page: 20
  } as any);

  const categoryOptions = [
    { label: t("Services.AllCategories") || "All Categories", value: "" },
    ...(categoriesData?.data?.categories || []).map((cat: any) => ({
      label: cat.name_display || (typeof cat.name === 'string' ? cat.name : (cat.name?.[i18n.language] || cat.name?.ar || cat.name?.en)),
      value: cat.id
    }))
  ];

  const handleSearch = () => {
    if (!search.trim()) {
      setSearchQuery("");
      return;
    }
    setSearchQuery(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  const stats = [
    {
      title: t("Services.TotalServices"),
      value: statsData?.data?.total_services || "0",
      icon: Users,
      color: "bg-[#AD46FF]",
    },
    {
      title: t("Services.ServicesUnderReview"),
      value: statsData?.data?.pending_services || "0",
      icon: Cart2,
      color: "bg-[#3E8F60]",
    },
    {
      title: t("Services.FeaturedServices") || "Draft Services",
      value: statsData?.data?.draft_services || "0",
      icon: CheckCircle,
      color: "bg-greenDark",
    },
    {
      title: t("Services.RejectedServices"),
      value: statsData?.data?.rejected_services || "0",
      icon: CashBag,
      color: "bg-[#F0B100]",
    },
  ];

  const handleStopClick = (service: any) => {
    setSelectedService(service);
    setIsStopModalOpen(true);
  };

  const handleConfirmStop = async () => {
    if (!selectedService) return;
    try {
      const res = await stopService({ service: selectedService.id }).unwrap();
      showToastSuccess(res.message || t("Services.StopSuccess") || "تم إيقاف الخدمة بنجاح");
      setIsStopModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      handleApiError(error)
    }
  };

  const handleApproveClick = (service: any) => {
    setSelectedService(service);
    setIsApproveModalOpen(true);
  };

  const handleRejectClick = (service: any) => {
    setSelectedService(service);
    setRejectReason({ ar: "", en: "" });
    setIsRejectModalOpen(true);
  };

  const handleReactivateClick = (service: any) => {
    setSelectedService(service);
    setIsReactivateModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!selectedService) return;
    try {
      const res = await approveService({ service: selectedService.id }).unwrap();
      showToastSuccess(res.message || t("Services.ApproveSuccess") || "تمت الموافقة على الخدمة بنجاح");
      setIsApproveModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      handleApiError(error)
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedService) return;
    if (!rejectReason.ar.trim() || !rejectReason.en.trim()) {
      showToastError(t("Services.ReasonRequired") || "يرجى إدخال سبب الرفض باللغتين");
      return;
    }
    try {
      const res = await rejectService({ service: selectedService.id, reason: rejectReason }).unwrap();
      showToastSuccess(res.message || t("Services.RejectSuccess"));
      setIsRejectModalOpen(false);
      setSelectedService(null);
      setRejectReason({ ar: "", en: "" });
    } catch (error) {
      handleApiError(error)
    }
  };

  const handleConfirmReactivate = async () => {
    if (!selectedService) return;
    try {
      const res = await ReactivateService({ service: selectedService.id }).unwrap();
      showToastSuccess(res.message || t("Services.ReactivateSuccess") || "تم إعادة تفعيل الخدمة بنجاح");
      setIsReactivateModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      handleApiError(error)
    }
  };

  const handleViewClick = (service: any) => {
    setSelectedService(service);
    setIsServiceDetailsDrawerOpen(true);
  };

  const columns = [
    {
      field: "title",
      header: t("Services.Table.Service"),
      width: "160px",
      body: (rowData: any) => {
        const title = rowData.display_title || (typeof rowData.title === 'string' ? rowData.title : (rowData.title?.[i18n.language] || rowData.title?.ar || rowData.title?.en));
        return <span>{title || "----"}</span>
      }
    },
    {
      field: "price",
      header: t("Services.Table.Price"),
      body: (rowData: any) => <span>${rowData.price}</span>
    },
    {
      field: "sales_count",
      header: t("Services.Table.Orders"),
    },
    {
      field: "category",
      header: t("Services.Table.Category"),
      body: (rowData: any) => {
        const catName = rowData.category?.display_name || (typeof rowData.category?.name === 'string' ? rowData.category?.name : (rowData.category?.name?.[i18n.language] || rowData.category?.name?.ar || rowData.category?.name?.en));
        return <span>{catName || "----"}</span>
      }
    },
    {
      field: "rating",
      header: t("Services.Table.Rating"),
      body: (rowData: ServiceData) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="text-[#FACC15] fill-[#FACC15]" />
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
          handleApproveClick={handleApproveClick}
          handleRejectClick={handleRejectClick}
          handleReactivateClick={handleReactivateClick}
          activeFilter={activeFilter}
          navigate={navigate}
        />
      ),
      width: "250px",
    },
  ];

  const filterOptions = [
    { label: t("Services.Active"), value: "active" },
    { label: t("Services.PendingReview"), value: "PendingReview" },
    { label: t("Services.Rejected"), value: "Rejected" },
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
        loading={isStopping}
      />

      <ConfirmModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={handleConfirmApprove}
        title={t("Services.ConfirmApproveTitle")}
        message={t("Services.ConfirmApproveMessage")}
        loading={isApproving}
      />

      <ConfirmModal
        isOpen={isReactivateModalOpen}
        onClose={() => setIsReactivateModalOpen(false)}
        onConfirm={handleConfirmReactivate}
        title={t("Services.ConfirmReactivateTitle")}
        message={t("Services.ConfirmReactivateMessage")}
        loading={isReactivating}
      />
      {/* RejectService */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={t("Services.RejectService") || "رفض الخدمة"}
      >
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-3">
            <Input
              value={rejectReason.ar}
              onChange={(e) => setRejectReason({ ...rejectReason, ar: e.target.value })}
              icon={Ban}
              label={`${t("Services.RejectReason") || "سبب الرفض"} (عربي)`}
              placeholder={t("Services.RejectReasonPlaceholder") || "اكتب سبب الرفض هنا..."}
            />
            <Input
              value={rejectReason.en}
              onChange={(e) => setRejectReason({ ...rejectReason, en: e.target.value })}
              icon={Ban}
              label={`${t("Services.RejectReason") || "Reject Reason"} (English)`}
              placeholder={t("Services.RejectReasonPlaceholder") || "Enter reject reason here..."}
            />
          </div>
          <div className="flex items-center gap-4 w-full mt-2">
            <button
              onClick={handleConfirmReject}
              disabled={!rejectReason.ar.trim() || !rejectReason.en.trim() || isRejecting}
              className="flex-1 py-2 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] shadow-lg shadow-[#FB2C36]/20 text-white font-bold text-[18px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRejecting ? t("Common.loading") || "..." : t("Services.ConfirmReject")}
            </button>
            <button
              onClick={() => {
                setIsRejectModalOpen(false);
                setRejectReason({ ar: "", en: "" });
              }}
              className="flex-1 py-2 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] font-bold text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all"
            >
              {t("Merchants.Cancel")}
            </button>
          </div>
        </div>
      </Modal>

      <CategoriesDrawer
        isOpen={isCategoriesDrawerOpen}
        onClose={() => setIsCategoriesDrawerOpen(false)}
        onSelectCategory={(category) => {
          setSelectedCategory({
            label: category.name_display || (typeof category.name === 'string' ? category.name : (category.name?.[i18n.language] || category.name?.ar || category.name?.en)),
            value: category.id
          });
        }}
      />

      <ServiceDetailsDrawer
        isOpen={isServiceDetailsDrawerOpen}
        onClose={() => setIsServiceDetailsDrawerOpen(false)}
        id={selectedService?.id}
        activeFilter={activeFilter}
        onStop={handleStopClick}
        onApprove={handleApproveClick}
        onReject={handleRejectClick}
        onReactivate={handleReactivateClick}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Header title={t("Services.Title")} description={t("Services.Welcome")} />
        </div>
        <Button onClick={() => setIsCategoriesDrawerOpen(true)}>
          {t("Services.ViewCategories")}
        </Button>
      </div>

      {isStatsLoading ? (
        <StatsCardSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search Bar - Replicated from Sellers */}
        <div className="p-4 flex items-center gap-2 justify-between">
          <div className="relative flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);
                  if (!val.trim()) setSearchQuery("");
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={t("Services.SearchPlaceholder") || t("Common.Search")}
                className="w-full border border-gray-200 bg-[#F9FAFB] rounded-lg pr-10 pl-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-greenDark/20 transition-all"
              />
              {search && (
                <button
                  onClick={handleClearSearch}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${dir === 'rtl' ? 'left-4' : 'right-4'}`}
                >
                  <X size={16} />
                </button>
              )}
              <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} size={18} />
            </div>
            <button
              onClick={handleSearch}
              className="bg-greenDark text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-greenDark/90 transition-colors"
            >
              {t("Common.Search") || "Search"}
            </button>
          </div>

          <div className="flex bg-[#F9FAFB] p-1 rounded-lg border border-gray-100 w-fit overflow-x-auto scrollbar-hide gap-2">
            <CustomSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={(option) => setSelectedCategory(option)}
              placeholder={t("Services.SelectCategory") || "Select Category"}
              className="!w-48 !min-w-[190px]"
            />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeFilter === option.value ? "bg-greenDark text-white shadow-md" : "text-[#98A2B3]"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="dynamic-table-wrapper overflow-x-auto">
          <style>{`
              .dynamic-table-wrapper thead th { 
                  background-color: #2B7B4C !important;
                  color: white !important;
                  padding-top: 1rem;
                  padding-bottom: 1rem;
              }
              .dynamic-table-wrapper table { border-radius: 0 !important; }
          `}</style>
          {isServicesLoading || isServicesFetching ? (
            <TableSkeleton columns={columns.length} />
          ) : (
            <DynamicTable
              data={servicesData?.data?.services || []}
              columns={columns}
              showSearch={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
