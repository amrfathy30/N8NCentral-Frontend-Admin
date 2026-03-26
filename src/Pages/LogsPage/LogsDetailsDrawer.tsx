import Drawer from "../../Components/Ui/Drawer";
import { useTranslation } from "react-i18next";

interface LogsDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logData: any;
}

export default function LogsDetailsDrawer({ isOpen, onClose, logData }: LogsDetailsDrawerProps) {
  const { t } = useTranslation();

  if (!logData) return null;

  const activities = [
    { id: 1, title: "إنشاء طلب جديد", date: "2024-06-18" },
    { id: 2, title: "تحديث رقم الهاتف", date: "2024-06-12" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t("Logs.Tabs.Activity")}
      maxWidth="450px"
    >
      <div className="mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <div className="space-y-8 relative">

            {activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center group">
                
                <div className="flex items-center gap-3">
                  <span className="text-greenDark text-[18px] font-bold">
                    {activity.title}
                  </span>
                </div>

                <span className="text-greenDark text-[18px] font-medium">
                  {activity.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}