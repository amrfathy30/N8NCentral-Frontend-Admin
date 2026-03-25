import { useTranslation } from 'react-i18next'
import { Input } from '../../../../Components/Ui/Input'
import SwitchButton from '../../../../Components/Ui/SwitchButton'
import { useState } from 'react';

export default function Commissions() {
    const { t } = useTranslation()
    const [dynamicCommission, setDynamicCommission] = useState(true);

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.CommissionsSettings')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <Input
                    label={t('GeneralSettings.MerchantCommission')}
                    defaultValue="20"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
                <Input
                    label={t('GeneralSettings.AffiliateCommission')}
                    defaultValue="10"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
                <Input
                    label={t('GeneralSettings.PremiumServiceCommission')}
                    defaultValue="5"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-[#000000]">{t('GeneralSettings.DynamicCommission')}</span>
                    <SwitchButton checked={dynamicCommission} onChange={() => setDynamicCommission(!dynamicCommission)} />
                </div>
            </div>
        </div>)
}
