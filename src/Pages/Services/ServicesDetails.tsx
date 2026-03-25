import { useTranslation } from "react-i18next";
import {
    ChevronLeft,
    ChevronRight,
    Users,
    Clock,
    Pause,
    Ban
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Ui/Header";
import { DownloadIcon, Flash, Star } from "../../icons";

export default function ServicesDetails() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir();

    const handleBack = () => {
        navigate(-1);
    };

    const additionalServices = [
        { name: t("Services.ServiceDetails.PriorityExecution"), price: "55$", status: t("Common.Active") },
        { name: t("Services.ServiceDetails.PriorityExecution"), price: "33$", status: t("Common.Active") },
        { name: t("Services.ServiceDetails.PriorityExecution"), price: "11$", status: t("Common.Active") },
    ];

    const steps = [
        { id: 1, title: t("Services.ServiceDetails.Steps.Step1Title"), desc: t("Services.ServiceDetails.Steps.Step1Desc") },
        { id: 2, title: t("Services.ServiceDetails.Steps.Step2Title"), desc: t("Services.ServiceDetails.Steps.Step2Desc") },
        { id: 3, title: t("Services.ServiceDetails.Steps.Step3Title"), desc: t("Services.ServiceDetails.Steps.Step3Desc") },
        { id: 4, title: t("Services.ServiceDetails.Steps.Step4Title"), desc: t("Services.ServiceDetails.Steps.Step4Desc") },
    ];

    return (
        <div className="space-y-8 pb-10 p-" dir={dir}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <Header title={t("Services.ServiceDetails.HeaderTitle")} titleClassName="text-[24px] text-greenDark" />
                <button
                    onClick={handleBack}
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
                        {t("Services.FeaturedServices")}
                    </div>

                    <h2 className="text-[24px] md:text-[40px] font-medium text-[#0A2F64] leading-tight line-clamp-2">
                        {t("Services.ServiceDetails.FeaturedTitle")}
                    </h2>

                    <p className="text-[#5C5C5C] text-[16px] md:text-[21px] leading-relaxed line-clamp-2">
                        {t("Services.ServiceDetails.FeaturedDescription")}
                    </p>

                    <div className="flex items-center flex-wrap gap-4 md:gap-16 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Star className="text-greenDark" />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">4.8</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.Rating")}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Users size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">123</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.Buyer")}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#2B7B4C1A] flex items-center justify-center text-greenDark">
                                <Clock size={20} />
                            </div>
                            <div>
                                <div className="font-semibold text-greenDark">2-3 {t("Services.ServiceDetails.Days")}</div>
                                <div className="text-[14px] text-black">{t("Services.ServiceDetails.DeliveryTime")}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Image) */}
                <div className="w-full lg:w-[400px] h-full md:h-[400px]">
                    <div className="lg:aspect-square rounded-[20px] overflow-hidden flex items-center justify-center shadow-lg">
                        <img
                            src="/images/services/services-2.jpg"
                            alt="WhatsApp"
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
                        {additionalServices.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between flex-wrap gap-4">
                                <span className="text-greenDark font-bold text-[17px]">{service.name}</span>
                                <span className="text-greenDark font-semibold text-[17px]">{service.price}</span>
                                <span className="text-greenDark font-semibold text-[17px]">{service.status}</span>
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

                        <span className="bg-[#FFE2E2] text-[#C10007] px-3 py-1 rounded-full text-[16px] font-medium">n8n</span>
                        <span className="bg-[#DBEAFE] text-[#1447E6] px-3 py-1 rounded-full text-[16px] font-medium">Google Sheets</span>
                        <span className="bg-[#F3E8FF] text-[#8200DB] px-3 py-1 rounded-full text-[16px] font-medium">Webhooks</span>
                        <span className="bg-[#DCFCE7] text-[#008236] px-3 py-1 rounded-full text-[16px] font-medium">WhatsApp Business API</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-greenDark">{t("Services.ServiceDetails.ServiceDescription")}</h3>
                <p className="text-[#364153] leading-loose text-[16px] bg-white rounded-[24px] p-4">
                    {t("Services.ServiceDetails.DetailedDescription")}
                </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">

                <div className="lg:col-span-3">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {steps.map((step) => (
                            <div key={step.id} className="bg-[#ECFDF5] p-5 rounded-[10px] flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-greenDark text-white flex items-center justify-center flex-shrink-0 font-bold">
                                    {step.id}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-greenDark">{step.title}</h4>
                                    <p className="text-[#4A5565] leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                        <button className="flex-1 w-full py-2 rounded-full bg-greenDark text-white text-lg font-semibold hover:bg-greenDark/90 transition-all flex items-center justify-center gap-2">
                            {t("Services.ServiceDetails.AcceptService")}
                        </button>
                        <button className="flex-1 w-full py-2 rounded-full bg-red-600 text-white text-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                            {t("Services.ServiceDetails.RejectService")}
                        </button>
                    </div>
                </div>

                {/* download  */}
                <div className="lg:col-span-1 flex items-center justify-center">
                    <a
                        // href="/files/service-documentation.pdf"
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
