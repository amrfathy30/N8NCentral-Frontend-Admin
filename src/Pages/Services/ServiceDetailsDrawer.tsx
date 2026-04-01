import { useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";
import Button from "../../Components/Ui/Button";
import { Star, Ban, Pause } from "lucide-react";
import ConfirmModal from "../../Components/Ui/ConfirmModal";

interface ServiceDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    service: any;
}

export default function ServiceDetailsDrawer({ isOpen, onClose, service }: ServiceDetailsDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);

    const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
        <div className={`flex items-center flex-wrap gap-2 ${className}`}>
            <span className="text-greenDark text-[14px] font-bold">{label}</span>
            <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
        </div>
    );

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
                        <DetailItem label={t("Services.ServiceDetails.Name")} value={service?.service || "خدمة أتمتة الرسائل"} />
                        <DetailItem label={t("Services.ServiceDetails.Merchant")} value={service?.merchant || "شركة التقنية"} />
                        <DetailItem label={t("Services.ServiceDetails.Price")} value={service?.price || "125"} />
                        <DetailItem label={t("Services.ServiceDetails.LastSale")} value="منذ 8 ساعات" />
                        <DetailItem label={t("Services.ServiceDetails.Email")} value="abc@123.com" />
                        <DetailItem label={t("Services.ServiceDetails.Category")} value={service?.category || "التسويق"} />
                    </div>
                </section>

                {/* Additional Services */}
                <section className="space-y-4">
                    <h3 className="text-greenDark text-[21px] font-bold pb-2">
                        {t("Services.ServiceDetails.AdditionalServices")}
                    </h3>
                    <div className="space-y-3 bg-white rounded-[12px] p-4">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between flex-wrap gap-3">
                                <span className="text-greenDark font-bold text-[17px]">تنفيد بالأولوية</span>
                                <span className="text-greenDark font-semibold text-[17px]">$50</span>
                                <span className="text-greenDark font-semibold text-[17px]">نشطة</span>
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
                </section>

                {/* Expert Info */}
                <section className="space-y-4">
                    <h3 className="text-greenDark text-[21px] font-bold pb-2">
                        {t("Services.ServiceDetails.Expert")}
                    </h3>
                    <div className="bg-white border border-gray-50 rounded-[20px] p-6 shadow-sm flex items-start justify-between flex-wrap gap-3">

                        <div className="flex flex-col items-start gap-3">

                            <div className="text-start">
                                <h4 className="text-greenDark font-semibold text-[20px]">أحمد الزهراني</h4>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <Star size={14} className="text-greenDark fill-greenDark" />
                                    <span className="text-greenDark font-semibold text-[14px]">4.8</span>
                                    (
                                    <span className="text-[#6A7282] text-[14px]">342 تقييم</span>)
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-[#D0FAE5] text-greenDark px-3 py-1 rounded-full text-[12px]">n8n</span>
                                <span className="bg-[#DBEAFE] text-[#1447E6] px-3 py-1 rounded-full text-[12px]">Make.com</span>
                                <span className="bg-[#F3E8FF] text-[#8200DB] px-3 py-1 rounded-full text-[12px]">Zapier</span>
                            </div>
                        </div>
                        <Button className="mt-2 !w-fit !py-2 !px-4 !text-[14px] !font-semibold !rounded-full !text-white">
                            {t("Services.ServiceDetails.ViewProfile")}
                        </Button>
                    </div>

                </section>

                {/* footer  */}
                <div className="flex flex-col gap-3 w-full pt-4 pb-6">
                    <div className="flex gap-3">
                        <Button className="flex-[1.5] !bg-greenDark !py-3 !shadow-md">
                            {t("Services.ServiceDetails.ViewFullPage")}
                        </Button>
                        <Button className="flex-1 !bg-[#F68713] !py-3 !shadow-md">
                            {t("Services.ServiceDetails.EditService")}
                        </Button>
                    </div>
                    <Button onClick={() => setIsStopModalOpen(true)} className="w-full !bg-[#E7000B] !py-3 !shadow-md">
                        {t("Services.ServiceDetails.StopService")}
                    </Button>
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
        </>
    );
}
