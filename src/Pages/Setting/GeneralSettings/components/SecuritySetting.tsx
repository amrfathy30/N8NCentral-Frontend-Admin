import { useTranslation } from 'react-i18next'
import { Input } from '../../../../Components/Ui/Input'
import SwitchButton from '../../../../Components/Ui/SwitchButton'
import { useState } from 'react';

export default function SecuritySetting() {
    const { t } = useTranslation()
    const [dynamicSecuritySetting, setDynamicSecuritySetting] = useState(true);

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.SecuritySettings')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-[#000000]">{t('GeneralSettings.two_factor_authentication')}</span>
                    <SwitchButton checked={dynamicSecuritySetting} onChange={() => setDynamicSecuritySetting(!dynamicSecuritySetting)} />
                </div>
                <Input
                    label={t('GeneralSettings.SessionDuration')}
                    placeholder="60"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
                <Input
                    label={t('GeneralSettings.APIKey')}
                    placeholder='sk_live_xxxxxx'
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
                <Input
                    label={t('GeneralSettings.AllowFailedLoginAttempts')}
                    placeholder="10"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px] bg-transparent"
                />
            </div>
        </div>)
}
