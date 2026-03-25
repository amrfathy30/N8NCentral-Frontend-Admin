import { useTranslation } from "react-i18next";
import Modal from "../../../Components/Ui/Modal";
import { useState } from "react";
import CustomCheckbox from "../../../Components/Ui/CustomCheckbox";
import { Input } from "../../../Components/Ui/Input";

interface Permission {
    name: string;
    granted: boolean;
}

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
    const { t } = useTranslation();
    const [roleName, setRoleName] = useState("");
    
    const [permissions, setPermissions] = useState<Permission[]>([
        { name: "Dashboard", granted: false },
        { name: "Users", granted: false },
        { name: "Services", granted: false },
        { name: "Orders", granted: false },
        { name: "Financials", granted: false },
        { name: "Analytics", granted: false },
    ]);

    const handleToggle = (name: string) => {
        setPermissions(prev => prev.map(p =>
            p.name === name ? { ...p, granted: !p.granted } : p
        ));
    };

    const handleCreate = () => {
        console.log("Creating new role:", roleName, permissions);
        onClose();
        setRoleName("");
        setPermissions(prev => prev.map(p => ({...p, granted: false})));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-3xl"
            title={t("Permissions.CreateRoleModalTitle")}
        >
            <div className="flex flex-col gap-6">
                {/* Role Name Input */}
                <div className="space-y-4">
                    <Input
                        label={t("Permissions.RoleNameLabel")}
                        placeholder={t("Permissions.RoleNamePlaceholder")}
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        className="!mb-0"
                        labelClassName="text-sm font-semibold text-[#101828] !text-[14px]"
                        inputClassName="!rounded-[10px] border-[#E5E7EB]"
                    />
                </div>
                
                <h3 className="font-bold text-gray-800 text-lg mt-2">{t("Permissions.PermissionsManagement")}</h3>

                {/* Permissions Grid */}
                <div className="grid grid-cols-2 md:grid-cols-7 gap-y-2 gap-x-2" dir="rtl">
                    {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-start gap-3 text-[#344054]">
                            <CustomCheckbox
                                id={`new-perm-${permission.name}-${index}`}
                                checked={permission.granted}
                                onChange={() => handleToggle(permission.name)}
                                label={<span className="text-xs font-semibold">{t(`Permissions.${permission.name}`)}</span>}
                            />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleCreate}
                        disabled={!roleName.trim()}
                        className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all shadow-lg ${
                            roleName.trim() 
                                ? "bg-greenDark text-white hover:bg-opacity-90" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {t("Permissions.CreateRoleButton")}
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
