import { useTranslation } from 'react-i18next';
import Header from '../../../Components/Ui/Header';
import DropdownBlock, { type DropdownItem } from './components/DropdownBlock';

export default function DropDownMenuSettings() {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const serviceTypes: DropdownItem[] = [
        { id: '1', name: 'n8n' },
        { id: '2', name: 'web automation' }
    ];

    const problemTypes: DropdownItem[] = [
        { id: '3', name: 'طلب خاص' },
        { id: '4', name: 'تنويه' },
        { id: '5', name: 'شكوى' },
        { id: '6', name: 'عطل' }
    ];

    const decisionTypes1: DropdownItem[] = [
        { id: '7', name: 'تاجيل' },
        { id: '8', name: 'قبول' },
        { id: '9', name: 'رفض' }
    ];

    const decisionTypes2: DropdownItem[] = [
        { id: '10', name: 'تاجيل' },
        { id: '11', name: 'قبول' },
        { id: '12', name: 'رفض' }
    ];

    const ticketStatus: DropdownItem[] = [
        { id: '13', name: 'تاجيل' },
        { id: '14', name: 'قبول' },
        { id: '15', name: 'رفض' }
    ];

    return (
        <div className="flex flex-col gap-6" dir={dir}>
            <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
                <Header title={t('DropDownMenuSettings.Title', 'إعدادات المنصة')} />
                <button className="bg-greenDark text-white px-6 py-2 rounded-[10px] font-semibold hover:bg-opacity-90 transition-all">
                    {t('DropDownMenuSettings.SaveAllChanges', 'حفظ جميع التغييرات')}
                </button>
            </div>

            <DropdownBlock title={t('DropDownMenuSettings.ServiceType', 'نوع الاوتومين')} items={serviceTypes} />
            <DropdownBlock title={t('DropDownMenuSettings.ProblemType', 'نوع المشكلة')} items={problemTypes} />
            <DropdownBlock title={t('DropDownMenuSettings.DecisionType', 'نوع القرار')} items={decisionTypes1} />
            <DropdownBlock title={t('DropDownMenuSettings.DecisionType', 'نوع القرار')} items={decisionTypes2} />
            <DropdownBlock title={t('DropDownMenuSettings.DecisionType', 'نوع القرار')} items={ticketStatus} />
        </div>
    );
}
