import { X, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "../../Components/Ui/Input";
import ImageUpload from "../../Components/Ui/ImageUpload";
import { useState, useEffect } from "react";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    loading?: boolean;
    category?: any;
}

export default function AddCategoryModal({
    isOpen,
    onClose,
    onSave,
    loading = false,
    category = null,
}: AddCategoryModalProps) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language || 'ar';
    const [name, setName] = useState({ ar: "", en: "" });
    const [description, setDescription] = useState({ ar: "", en: "" });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (category) {
            setName({
                ar: category.name_ar || category.name || "",
                en: category.name_en || category.name || ""
            });
            setDescription({
                ar: category.description_ar || category.description || "",
                en: category.description_en || category.description || ""
            });
        } else {
            setName({ ar: "", en: "" });
            setDescription({ ar: "", en: "" });
            setImage(null);
        }
    }, [category, isOpen]);

    const handleSave = () => {
        onSave({
            name,
            description,
            image
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-[20px] w-full max-w-[550px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <button
                    onClick={onClose}
                    className={`absolute top-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200 hover:text-red-500 transition-colors ${lang === "en" ? "right-6" : "left-6"}`}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col mt-4">
                    <h2 className="text-[24px] font-bold mb-6 text-greenDark text-start">
                        {category ? t("Services.Categories.EditCategory") : t("Services.Categories.AddCategory")}
                    </h2>
                    <form className="space-y-5 text-start" dir={lang === "ar" ? "rtl" : "ltr"}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={name.ar}
                                onChange={(e) => setName({ ...name, ar: e.target.value })}
                                label={`${t("Services.Categories.CategoryTitle")} (AR)`}
                                placeholder={t("Services.Categories.CategoryTitlePlaceholder")}
                                labelClassName="!text-[15px] !font-semibold !text-blackq"
                            />
                            <Input
                                value={name.en}
                                onChange={(e) => setName({ ...name, en: e.target.value })}
                                label={`${t("Services.Categories.CategoryTitle")} (EN)`}
                                placeholder="Enter category title..."
                                labelClassName="!text-[15px] !font-semibold !text-blackq"
                            />
                        </div>

                        {/* Description*/}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="flex flex-col gap-1 text-start">
                                <label className="text-blackq font-semibold text-[15px] mb-2">
                                    {t("Services.Categories.CategoryDescription")} (AR)
                                </label>
                                <textarea
                                    value={description.ar}
                                    onChange={(e) => setDescription({ ...description, ar: e.target.value })}
                                    rows={3}
                                    className="w-full p-3 outline-none border border-[#909090] focus:border-main rounded-2xl bg-white transition-all text-[15px] resize-none"
                                    placeholder={t("Services.Categories.CategoryDescriptionPlaceholder")}
                                />
                            </div>
                            <div className="flex flex-col gap-1 text-start">
                                <label className="text-blackq font-semibold text-[15px] mb-2">
                                    {t("Services.Categories.CategoryDescription")} (EN)
                                </label>
                                <textarea
                                    value={description.en}
                                    onChange={(e) => setDescription({ ...description, en: e.target.value })}
                                    rows={3}
                                    className="w-full p-3 outline-none border border-[#909090] focus:border-main rounded-2xl bg-white transition-all text-[15px] resize-none"
                                    placeholder="Write Description in english..."
                                />
                            </div>
                        </div>

                        {/* Upload image*/}
                        <div className="space-y-2 text-start">
                            <ImageUpload
                                onImageSelect={(file) => setImage(file)}
                                initialImage={category?.image_url}
                                label={t("Services.Categories.CategoryImage")}
                                className="!h-32"
                                previewClassName="!h-32"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-4 w-full pt-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading || !name.ar.trim() || !name.en.trim()}
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
