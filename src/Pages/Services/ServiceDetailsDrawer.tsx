import { useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";
import Button from "../../Components/Ui/Button";
import { Star, Ban, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Components/Ui/ConfirmModal";
import { showToastSuccess } from "../../Components/Helper/toastHelper";
import { handleApiError } from "../../Components/Helper/handleApiError";
import { useGetServiceByIdQuery } from "../../store/Api/Services/useServicesApi";

interface ServiceDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    id: any;
    activeFilter?: string;
    onStop?: (service: any) => void;
    onApprove?: (service: any) => void;
    onReject?: (service: any) => void;
    onReactivate?: (service: any) => void;
}

export default function ServiceDetailsDrawer({ isOpen, onClose, id, activeFilter, onStop, onApprove, onReject, onReactivate }: ServiceDetailsDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const lang = i18n.language
    const navigate = useNavigate()
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isExtraStopModalOpen, setIsExtraStopModalOpen] = useState(false);
    const [isExtraBanModalOpen, setIsExtraBanModalOpen] = useState(false);
    const [selectedExtraId, setSelectedExtraId] = useState<string | null>(null);

    const { data: serviceData } = useGetServiceByIdQuery({ service: id! }, { skip: !id });
    const service = serviceData?.data;

    const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
        <div className={`flex items-center flex-wrap gap-2 ${className}`}>
            <span className="text-greenDark text-[14px] font-bold">{label}</span>
            <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
        </div>
    );

    const handleConfirmExtraStop = async () => {
        try {
            if (!selectedExtraId) return;
            showToastSuccess(t("Services.ExtraStopSuccess"));
            setIsExtraStopModalOpen(false);
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleConfirmExtraBan = async () => {
        try {
            if (!selectedExtraId) return;
            showToastSuccess(t("Services.ExtraBanSuccess"));
            setIsExtraBanModalOpen(false);
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={t("Services.ServiceDetails.Title")}
                maxWidth="500px"
                side={dir === 'rtl' ? 'left' : 'right'}
            >
                <div className="space-y-8">
                    {/* Hero / Icon Section */}
                    <div className="w-full h-[180px] bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[20px] flex items-center justify-center shadow-inner relative overflow-hidden">
                        <img src={service?.image} alt="service image" className="w-full h-full object-cover" />
                    </div>

                    {/* Service Details Grid */}
                    <section className="space-y-4">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-[12px] p-4">
                            <DetailItem
                                label={t("Services.ServiceDetails.Name")}
                                value={service?.display_title || (typeof service?.title === 'string' ? service?.title : (service?.title?.[lang] || service?.title?.ar || service?.title?.en)) || "----"}
                            />
                            <DetailItem label={t("Services.ServiceDetails.Merchant")} value={service?.seller?.name || service?.merchant?.name || service?.merchant || "شركة التقنية"} />
                            <DetailItem label={t("Services.ServiceDetails.Price")} value={service?.price} />
                            <DetailItem label={t("Services.ServiceDetails.LastSale")} value="منذ 8 ساعات" />
                            <DetailItem label={t("Services.ServiceDetails.Email")} value={service?.seller?.email} />
                            <DetailItem
                                label={t("Services.ServiceDetails.Category")}
                                value={service?.category?.display_name || (typeof service?.category?.name === 'string' ? service?.category?.name : (service?.category?.name?.[lang] || service?.category?.name?.ar || service?.category?.name?.en)) || "----"}
                            />
                        </div>
                    </section>

                    {/* Additional Services */}
                    <section className="space-y-4">
                        <h3 className="text-greenDark text-[21px] font-bold pb-2">
                            {t("Services.ServiceDetails.AdditionalServices")}
                        </h3>
                        <div className="space-y-3 bg-white rounded-[12px] p-4">
                            {service?.extras?.length > 0 ? (
                                service.extras.map((extra: any) => (
                                <div key={extra.id} className="p-4 flex items-center justify-between flex-wrap gap-3">
                                    <span className="text-greenDark font-bold text-[17px]">{extra.title}</span>
                                    <span className="text-greenDark font-semibold text-[17px]">${extra.price}</span>
                                    <span className="text-greenDark font-semibold text-[17px]">نشطة</span>
                                    <div className="flex items-center gap-2 md:gap-0">
                                        <button onClick={() => {
                                            setSelectedExtraId(extra.id);
                                            setIsExtraStopModalOpen(true);
                                        }}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Pause size={16} className="fill-[#F68713] text-[#F68713] " />
                                        </button>
                                        <button onClick={() => {
                                            setSelectedExtraId(extra.id);
                                            setIsExtraBanModalOpen(true);
                                        }}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Ban size={16} className="text-[#D00808]" />
                                        </button>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <p className="text-center text-gray-400 py-4">{t("Common.NoExtras")}</p>
                            )}
                        </div>
                    </section>

                    {/* Expert Info */}
                    <section className="space-y-4">
                        <h3 className="text-greenDark text-[21px] font-bold pb-2">
                            {t("Services.ServiceDetails.Expert")}
                        </h3>
                        <div className="bg-white border border-gray-50 rounded-[20px] p-6 shadow-sm flex items-start justify-between flex-wrap gap-3">

                            <div className="flex flex-col items-start gap-3">

                                <div className="text-start">
                                    <h4 className="text-greenDark font-semibold text-[20px]">
                                        {`${service?.seller?.first_name}`}
                                    </h4>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <Star size={14} className="text-greenDark fill-greenDark" />
                                        <span className="text-greenDark font-semibold text-[14px]">4.8</span>
                                        (
                                        <span className="text-[#6A7282] text-[14px]">{service?.reviews_count} {t("Services.ServiceDetails.Reviews")}</span>)
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {service?.tools_used?.map((tool: any, idx: number) => (
                                        <span key={idx} className="bg-[#D0FAE5] text-greenDark px-3 py-1 rounded-full text-[12px]">{tool}</span>
                                    ))}
                                </div>
                            </div>
                            <Button className="mt-2 !w-fit !py-2 !px-4 !text-[14px] !font-semibold !rounded-full !text-white">
                                {t("Services.ServiceDetails.ViewProfile")}
                            </Button>
                        </div>

                    </section>

                    {/* footer  */}
                    <div className="flex flex-col gap-3 w-full pt-4 pb-6">
                        {/* View Full Page - always visible */}
                        <Button
                            onClick={() => navigate(`/${lang}/admin/services-details/${service?.id}`)}
                            className="w-full !bg-greenDark !py-3 !shadow-md"
                        >
                            {t("Services.ServiceDetails.ViewFullPage")}
                        </Button>

                        {/* Active: Stop + Reject */}
                        {activeFilter === "active" && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { onStop?.(service); onClose(); }}
                                    className="flex-1 py-3 rounded-[10px] bg-[#F68713] hover:bg-[#d97706] text-white font-bold text-[16px] shadow-md transition-all"
                                >
                                    {t("Services.ServiceDetails.StopService")}
                                </button>
                                <button
                                    onClick={() => { onReject?.(service); onClose(); }}
                                    className="flex-1 py-3 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] text-white font-bold text-[16px] shadow-md transition-all"
                                >
                                    {t("Services.Reject")}
                                </button>
                            </div>
                        )}

                        {/* Pending: Approve + Reject */}
                        {activeFilter === "PendingReview" && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { onApprove?.(service); onClose(); }}
                                    className="flex-1 py-3 rounded-[10px] bg-[#2B7B4C] hover:bg-[#23663f] text-white font-bold text-[16px] shadow-md transition-all"
                                >
                                    {t("Services.Approve")}
                                </button>
                                <button
                                    onClick={() => { onReject?.(service); onClose(); }}
                                    className="flex-1 py-3 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] text-white font-bold text-[16px] shadow-md transition-all"
                                >
                                    {t("Services.Reject")}
                                </button>
                            </div>
                        )}

                        {/* Rejected: Reactivate */}
                        {activeFilter === "Rejected" && (
                            <button
                                onClick={() => { onReactivate?.(service); onClose(); }}
                                className="w-full py-3 rounded-[10px] bg-[#F68713] hover:bg-[#d97706] text-white font-bold text-[16px] shadow-md transition-all"
                            >
                                {t("Services.Reactivate")}
                            </button>
                        )}
                    </div>
                </div>
            </Drawer>

            <ConfirmModal
                isOpen={isStopModalOpen}
                onClose={() => setIsStopModalOpen(false)}
                onConfirm={() => {
                    console.log("Service Stopped");
                    setIsStopModalOpen(false);
                }}
                isDanger={true}
                title={t("Services.Messages.StopTitle")}
                message={t("Services.Messages.StopConfirm")}
            />

            <ConfirmModal
                isOpen={isExtraStopModalOpen}
                onClose={() => setIsExtraStopModalOpen(false)}
                onConfirm={handleConfirmExtraStop}
                title={t("Common.ConfirmStopTitle")}
                message={t("Services.ConfirmExtraStopMessage")}
                isStop={true}
            />

            <ConfirmModal
                isOpen={isExtraBanModalOpen}
                onClose={() => setIsExtraBanModalOpen(false)}
                onConfirm={handleConfirmExtraBan}
                title={t("Common.ConfirmBanTitle")}
                message={t("Services.ConfirmExtraBanMessage")}
                isDanger={true}
            />
        </>
    );
}
