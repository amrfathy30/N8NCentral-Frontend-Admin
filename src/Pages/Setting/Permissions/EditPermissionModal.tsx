import { useTranslation } from "react-i18next";
import Modal from "../../../Components/Ui/Modal";
import { useState, useEffect } from "react";
import { Input } from "../../../Components/Ui/Input";

interface PermissionItem {
    id: string;
    name: string;
}

interface EditPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    permission: PermissionItem | null;
}

export default function EditPermissionModal({ isOpen, onClose, permission }: EditPermissionModalProps) {
    const { t } = useTranslation();
    const [permissionName, setPermissionName] = useState("");
    
    useEffect(() => {
        if (permission) {
            setPermissionName(t(`Permissions.${permission.name}`) || permission.name);
        } else {
            setPermissionName("");
        }
    }, [permission, t]);

    const handleSave = () => {
        console.log("Saving permission name:", permissionName);
        onClose();
    };

    if (!permission) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-md"
            title={t("Permissions.EditPermissionTitle")}
        >
            <div className="flex flex-col gap-6">
                <div className="space-y-4">
                    <Input
                        label={t("Permissions.EditPermissionNameLabel")}
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        className="!mb-0"
                        labelClassName="text-sm font-semibold text-[#101828] !text-[14px]"
                        inputClassName="!rounded-[10px] border-[#E5E7EB]"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handleSave}
                        disabled={!permissionName.trim()}
                        className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all shadow-lg ${
                            permissionName.trim() 
                                ? "bg-greenDark text-white hover:bg-opacity-90" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
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
