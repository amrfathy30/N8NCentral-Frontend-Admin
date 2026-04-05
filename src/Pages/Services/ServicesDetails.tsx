import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ChevronLeft,
    ChevronRight,
    Users,
    Clock,
    Pause,
    Ban
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/Ui/Header";
import { DownloadIcon, Flash, Star } from "../../icons";
import { useGetServiceByIdQuery, useApproveServiceMutation, useRejectServiceMutation, useStopServiceMutation, useReactivateServiceMutation } from "../../store/Api/Services/useServicesApi";
import ConfirmModal from "../../Components/Ui/ConfirmModal";
import Modal from "../../Components/Ui/Modal";
import { Input } from "../../Components/Ui/Input";
import { showToastSuccess, showToastError } from "../../Components/Helper/toastHelper";
import { handleApiError } from "../../Components/Helper/handleApiError";
import ServicesDetailsSkeleton from "../../Components/Skeleton/service/ServicesDetailsSkeleton";

export default function ServicesDetails() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dir = i18n.dir();

    const { data: serviceData, isLoading } = useGetServiceByIdQuery({ service: id! }, { skip: !id });
    const service = serviceData?.data;

    const status = service?.status || "";
    const isActive = status === "active";
    const isPending = status === "pending" || status === "pending_kyc" || status === "pending_review";
    const isRejected = status === "rejected" || status === "Rejected";

    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState({ ar: "", en: "" });

    const [approveService, { isLoading: isApproving }] = useApproveServiceMutation();
    const [rejectService, { isLoading: isRejecting }] = useRejectServiceMutation();
    const [stopService, { isLoading: isStopping }] = useStopServiceMutation();
    const [reactivateService, { isLoading: isReactivating }] = useReactivateServiceMutation();


    const currentLang = i18n.language as 'ar' | 'en';

    if (isLoading) {
        return <ServicesDetailsSkeleton />;
    }
    const handleConfirmStop = async () => {
        try {
            const res = await stopService({ service: id! }).unwrap();
            showToastSuccess(res.message || t("Services.StopSuccess"));
            setIsStopModalOpen(false);
        } catch (error) { handleApiError(error); }
    };

    const handleConfirmApprove = async () => {
        try {
            const res = await approveService({ service: id! }).unwrap();
            showToastSuccess(res.message || t("Services.ApproveSuccess"));
            setIsApproveModalOpen(false);
        } catch (error) { handleApiError(error); }
    };

    const handleConfirmReject = async () => {
        if (!rejectReason.ar.trim() || !rejectReason.en.trim()) {
            showToastError(t("Services.ReasonRequired"));
            return;
        }
        try {
            const res = await rejectService({ service: id!, reason: rejectReason }).unwrap();
            showToastSuccess(res.message || t("Services.RejectSuccess"));
            setIsRejectModalOpen(false);
            setRejectReason({ ar: "", en: "" });
        } catch (error) { handleApiError(error); }
    };

    const handleConfirmReactivate = async () => {
        try {
            const res = await reactivateService({ service: id! }).unwrap();
            showToastSuccess(res.message || t("Services.UnBanSuccess"));
            setIsReactivateModalOpen(false);
        } catch (error) { handleApiError(error); }
    };
    return (
        <div className="space-y-8 pb-10 p-" dir={dir}>
            {/* Modals */}
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
            <Modal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                title={t("Services.RejectService")}
            >
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-3">
                        <Input
                            value={rejectReason.ar}
                            onChange={(e) => setRejectReason({ ...rejectReason, ar: e.target.value })}
                            icon={Ban}
                            label={`${t("Services.RejectReason")} (عربي)`}
                            placeholder={t("Services.RejectReasonPlaceholder")}
                        />
                        <Input
                            value={rejectReason.en}
                            onChange={(e) => setRejectReason({ ...rejectReason, en: e.target.value })}
                            icon={Ban}
                            label={`${t("Services.RejectReason")} (English)`}
                            placeholder={t("Services.RejectReasonPlaceholder")}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full mt-2">
                        <button
                            onClick={handleConfirmReject}
                            disabled={!rejectReason.ar.trim() || !rejectReason.en.trim() || isRejecting}
                            className="flex-1 py-2 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] shadow-lg shadow-[#FB2C36]/20 text-white font-bold text-[18px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRejecting ? t("Common.loading") : t("Services.ConfirmReject")}
                        </button>
                        <button
                            onClick={() => { setIsRejectModalOpen(false); setRejectReason({ ar: "", en: "" }); }}
                            className="flex-1 py-2 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] font-bold text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all"
                        >
                            {t("Merchants.Cancel")}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Header */}
            <div className="flex items-center justify-between">
                <Header title={service?.title?.[currentLang] || service?.title} titleClassName="text-[24px] text-greenDark" />
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#505E56] hover:text-greenDark transition-colors font-bold"
                >
                    {t("Common.Back")}
                    {dir === "rtl" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>
            </div>

            {/* Hero Section */}
            <div className="p-4 flex flex-col lg:flex-row gap-10">
                {/* Left Side (Content) */}
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00BC7D1A] text-greenDark text-sm font-medium border border-[#00BC7D33]">
                        <Flash />
                        {service?.category?.name}
                    </div>

                    <h2 className="text-[24px] md:text-[40px] font-medium text-[#0A2F64] leading-tight line-clamp-2">
                        {service?.display_title || service?.title?.ar || service?.title?.en || t("Services.ServiceDetails.FeaturedTitle")}
                    </h2>

                    <p className="text-[#5C5C5C] text-[16px] md:text-[21px] leading-relaxed line-clamp-2">
                        {service?.short_description || service?.short_description?.ar || service?.short_description?.en || t("Services.ServiceDetails.FeaturedDescription")}
                    </p>

                    <div className="flex items-center flex-wrap gap-4 md:gap-16 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Star className="text-greenDark" />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">{service?.rating}</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.Rating")}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Users size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">{service?.sales_count}</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.Buyer")}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Clock size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">{service?.delivery_time}</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.DeliveryTime")}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Image) */}
                <div className="w-full lg:w-[400px] h-full md:h-[400px]">
                    <div className="lg:aspect-square rounded-[20px] overflow-hidden flex items-center justify-center shadow-lg">
                        <img
                            src={service?.image || "/images/services/services-2.jpg"}
                            alt="service"
                            className="w-full h-full drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                {/* Additional Services */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-greenDark">{t("Services.ServiceDetails.AdditionalServices")}</h3>
                    <div className="bg-white md:h-full p-4 rounded-[12px] flex flex-col gap-3">
                        {(service?.extras || []).map((extra: any) => (
                            <div key={extra.id } className="flex items-center justify-between flex-wrap gap-4">
                                <span className="text-greenDark font-bold text-[17px]">{extra.title}</span>
                                <span className="text-greenDark font-semibold text-[17px]">{extra.price}$</span>
                                {/* <span className="text-greenDark font-semibold text-[17px]">{svc.status}</span> */}
                                <div className="flex items-center gap-2 md:gap-0">
                                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Pause size={16} className="fill-[#F68713] text-[#F68713] " />
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Ban size={16} className="text-[#D00808]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools and Integrations */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-greenDark">{t("Services.ServiceDetails.ToolsAndIntegrations")}</h3>
                    <div className="bg-white md:h-full p-4 rounded-[12px] flex flex-wrap gap-3 justify-center items-center">
                        {service?.tools_used?.map((tool: any, idx: number) => (
                        <span key={idx} className="bg-[#DCFCE7] text-[#008236] px-3 py-1 rounded-full text-[16px] font-medium">{tool}</span> 
                        ))}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-greenDark">{t("Services.ServiceDetails.ServiceDescription")}</h3>
                <p className="text-[#364153] leading-loose text-[16px] bg-white rounded-[24px] p-4">
                    {service?.description || service?.description?.ar || service?.description?.en}
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {(service?.steps || []).map((step: any, index: number) => (
                            <div key={step.id} className="bg-[#ECFDF5] p-5 rounded-[10px] flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-greenDark text-white flex items-center justify-center flex-shrink-0 font-bold">
                                    {index + 1}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-greenDark">{step.title}</h4>
                                    <p className="text-[#4A5565] leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Footer Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                        {/* Active: Stop + Reject */}
                        {isActive && (
                            <>
                                <button
                                    onClick={() => setIsStopModalOpen(true)}
                                    className="flex-1 w-full py-3 rounded-full bg-[#F68713] text-white text-lg font-semibold hover:bg-[#d97706] transition-all"
                                >
                                    {t("Services.ServiceDetails.StopService")}
                                </button>
                                <button
                                    onClick={() => setIsRejectModalOpen(true)}
                                    className="flex-1 w-full py-3 rounded-full bg-[#FB2C36] text-white text-lg font-semibold hover:bg-[#d9222b] transition-all"
                                >
                                    {t("Services.Reject")}
                                </button>
                            </>
                        )}

                        {/* Pending: Approve + Reject */}
                        {isPending && (
                            <>
                                <button
                                    onClick={() => setIsApproveModalOpen(true)}
                                    className="flex-1 w-full py-3 rounded-full bg-greenDark text-white text-lg font-semibold hover:bg-greenDark/90 transition-all"
                                >
                                    {t("Services.Approve")}
                                </button>
                                <button
                                    onClick={() => setIsRejectModalOpen(true)}
                                    className="flex-1 w-full py-3 rounded-full bg-[#FB2C36] text-white text-lg font-semibold hover:bg-[#d9222b] transition-all"
                                >
                                    {t("Services.Reject")}
                                </button>
                            </>
                        )}

                        {/* Rejected: Reactivate */}
                        {isRejected && (
                            <button
                                onClick={() => setIsReactivateModalOpen(true)}
                                className="flex-1 w-full py-3 rounded-full bg-[#F68713] text-white text-lg font-semibold hover:bg-[#d97706] transition-all"
                            >
                                {t("Services.Reactivate")}
                            </button>
                        )}
                    </div>
                </div>

                {/* download  */}
                <div className="lg:col-span-1 flex items-center justify-center">
                    <a
                        download
                        className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full bg-greenDark flex flex-col justify-center items-center text-white gap-3 shadow-lg hover:bg-greenDark/90 transition-all duration-300 cursor-pointer"
                    >
                        <span className="text-[18px] font-bold">{t("Services.ServiceDetails.DownloadFile")}</span>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                            <DownloadIcon />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
