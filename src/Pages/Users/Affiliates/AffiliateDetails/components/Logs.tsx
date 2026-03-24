import { DetailItem } from '../../../../../Components/Ui/UserDetailLayout'

interface LogsProps {
    t: any;
}

export default function Logs({ t }: LogsProps) {
    return (
        <section className="space-y-4">
            <h3 className="text-[#027A48] text-[21px] font-bold">
                {t("AccountDetails.ActivityLog")}
            </h3>
            <div className="bg-[#fff] rounded-[12px] p-5">
                <div className="grid grid-cols-1 gap-y-5 gap-x-4">
                    <DetailItem label={t("AccountDetails.CreateRequest")} value="2024-06-18" />
                    <DetailItem label={t("AccountDetails.UpdatePhoneNumber")} value="A2024-06-12" />
                </div>
            </div>
        </section>)
}
