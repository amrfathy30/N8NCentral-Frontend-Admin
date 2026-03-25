import { useState } from 'react'
import TextArea from '../../../../Components/Ui/TextArea'
import SwitchButton from '../../../../Components/Ui/SwitchButton'
import { Input } from '../../../../Components/Ui/Input'
import { useTranslation } from 'react-i18next'

export default function MessageTemplates() {
    const { t } = useTranslation()
    const [autoSend, setAutoSend] = useState(true);

    return (
        <div className="bg-white rounded-[16px] shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.EmailSettings')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label={t('GeneralSettings.SmtpHost')}
                    defaultValue="smtp.gmail.com"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px]"
                />
                <Input
                    label={t('GeneralSettings.SmtpPort')}
                    defaultValue="467"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Input
                    label={t('GeneralSettings.SenderEmail')}
                    defaultValue="noreply@n2n.com"
                    labelClassName="text-sm font-semibold text-[#000000]"
                    inputClassName="border border-[#E5E7EB] rounded-[10px]"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-[#000000]">{t('GeneralSettings.EnableAutoSend')}</span>
                    <SwitchButton checked={autoSend} onChange={() => setAutoSend(!autoSend)} />
                </div>
            </div>

            <div className="space-y-3 pt-3">
                <h3 className="font-bold text-[#000000]">{t('GeneralSettings.MessageTemplates')}</h3>

                <div className="space-y-2">
                    <label className="text-sm text-[#000000] block">{t('GeneralSettings.ActivationTemplate')}</label>
                    <TextArea
                        value="مرحباً {{name}}،&#10;تم تفعيل حسابك بنجاح في N2N."
                        className="text-sm text-gray-700 font-semibold min-h-[80px]"
                        onChange={() => { }}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-[#000000] block">{t('GeneralSettings.SuspensionTemplate')}</label>
                    <TextArea
                        value="تم فتح نزاع على الطلب رقم {{order_id}}.&#10;يرجى مراجعة التفاصيل."
                        className="text-sm text-gray-700 font-semibold min-h-[80px]"
                        onChange={() => { }}
                    />
                </div>
            </div>

            <button className="bg-greenDark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                {t('GeneralSettings.PreviewTemplate')}
            </button>
        </div>)
}
