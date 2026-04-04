import { useTranslation } from "react-i18next";
import {
    Eye,
    Pause,
    Ban,
    Play,
    CheckCircle
} from "lucide-react";
import { useState } from "react";
import UserDetailLayout from "../../../../Components/Ui/UserDetailLayout";
import { useNavigate, useParams } from "react-router-dom";
import Overview from "./components/Overview";
import Services from "./components/Services";
import Withdrawal from "./components/Withdrawal";
import Verification from "./components/Verification";
import Logs from "./components/Logs";
import { useGetSellerDetailsByIdQuery } from "../../../../store/Api/users/Sellers/useSellersApi";
import { 
    useApproveServiceMutation, 
    useRejectServiceMutation, 
    useReactivateServiceMutation, 
    useStopServiceMutation 
} from "../../../../store/Api/Services/useServicesApi";
import { showToastError, showToastSuccess } from "../../../../Components/Helper/toastHelper";
import { handleApiError } from "../../../../Components/Helper/handleApiError";
import Modal from "../../../../Components/Ui/Modal";
import ConfirmModal from "../../../../Components/Ui/ConfirmModal";
import { Input } from "../../../../Components/Ui/Input";

export default function SellerDetails() {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();
    const lang = i18n.language;

    const { id: sellerId } = useParams();

    const { data: sellerData, isLoading: isLoadingSellerData, refetch } = useGetSellerDetailsByIdQuery(
        { seller_id: sellerId! },
        { skip: !sellerId }
    );

    const overview = sellerData?.data?.overview;
    const services = sellerData?.data?.services?.data ?? [];
    const withdrawalRequests = sellerData?.data?.withdrawal_requests?.data ?? [];
    const verificationDocuments = sellerData?.data?.verification_documents ?? [];
    const activityLog = sellerData?.data?.activity_log?.data ?? [];

    const [isServiceStopModalOpen, setIsServiceStopModalOpen] = useState(false);
    const [isServiceApproveModalOpen, setIsServiceApproveModalOpen] = useState(false);
    const [isServiceRejectModalOpen, setIsServiceRejectModalOpen] = useState(false);
    const [isServiceReactivateModalOpen, setIsServiceReactivateModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [rejectReason, setRejectReason] = useState({ ar: "", en: "" });

    const [approveService, { isLoading: isApprovingService }] = useApproveServiceMutation();
    const [rejectService, { isLoading: isRejectingService }] = useRejectServiceMutation();
    const [reactivateService, { isLoading: isReactivatingService }] = useReactivateServiceMutation();
    const [stopService, { isLoading: isStoppingService }] = useStopServiceMutation();

    const handleConfirmStopService = async () => {
        if (!selectedService) return;
        try {
            const res = await stopService({ service: selectedService.id }).unwrap();
            showToastSuccess(res.message || t("Services.StopSuccess") || "تم إيقاف الخدمة بنجاح");
            setIsServiceStopModalOpen(false);
            setSelectedService(null);
            refetch();
        } catch (error) {
            handleApiError(error)
        }
    };

    const handleConfirmApproveService = async () => {
        if (!selectedService) return;
        try {
            const res = await approveService({ service: selectedService.id }).unwrap();
            showToastSuccess(res.message || t("Services.ApproveSuccess") || "تمت الموافقة على الخدمة بنجاح");
            setIsServiceApproveModalOpen(false);
            setSelectedService(null);
            refetch();
        } catch (error) {
            handleApiError(error)
        }
    };

    const handleConfirmRejectService = async () => {
        if (!selectedService) return;
        if (!rejectReason.ar.trim() || !rejectReason.en.trim()) {
            showToastError(t("Services.ReasonRequired") || "يرجى إدخال سبب الرفض باللغتين");
            return;
        }
        try {
            const res = await rejectService({ service: selectedService.id, reason: rejectReason }).unwrap();
            showToastSuccess(res.message || t("Services.RejectSuccess") || "تم رفض الخدمة بنجاح");
            setIsServiceRejectModalOpen(false);
            setSelectedService(null);
            setRejectReason({ ar: "", en: "" });
            refetch();
        } catch (error) {
            handleApiError(error)
        }
    };

    const handleConfirmReactivateService = async () => {
        if (!selectedService) return;
        try {
            const res = await reactivateService({ service: selectedService.id }).unwrap();
            showToastSuccess(res.message || t("Services.ReactivateSuccess") || "تم إعادة تفعيل الخدمة بنجاح");
            setIsServiceReactivateModalOpen(false);
            setSelectedService(null);
            refetch();
        } catch (error) {
            handleApiError(error)
        }
    };

    const tabs = [
        { id: "overview", label: t("AccountDetails.Overview") },
        { id: "services", label: t("AccountDetails.Services") },
        { id: "withdrawal", label: t("AccountDetails.WithdrawalRequests") },
        { id: "verification", label: t("AccountDetails.Verification") },
        { id: "logs", label: t("AccountDetails.Logs") },
    ];

    const serviceColumns = [
        {
            field: "name",
            header: t("AccountDetails.ServiceName") || "الخدمة",
            body: (rowData: any) => (
                <span className="block !w-[250px]">{rowData.name || rowData.title}</span>
            )
        },
        { field: "price", header: t("AccountDetails.Price") || "السعر" },
        { field: "sales_count", header: t("AccountDetails.SalesCount") || "المبيعات" },
        {
            field: "created_at",
            header: t("AccountDetails.CreateDate") || "التاريخ",
            body: (rowData: any) => (
                <span>
                    {rowData.created_at.split("T")[0]}
                </span>
            )
        },
        {
            field: "status",
            header: t("AccountDetails.Status") || "الحالة",
            body: (rowData: any) => (
                <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${rowData.status === 'active' ? 'bg-green-100 text-greenDark' : rowData.status === 'draft' ? 'bg-yellow-100 text-yellow-600' : rowData.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {t(`Merchants.${rowData.status}`)}
                </span>
            )
        },
        {
            header: t("Affiliates.Actions"),
            body: (rowData: any) => {
                const isActive = rowData.status === 'active';
                const isPending = rowData.status === 'pending' || rowData.status === 'pending_review' || rowData.status === 'pending_kyc';
                const isRejected = rowData.status === 'rejected';
                const isStopped = rowData.status === 'stopped' || rowData.status === 'inactive';

                return (
                    <div className="flex justify-center items-center gap-3 text-gray-400">
                        <button
                            onClick={() => navigate(`/${lang}/admin/services-details/${rowData.id}`)}
                            className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                        >
                            <Eye size={18} />
                        </button>

                        {isActive && (
                            <button
                                onClick={() => {
                                    setSelectedService(rowData);
                                    setIsServiceStopModalOpen(true);
                                }}
                                className="text-[#F68713] p-1 rounded-md hover:text-white hover:bg-[#F68713] transition-colors"
                            >
                                <Pause size={18} />
                            </button>
                        )}

                        {(isStopped || isRejected) && (
                            <button
                                onClick={() => {
                                    setSelectedService(rowData);
                                    setIsServiceReactivateModalOpen(true);
                                }}
                                className="text-[#F68713] p-1 rounded-md hover:text-white hover:bg-[#F68713] transition-colors"
                            >
                                <Play size={18} />
                            </button>
                        )}

                        {isPending && (
                            <button
                                onClick={() => {
                                    setSelectedService(rowData);
                                    setIsServiceApproveModalOpen(true);
                                }}
                                className="text-greenDark p-1 rounded-md hover:text-white hover:bg-greenDark transition-colors"
                            >
                                <CheckCircle size={18} />
                            </button>
                        )}

                        {!isRejected && (
                            <button
                                onClick={() => {
                                    setSelectedService(rowData);
                                    setIsServiceRejectModalOpen(true);
                                }}
                                className="text-[#D00808] p-1 rounded-md hover:text-white hover:bg-[#D00808] transition-colors"
                            >
                                <Ban size={18} />
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];

    if (isLoadingSellerData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-greenDark border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <UserDetailLayout
            userName={overview?.full_name ?? "—"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            tPrefix="AccountDetails"
            userStatus={overview?.status}
        >

            {activeTab === "overview" && (
                <Overview t={t} sellerData={sellerData} />
            )}

            {activeTab === "services" && (
                <Services servicesData={services} serviceColumns={serviceColumns} />
            )}

            {activeTab === "withdrawal" && (
                <Withdrawal withdrawalRequests={withdrawalRequests} t={t} lang={lang} />
            )}

            {activeTab === "verification" && (
                <Verification verificationDocuments={verificationDocuments} t={t} sellerId={sellerId!} />
            )}

            {activeTab === "logs" && (
                <Logs t={t} activityLog={activityLog} />
            )}

            {/* Service Action Modals */}
            <ConfirmModal
                isOpen={isServiceStopModalOpen}
                onClose={() => setIsServiceStopModalOpen(false)}
                onConfirm={handleConfirmStopService}
                title={t("Common.ConfirmStopTitle")}
                message={t("Services.ConfirmStopMessage")}
                isStop={true}
                loading={isStoppingService}
            />

            <ConfirmModal
                isOpen={isServiceApproveModalOpen}
                onClose={() => setIsServiceApproveModalOpen(false)}
                onConfirm={handleConfirmApproveService}
                title={t("Services.ConfirmApproveTitle")}
                message={t("Services.ConfirmApproveMessage")}
                loading={isApprovingService}
            />

            <ConfirmModal
                isOpen={isServiceReactivateModalOpen}
                onClose={() => setIsServiceReactivateModalOpen(false)}
                onConfirm={handleConfirmReactivateService}
                title={t("Services.ConfirmReactivateTitle")}
                message={t("Services.ConfirmReactivateMessage")}
                loading={isReactivatingService}
                isStop={true}
            />

            <Modal
                isOpen={isServiceRejectModalOpen}
                onClose={() => setIsServiceRejectModalOpen(false)}
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
                            onClick={handleConfirmRejectService}
                            disabled={!rejectReason.ar.trim() || !rejectReason.en.trim() || isRejectingService}
                            className="flex-1 py-2 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] shadow-lg shadow-[#FB2C36]/20 text-white font-bold text-[18px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRejectingService ? t("Common.loading") || "..." : t("Services.ConfirmReject")}
                        </button>
                        <button
                            onClick={() => {
                                setIsServiceRejectModalOpen(false);
                                setRejectReason({ ar: "", en: "" });
                            }}
                            className="flex-1 py-2 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] font-bold text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all"
                        >
                            {t("Merchants.Cancel")}
                        </button>
                    </div>
                </div>
            </Modal>
        </UserDetailLayout>
    );
}
