import { Check } from "lucide-react";

export default function RoleCard({ role, onEdit, onDelete, t }: { role: any, onEdit: (id: string) => void, onDelete: (id: string) => void, t: (key: string) => string }) {
    return (
        <div className="custom-card border !border-[#E5E7EB] !rounded-[12px] flex flex-col gap-4 !p-4 min-w-[280px] flex-1">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">{t(`Permissions.${role.id}`)}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(role.id)}
                        className="text-black font-extrabold hover:border-greenDark transition-colors p-1 border border-[#DDDDDD] rounded-[10px]"
                    >
                        <span className="text-[12px] px-2 block">{t("Permissions.Edit")}</span>
                    </button>
                    <button
                        onClick={() => onDelete(role.id)}
                        className="text-white bg-[#D32F2F] font-extrabold hover:bg-opacity-90 transition-colors p-1 rounded-[10px]"
                    >
                        <span className="text-[12px] px-2 block">{t("Permissions.delete")}</span>
                    </button>
                </div>
            </div>
            <div className="space-y-1">
                {role.permissions.map((permission: any, index: number) => (
                    <div key={index} className="flex items-center justify-start gap-2 text-sm text-gray-600">
                        <div className="w-4 h-4 flex items-center justify-center">
                            {permission.granted && <Check className="text-black" size={16} />}
                        </div>
                        <span>{t(`Permissions.${permission.name}`)}</span>
                    </div>
                ))}
            </div>
        </div>)
}
