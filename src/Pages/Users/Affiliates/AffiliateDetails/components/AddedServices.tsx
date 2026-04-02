import { Search, TrendingUp as TrendingIcon } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../../../../../Components/Ui/ConfirmModal";

interface AddedService {
    id: number;
    title: string;
    status: string;
    conversionRate: string;
    commissionRate: string;
    sales: string;
    totalCommissions: string;
    expectedCommission: string;
}

interface AddedServicesProps {
    addedServicesData: AddedService[];
    t: any;
}

export default function AddedServices({ addedServicesData, t }: AddedServicesProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<AddedService | null>(null);
    const handleStopClick = (service: AddedService) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };
    const handleConfirmStop = () => {
        if (!selectedService) return;
        console.log("Stopping service:", selectedService.id);
        setIsModalOpen(false);
    };
    return (
        <div className="space-y-6">
            {/* Header: Search and Filters */}
            <div className="bg-white rounded-[18px] p-4 shadow-sm border border-[#F3F4F6] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] px-3 py-2 w-full md:w-[350px]">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder={t("AccountDetails.AddedServices.SearchPlaceholder")}
                        className="bg-transparent border-none outline-none px-2 w-full text-[14px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center bg-[#F9FAFB] p-1 rounded-[10px] px-4">
                    <button
                        onClick={() => setStatusFilter("all")}
                        className={`px-6 py-1.5 rounded-[10px] text-[14px] font-semibold transition-all ${statusFilter === 'all' ? 'bg-greenDark text-white' : 'text-gray-500'}`}
                    >
                        {t("AccountDetails.AddedServices.StatusAll")}
                    </button>
                    <button
                        onClick={() => setStatusFilter("active")}
                        className={`px-6 py-1.5 rounded-[10px] text-[14px] font-semibold transition-all ${statusFilter === 'active' ? 'bg-greenDark text-white' : 'text-gray-500'}`}
                    >
                        {t("AccountDetails.AddedServices.StatusActive")}
                    </button>
                    <button
                        onClick={() => setStatusFilter("inactive")}
                        className={`px-6 py-1.5 rounded-[10px] text-[14px] font-semibold transition-all ${statusFilter === 'inactive' ? 'bg-greenDark text-white' : 'text-gray-500'}`}
                    >
                        {t("AccountDetails.AddedServices.StatusInactive")}
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addedServicesData.map((service) => (
                    <div key={service.id} className="bg-white rounded-[10px] overflow-hidden border border-[#E8E5E5] p-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-greenDark text-[18px] font-semibold flex-1">
                                    {service.title}
                                </h3>
                                <span className="bg-[#2B7B4C33] text-greenDark px-3 py-1 rounded-[4px] text-[12px]">
                                    {t("AccountDetails.AddedServices.StatusActive")}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between bg-[#F9FAFB] p-2.5 rounded-[4px]">
                                    <span className="text-[#646566] text-[14px] font-medium">{t("AccountDetails.ConversionRate")}</span>
                                    <div className="flex items-center gap-1">
                                        <TrendingIcon size={14} className="text-greenDark" />
                                        <span className="text-greenDark text-[16px] font-semibold">{service.conversionRate}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-[#F9FAFB] p-2.5 rounded-[4px]">
                                    <span className="text-[#646566] text-[14px] font-medium">{t("AccountDetails.CommissionRate")}</span>
                                    <span className="text-greenDark text-[16px] font-semibold">{service.commissionRate}</span>
                                </div>
                                <div className="flex items-center justify-between bg-[#F9FAFB] p-2.5 rounded-[4px]">
                                    <span className="text-[#646566] text-[14px] font-medium">{t("AccountDetails.Sales")}</span>
                                    <span className="text-greenDark text-[16px] font-semibold">{service.sales}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#2B7B4C0D] p-5 rounded-[4px] space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[#646566] text-[14px] font-medium">{t("AccountDetails.TotalCommissions")}</span>
                                <span className="text-greenDark text-[20px] font-bold">{service.totalCommissions}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#646566] text-[14px] font-medium">{t("AccountDetails.AddedServices.ExpectedCommission")}</span>
                                <span className="text-[#646566] text-[16px] font-bold">{service.expectedCommission}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-greenDark hover:bg-[#23663f] text-white py-3 rounded-[8px] font-semibold text-[16px] transition-all shadow-sm active:scale-[0.98]">
                                {t("AccountDetails.AddedServices.ViewDetails")}
                            </button>
                            <button onClick={() => handleStopClick(service)} className="flex-1 bg-[#F68713] hover:bg-[#d97706] text-white py-3 rounded-[8px] font-semibold text-[16px] transition-all shadow-sm active:scale-[0.98]">
                                {t("AccountDetails.AddedServices.Stop")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmStop}
                isStop={true} 
                title={t("AccountDetails.AddedServices.ConfirmStopTitle")}
                message={t("AccountDetails.AddedServices.ConfirmStopMessage")}
            />
        </div>)
}
