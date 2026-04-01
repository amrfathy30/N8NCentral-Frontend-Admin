import { useTranslation } from 'react-i18next'
import { Input } from '../../../../Components/Ui/Input'
import TextArea from '../../../../Components/Ui/TextArea'
import { useState, useEffect } from 'react'
import Button from '../../../../Components/Ui/Button'
import ConfirmModal from '../../../../Components/Ui/ConfirmModal'
import { useUpdatePlansDataMutation } from '../../../../store/Api/Setting/usePlansApi'
import { showToastSuccess, showToastError } from '../../../../Components/Helper/toastHelper'
import type { Plan } from '../../../../types/setting'
import PlansSkeleton from '../../../../Components/Skeleton/Setting/PlansSkeleton'

export default function Plans({ plansData, loading }: { plansData: any, loading: boolean }) {
    const { t, i18n } = useTranslation()
    const currentLang = i18n.language as 'en' | 'ar';

    const [plans, setPlans] = useState<Plan[]>([])
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [updatePlan, { isLoading: isUpdating }] = useUpdatePlansDataMutation()

    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

    useEffect(() => {
        if (plansData?.data) {
            setPlans(plansData.data)
        }
    }, [plansData])

    const handleInputChange = (index: number, field: keyof Plan, value: string) => {
        if (['price', 'max_services', 'commission_rate'].includes(field as string)) {
            if (value !== '' && isNaN(Number(value))) return;
        }

        const newPlans = [...plans];
        newPlans[index] = {
            ...newPlans[index],
            [field]: field === 'max_services' ? (value === '' ? 0 : Number(value)) : value
        };
        setPlans(newPlans);
    };

    const handleFeatureChange = (index: number, lang: 'en' | 'ar', value: string) => {
        const newPlans = [...plans];
        const newFeatures = { ...newPlans[index].features };
        newFeatures[lang] = value.split('\n');

        newPlans[index] = {
            ...newPlans[index],
            features: newFeatures
        };
        setPlans(newPlans);
    };

    const handleSave = async () => {
        if (!selectedPlan) return;
        try {
            await updatePlan({ id: selectedPlan.id.toString(), data: selectedPlan }).unwrap();
            showToastSuccess(t('DropDownMenuSettings.UpdateSuccess', 'تم التحديث بنجاح'));
            setIsConfirmModalOpen(false);
            setSelectedPlan(null);
        } catch (error: any) {
            showToastError(error?.data?.message || t('DropDownMenuSettings.UpdateError', 'حدث خطأ أثناء التحديث'));
        }
    };

    if (loading) return <PlansSkeleton />;

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-[#000000]">
                {t('GeneralSettings.PlansSettings')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div key={plan.id} className="border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col h-full bg-white hover:border-[#2B7B4C]/30 transition-all">
                        <div className="space-y-4 flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-extrabold w-full text-main">
                                    {plan.name[currentLang] || plan.name.en}
                                </h3>
                                {plan.id === 1 && (
                                    <span className="bg-[#E8F5E9] text-greenDark text-xs px-3 py-1 rounded-full font-extrabold shrink-0">
                                        {t('GeneralSettings.Current')}
                                    </span>
                                )}
                            </div>

                            <Input
                                label={t('GeneralSettings.Price')}
                                value={plan.price}
                                type="number"
                                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                labelClassName="text-xs font-semibold text-[#667085]"
                                inputClassName="border border-[#E5E7EB] rounded-[12px]"
                            />

                            <Input
                                label={t('GeneralSettings.AllowedServices')}
                                value={plan.max_services}
                                type="number"
                                onChange={(e) => handleInputChange(index, 'max_services', e.target.value)}
                                labelClassName="text-xs font-semibold text-[#667085]"
                                inputClassName="border border-[#E5E7EB] rounded-[12px]"
                            />

                            <Input
                                label={t('GeneralSettings.CommissionRate', 'Commission Rate (%)')}
                                value={plan.commission_rate}
                                type="number"
                                onChange={(e) => handleInputChange(index, 'commission_rate', e.target.value)}
                                labelClassName="text-xs font-semibold text-[#667085]"
                                inputClassName="border border-[#E5E7EB] rounded-[12px]"
                            />

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-[#667085]">{t('GeneralSettings.PlanFeatures')} (AR)</label>
                                <TextArea
                                    value={plan.features.ar.join('\n')}
                                    className="text-sm text-gray-700 min-h-[80px] bg-[#F9FAFB]"
                                    onChange={(e: any) => handleFeatureChange(index, 'ar', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-[#667085]">{t('GeneralSettings.PlanFeatures')} (EN)</label>
                                <TextArea
                                    value={plan.features.en.join('\n')}
                                    className="text-sm text-gray-700 min-h-[80px] bg-[#F9FAFB]"
                                    onChange={(e: any) => handleFeatureChange(index, 'en', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                onClick={() => {
                                    setSelectedPlan(plan);
                                    setIsConfirmModalOpen(true);
                                }}
                                loading={isUpdating && selectedPlan?.id === plan.id}
                                className="w-full"
                            >
                                {t('Permissions.Save', 'حفظ')}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => {
                    setIsConfirmModalOpen(false);
                    setSelectedPlan(null);
                }}
                onConfirm={handleSave}
                loading={isUpdating}
                title={t('DropDownMenuSettings.UpdateConfirmTitle', 'تأكيد الحفظ')}
                message={t('DropDownMenuSettings.UpdateConfirmMessage', 'هل أنت متأكد من رغبتك في حفظ التغييرات على الخطط؟')}
            />
        </div>
    );
}
