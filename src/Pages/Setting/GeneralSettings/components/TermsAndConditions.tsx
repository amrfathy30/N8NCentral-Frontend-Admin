import { useTranslation } from 'react-i18next';
import TextEditor from '../../../../Components/Ui/TextEditor';
import { useState } from 'react';

export default function TermsAndConditions() {
    const { t } = useTranslation();

    const getInitialContent = (title: string) => `
        <div style="border-right: 4px solid #2B7B4C; padding-right: 12px; margin-bottom: 16px;">
            <strong>المقدمة</strong><br/>
            مرحباً بك في منصة N8NCentral. باستخدامك لحساب ${title}، فإنك توافق على الالتزام بجميع الشروط والأحكام الموضحة في هذه الصفحة. يرجى قراءة هذه الشروط بعناية قبل البدء في استخدام خدمات البيع عبر المنصة.
        </div>
        <div style="padding-right: 16px;">
            <strong>إنشاء الحساب</strong><br/>
            يجب على ${title} تقديم معلومات صحيحة وكاملة عند إنشاء الحساب. يتحمل ${title} مسؤولية الحفاظ على سرية بيانات تسجيل الدخول الخاصة به، ويُعد مسؤولاً عن جميع الأنشطة التي تتم من خلال حسابه. تحتفظ المنصة بحق طلب مستندات إضافية للتحقق من الهوية أو النشاط التجاري في أي وقت.
        </div>
    `;

    const [sellerTerms, setSellerTerms] = useState(getInitialContent('البائع'));
    const [buyerTerms, setBuyerTerms] = useState(getInitialContent('المشتري'));
    const [affiliateTerms, setAffiliateTerms] = useState(getInitialContent('الأفلييت'));

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.TermsAndConditions', 'الشروط والأحكام')}
            </h2>

            <div className="space-y-6">
                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <h3 className="font-extrabold text-black">{t('GeneralSettings.SellerTermsTitle', 'البائع')}</h3>
                    <TextEditor value={sellerTerms} onChange={setSellerTerms} />
                </div>

                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <h3 className="font-extrabold text-black">{t('GeneralSettings.BuyerTermsTitle', 'المشتري')}</h3>
                    <TextEditor value={buyerTerms} onChange={setBuyerTerms} />
                </div>

                <div className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
                    <h3 className="font-extrabold text-black">{t('GeneralSettings.AffiliateTermsTitle', 'الافلييت')}</h3>
                    <TextEditor value={affiliateTerms} onChange={setAffiliateTerms} />
                </div>
            </div>
        </div>
    );
}
