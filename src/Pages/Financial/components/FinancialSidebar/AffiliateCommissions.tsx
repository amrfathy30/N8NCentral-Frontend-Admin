import Button from '../../../../Components/Ui/Button'
import { useTranslation } from 'react-i18next';
import CustomSelect from '../../../../Components/Ui/CustomSelect';

export default function AffiliateCommissions() {
    const { t } = useTranslation();
    const options = [
        { value: "today", label: "الكل" },
        { value: "week", label: "افلييت 1" },
        { value: "month", label: "افلييت 2" },
    ];

    return (
        <div className="custom-card">
            <h4 className="font-bold text-gray-800 mb-2">{t("Financial.Sidebar.AffiliateCommissions")}</h4>
            <h6 className="text-[#6B7280] text-[14px] mb-6">{t("Financial.Sidebar.AffiliateCommissionsDescription")}</h6>
            <div className="space-y-4">
                <div>
                    <CustomSelect
                        options={options}
                        className="w-32"
                        placeholder={t("Dashboard.SelectPeriod") || "اختر الفترة"}
                        value={options[0]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-extrabold text-[#374151] mb-1 block">{t("Financial.Sidebar.CurrentRatio")}</label>
                        <div className="relative">
                            <input type="text" className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-3 pl-10 text-xs" placeholder="22%" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-extrabold text-[#374151] mb-1 block">{t("Financial.Sidebar.NewRatio")}</label>
                        <div className="relative">
                            <input type="text" className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-3 pl-10 text-xs" placeholder="مثال: 25" />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                        </div>
                        <p className="text-[12px] text-[#6B7280] mb-1 block">مقترح: 5% - 30%</p>
                    </div>
                </div>

                <div className='p-3 rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB]'>
                    <h2 className='text-sm font-extrabold text-[#1F2937] mb-1'>
                        معاينة
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className='bg-white border border-[#E5E7EB] p-3 rounded-[12px]'>
                            <h2 className='font-extrabold text-[#6B7280] text-[12px]'>
                                مبيعات 30 يوم
                            </h2>
                            <p className='text-black font-extrabold text-[14px]'>
                                $12,450
                            </p>
                        </div>
                        <div className='bg-white border border-[#E5E7EB] p-3 rounded-[12px]'>
                            <h2 className='font-extrabold text-[#6B7280] text-[12px]'>
                                عمولة متوقعة
                            </h2>
                            <p className='text-greenDark font-extrabold text-[14px]'>
                                $935
                            </p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-center gap-2 flex-col md:flex-row'>
                    <Button className="w-full !text-[16px] !py-2 bg-greenDark !px-1">
                        {t("Financial.Sidebar.save")}
                    </Button>

                    <Button border className="w-full !text-[16px] !py-2 bg-white !px-1 !border !border-[#E5E7EB] text-black hover:text-white">
                        {t("Financial.Sidebar.more")}
                    </Button>
                </div>
            </div>
            {/* 
            <div className="mt-8 space-y-4">
                <div className="p-4 bg-green-50 rounded-[16px] flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-green-600 font-medium mb-1">{t("Financial.Sidebar.Revenue")}</p>
                        <h5 className="font-bold text-green-800">$12,450</h5>
                    </div>
                    <ArrowUpRight className="text-green-600 w-5 h-5" />
                </div>
                <div className="p-4 bg-blue-50 rounded-[16px] flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-blue-600 font-medium mb-1">{t("Financial.Sidebar.RevenueGrowth")}</p>
                        <h5 className="font-bold text-blue-800">+14%</h5>
                    </div>
                    <ArrowUpRight className="text-blue-600 w-5 h-5" />
                </div>
            </div> */}
        </div>)
}
