import { useTranslation } from "react-i18next";
import idImage from "../../../../public/id.png";
import Drawer from "../../../Components/Ui/Drawer";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function VerificationShow({ isOpen, onClose }: Props) {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "ar";

    const items = [
        { id: 1, label: t("Merchants.SelfieWithID") },
        { id: 2, label: t("Merchants.SelfieWithID") },
        { id: 3, label: t("Merchants.SelfieWithID") },
    ];

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={t("Merchants.Verification")}
            side={isRtl ? "left" : "right"}
            maxWidth="550px"
        >
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-5 border border-gray-50 space-y-4 text-center">
                        <p className="text-[18px] font-bold text-blackq">{item.label}</p>

                        <div className="rounded-xl overflow-hidden border border-gray-50">
                            <img
                                src={idImage}
                                alt="Identity"
                                className="w-full h-44 object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-greenDark text-white py-2.5 rounded-md text-sm font-bold hover:bg-[#1f704b] transition-all active:scale-[0.97]">
                                {t("Merchants.Approve")}
                            </button>
                            <button className="bg-[#E7000B] text-white py-2.5 rounded-md text-sm font-bold hover:bg-[#c11717] transition-all active:scale-[0.97]">
                                {t("Merchants.Reject")}
                            </button>
                        </div>

                    </div>
                ))}
                <div className="flex flex-col gap-3">
                    <button className="w-full bg-greenDark text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#1f704b] transition-all active:scale-[0.98] shadow-sm">
                        {t("Merchants.VerifyAction")}
                    </button>
                    <button className="w-full bg-[#E7000B] text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#c11717] transition-all active:scale-[0.98]">
                        {t("Merchants.Reject")}
                    </button>
                </div>
            </div>
        </Drawer>
    );
}