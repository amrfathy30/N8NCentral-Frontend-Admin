import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";

interface OrderDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    order: any;
}

export default function OrderDetailsDrawer({ isOpen, onClose, order }: OrderDetailsDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const DetailItem = ({ label, value, className = "" }: { label: string; value: string; className?: string }) => (
        <div className={`flex items-center flex-wrap gap-2 ${className}`}>
            <span className="text-greenDark text-[14px] font-bold">{label}</span>
            <span className="text-greenDark text-[14px] font-semibold truncate">{value}</span>
        </div>
    );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={t("Orders.OrderDetails.Title")}
            maxWidth="550px"
            side={dir === 'rtl' ? 'left' : 'right'}
        >
            <div className="space-y-8">
                
                <section className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-[12px] p-4">
                        <DetailItem label={t("Orders.OrderDetails.OrderNumber")} value="#ORD-45892" />
                        <DetailItem label={t("Orders.OrderDetails.Status")} value={t("Orders.InExecution")} />
                        <DetailItem label={t("Orders.OrderDetails.PurchaseDate")} value="يونيو 2024" />
                        <DetailItem label={t("Orders.OrderDetails.PurchaseTime")} value="14:32" />
                        <DetailItem label={t("Orders.OrderDetails.PaymentMethod")} value="طريقة الدفع" />
                        <DetailItem label={t("Orders.OrderDetails.Source")} value="الموقع" />
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-greenDark text-[21px] font-bold pb-2">
                        {t("Orders.OrderDetails.BuyerInfo")}
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-[12px] p-4">
                        <DetailItem label={t("Orders.OrderDetails.BuyerName")} value="أحمد خالد" />
                        <DetailItem label={t("Orders.OrderDetails.Phone")} value="20123456789" />
                        <DetailItem label={t("Orders.OrderDetails.RegistrationDate")} value="2024-05-12" />
                        <DetailItem label={t("Orders.OrderDetails.LastActivity")} value="منذ 3 ساعات" />
                        <DetailItem label={t("Orders.OrderDetails.Email")} value="abc@123.com" />
                        <DetailItem label={t("Orders.OrderDetails.Country")} value="مصر" />
                        <DetailItem label={t("Orders.OrderDetails.PreviousOrders")} value="8" />
                        <DetailItem label={t("Orders.OrderDetails.TotalSpent")} value="$1,420"/>
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-greenDark text-[21px] font-bold pb-2">
                        {t("Orders.OrderDetails.ServiceInfo")}
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-[12px] p-4">
                        <DetailItem label={t("Orders.OrderDetails.ServiceName")} value="أتمتة رسائل واتساب احترافية" />
                        <DetailItem label={t("Orders.OrderDetails.Merchant")} value="شركة التقنية الحديثة" />
                        <DetailItem label={t("Orders.OrderDetails.BasePrice")} value="$200" />
                        <DetailItem label={t("Orders.OrderDetails.ExecutionPeriod")} value="3 أيام" />
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-greenDark text-[21px] font-bold pb-2">
                        {t("Orders.OrderDetails.AdditionalServices")}
                    </h3>
                    <div className="bg-white rounded-[12px] p-4 flex justify-center text-greenDark">
                        {t("Orders.OrderDetails.NoAdditionalServices")}
                    </div>
                </section>
            </div>
        </Drawer>
    );
}