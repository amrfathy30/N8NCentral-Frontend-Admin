import { useTranslation } from "react-i18next";
import Modal from "../../../Components/Ui/Modal";
import { useState, useEffect } from "react";
import CustomCheckbox from "../../../Components/Ui/CustomCheckbox";

interface Permission {
    name: string;
    granted: boolean;
}

interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}

interface EditRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: Role | null;
}

export default function EditRoleModal({ isOpen, onClose, role }: EditRoleModalProps) {
    const { t } = useTranslation();
    const [permissions, setPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        if (role) {
            setPermissions(role.permissions);
        }
    }, [role]);

    const handleToggle = (name: string) => {
        setPermissions(prev => prev.map(p =>
            p.name === name ? { ...p, granted: !p.granted } : p
        ));
    };

    if (!role) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-xl"
            title={`${t("Permissions.EditRoleModalTitle")} ${t(`Permissions.${role.id}`)}`}
        >
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-2">
                    {permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-start gap-3 text-[#000]">
                            <CustomCheckbox
                                id={`perm-${permission.name}-${index}`}
                                checked={permission.granted}
                                onChange={() => handleToggle(permission.name)}
                                label={<span className="text-sm">{t(`Permissions.${permission.name}`)}</span>}
                            />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                    <button
                        className="flex-1 py-3 px-6 bg-greenDark text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg"
                        onClick={() => {
                            console.log("Saving permissions for", role.id, permissions);
                            onClose();
                        }}
                    >
                        {t("Permissions.Save")}
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
