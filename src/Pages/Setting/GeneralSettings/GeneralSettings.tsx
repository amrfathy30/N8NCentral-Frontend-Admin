import { useTranslation } from 'react-i18next';
import Header from '../../../Components/Ui/Header';
import Plans from './components/Plans';
import Commissions from './components/Commissions';
import MessageTemplates from './components/MessageTemplates';
import SecuritySetting from './components/SecuritySetting';
import TermsAndConditions from './components/TermsAndConditions';
import { useGetPlansDataQuery } from '../../../store/Api/Setting/usePlansApi';

export default function GeneralSettings() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const { data: plansData, isLoading } = useGetPlansDataQuery()

  return (
    <div className="flex flex-col gap-6" dir={dir}>
      {/* Header */}
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-2">
        <Header title={t('GeneralSettings.Title')} />
        <button className="bg-greenDark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all w-fit">
          {t('GeneralSettings.SaveAllChanges')}
        </button>
      </div>

      {/* Commissions Settings */}
      <Commissions />

      {/* Plans Settings */}
      <Plans plansData={plansData} loading={isLoading} />

      {/* Email & Message Templates Settings */}
      <MessageTemplates />

      {/* Security Settings */}
      <SecuritySetting />

      {/* Terms and Conditions */}
      <TermsAndConditions />
    </div>
  );
}
