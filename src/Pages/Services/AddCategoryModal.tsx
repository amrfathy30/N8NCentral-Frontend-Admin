import { X, ImagePlus, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "../../Components/Ui/Input"; 

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    loading?: boolean;
}

export default function AddCategoryModal({
    isOpen,
    onClose,
    onSave,
    loading = false,
}: AddCategoryModalProps) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'ar';

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-[20px] w-full max-w-[500px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className={`absolute top-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200 hover:text-red-500 transition-colors ${lang === "en" ? "right-6" : "left-6"}`}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col mt-4">
                    <h2 className="text-[24px] font-bold mb-6 text-greenDark">
                        {t("Services.Categories.AddCategory")}
                    </h2>
                    <form className="space-y-5 text-start" dir={lang === "ar" ? "rtl" : "ltr"}>
                        <Input
                            label={t("Services.Categories.CategoryTitle")}
                            placeholder={t("Services.Categories.CategoryTitlePlaceholder")}
                            labelClassName="!text-[16px] !font-semibold !text-blackq"
                        />
                        {/* Description*/}
                        <div className="flex flex-col gap-1">
                            <label className="text-blackq font-semibold text-[16px] mb-2">
                                {t("Services.Categories.CategoryDescription")}
                            </label>
                            <textarea 
                                rows={3}
                                className="w-full p-3 outline-none border border-[#909090] focus:border-main rounded-2xl bg-white transition-all text-[16px] resize-none"
                                placeholder={t("Services.Categories.CategoryDescriptionPlaceholder")}
                            />
                        </div>
                        {/* Upload image*/}
                        <div className="space-y-2">
                            <label className="text-[16px] font-semibold text-blackq">
                                {t("Services.Categories.CategoryImage")}
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#909090] hover:border-main rounded-[15px] bg-[#F9FAFB] hover:bg-[#F3F4F6] hover:border-greenPrimary cursor-pointer transition-all group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImagePlus size={32} className="text-[#9CA3AF] group-hover:text-main mb-2" />
                                    <p className="text-[14px] text-[#6B7280]">{t("Services.Categories.UploadImage")}</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-4 w-full pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    onSave({});
                                    onClose();
                                }}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-[10px] bg-[#2B7B4C] hover:bg-[#23663f] text-white font-bold text-[18px] shadow-lg shadow-[#2B7B4C]/20 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : t("Services.Categories.Save")}
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] font-bold text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all"
                            >
                                {t("Services.Categories.Cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}