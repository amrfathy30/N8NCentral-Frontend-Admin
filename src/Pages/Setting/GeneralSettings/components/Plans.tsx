import { useTranslation } from 'react-i18next'
import { Input } from '../../../../Components/Ui/Input'
import TextArea from '../../../../Components/Ui/TextArea'

export default function Plans() {
    const { t } = useTranslation()
    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.PlansSettings')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Plan */}
                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-extrabold w-full">Basic</h3>
                        <span className="bg-[#E8F5E9] text-greenDark text-xs px-3 py-1 rounded-full font-extrabold ">
                            {t('GeneralSettings.Current')}
                        </span>
                    </div>

                    <Input
                        label={t('GeneralSettings.Price')}
                        defaultValue="0"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <Input
                        label={t('GeneralSettings.AllowedServices')}
                        defaultValue="2"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#667085]">{t('GeneralSettings.PlanFeatures')}</label>
                        <TextArea
                            value="- إتاحة حتى 3 خدمات&#10;- دعم أساسي&#10;- تحليلات محدودة"
                            className="text-sm text-gray-700 min-h-[100px] bg-[#F9FAFB]"
                            onChange={() => { }}
                        />
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <h3 className="font-bold">Pro</h3>

                    <Input
                        label={t('GeneralSettings.Price')}
                        defaultValue="29"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <Input
                        label={t('GeneralSettings.NumberOfServices')}
                        defaultValue="10"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#667085]">{t('GeneralSettings.PlanFeatures')}</label>
                        <TextArea
                            value="- إتاحة 10 خدمات&#10;- دعم أولوية&#10;- تحليلات متقدمة"
                            className="text-sm text-gray-700 min-h-[100px] bg-[#F9FAFB]"
                            onChange={() => { }}
                        />
                    </div>
                </div>

                {/* Ultra Plan */}
                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <h3 className="font-bold">Ultra</h3>

                    <Input
                        label={t('GeneralSettings.Price')}
                        defaultValue="79"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <Input
                        label={t('GeneralSettings.NumberOfServices')}
                        defaultValue="999"
                        labelClassName="text-xs font-semibold text-[#667085]"
                        inputClassName="border border-[#E5E7EB] rounded-[12px]"
                    />
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#667085]">{t('GeneralSettings.PlanFeatures')}</label>
                        <TextArea
                            value="- خدمات غير محدودة&#10;- دعم VIP&#10;- تحليلات كاملة"
                            className="text-sm text-gray-700 min-h-[100px] bg-[#F9FAFB]"
                            onChange={() => { }}
                        />
                    </div>
                </div>
            </div>
        </div>)
}
