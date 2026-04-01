import { useTranslation } from 'react-i18next';
import Header from '../../../Components/Ui/Header';
import DropdownBlock from './components/DropdownBlock';
import { useGetDropDownMenuSettingsDataQuery } from '../../../store/Api/DropDownMenuSettings/useDropDownMenuSettingsApi';

export default function DropDownMenuSettings() {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const { data: automationType, isLoading: isLoadingAutomationType } = useGetDropDownMenuSettingsDataQuery('automation_type');
    const { data: targetBusiness, isLoading: isLoadingTargetBusiness } = useGetDropDownMenuSettingsDataQuery('target_business');
    const { data: issueType, isLoading: isLoadingIssueType } = useGetDropDownMenuSettingsDataQuery('issue_type');
    const { data: decisionTypes, isLoading: isLoadingDecisionTypes } = useGetDropDownMenuSettingsDataQuery('decision_type');
    const { data: tools, isLoading: isLoadingTools } = useGetDropDownMenuSettingsDataQuery('tools');

    return (
        <div className="flex flex-col gap-6" dir={dir}>
            <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
                <Header title={t('DropDownMenuSettings.Title', 'إعدادات المنصة')} />
            </div>

            <DropdownBlock 
                title={t('DropDownMenuSettings.ServiceType', 'نوع الأوتوميشن')} 
                items={automationType?.data?.data} 
                categoryKey="automation_type" 
                isLoading={isLoadingAutomationType}
            />
            <DropdownBlock 
                title={t('DropDownMenuSettings.ProblemType', 'نوع المشكلة')} 
                items={issueType?.data?.data} 
                categoryKey="issue_type" 
                isLoading={isLoadingIssueType}
            />
            <DropdownBlock 
                title={t('DropDownMenuSettings.DecisionType', 'البزنس المستهدف')} 
                items={targetBusiness?.data?.data} 
                categoryKey="target_business" 
                isLoading={isLoadingTargetBusiness}
            />
            <DropdownBlock 
                title={t('DropDownMenuSettings.DecisionType', 'نوع القرار')} 
                items={decisionTypes?.data?.data} 
                categoryKey="decision_type" 
                isLoading={isLoadingDecisionTypes}
            />
            <DropdownBlock 
                title={t('DropDownMenuSettings.DecisionType', 'الأدوات المستخدمة')} 
                items={tools?.data?.data} 
                categoryKey="tools" 
                isLoading={isLoadingTools}
            />
        </div>
    );
}
