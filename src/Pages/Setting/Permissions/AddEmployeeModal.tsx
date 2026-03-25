import { useTranslation } from "react-i18next";
import Modal from "../../../Components/Ui/Modal";
import { Input } from "../../../Components/Ui/Input";
import { useState } from "react";

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
    const { t } = useTranslation();
    const [selectedRole, setSelectedRole] = useState("SuperAdmin");

    const roles = ["SuperAdmin", "Support", "Finance"];

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md" title={t("Permissions.AddEmployeeModalTitle")}>
            <div className="flex flex-col gap-6">

                <div className="space-y-4">
                    <Input
                        label={t("Permissions.EmployeeNameLabel")}
                        placeholder={t("Permissions.EmployeeNamePlaceholder")}
                        className="!mb-0"
                        labelClassName="text-sm font-semibold text-[#101828] !text-[14px]"
                        inputClassName="!rounded-[10px] border-[#E5E7EB]"
                    />
                    <Input
                        label={t("Permissions.EmployeeEmailLabel")}
                        placeholder={t("Permissions.EmployeeEmailPlaceholder")}
                        className="!mb-0"
                        labelClassName="text-sm font-bold text-gray-700 !text-[14px]"
                        inputClassName="!rounded-[10px] border-[#E5E7EB]"
                    />
                </div>

                {/* Role Selection */}
                <div className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`flex-1 min-w-[100px] py-2.5 rounded-[10px] font-semibold transition-all ${selectedRole === role
                                ? "bg-greenDark text-white shadow-md"
                                : "bg-[#EFEFEF] text-greenDark hover:bg-gray-200"
                                }`}
                        >
                            {t(`Permissions.${role}`)}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4">
                    <button
                        className="flex-1 py-3 px-6 bg-greenDark text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg"
                    >
                        {t("Permissions.AddEmployeeButton")}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-6 border-2 border-[#D1D5DC] rounded-full text-[#364153] font-semibold hover:bg-gray-50 transition-all"
                    >
                        {t("Permissions.Cancel")}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
