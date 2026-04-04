import { useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";
import Button from "../../Components/Ui/Button";
import ConfirmModal from "../../Components/Ui/ConfirmModal";
import AddCategoryModal from "./AddCategoryModal";
import {
    useGetAllServicesCategoriesQuery,
    useDeleteServiceCategoryMutation,
    useCreateServiceCategoryMutation,
    useUpdateServiceCategoryMutation
} from "../../store/Api/Services/useServiceCategoriesApi";
import { showToastError, showToastSuccess } from "../../Components/Helper/toastHelper";
import { handleApiError } from "../../Components/Helper/handleApiError";


export default function CategoriesDrawer({
    isOpen,
    onClose,
    onSelectCategory
}: {
    isOpen: boolean;
    onClose: () => void;
    onSelectCategory: (category: any) => void;
}) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data: categoriesData, isLoading, refetch } = useGetAllServicesCategoriesQuery({ per_page: 50 });
    const categories = categoriesData?.data?.categories ?? [];

    const [deleteCategory, { isLoading: isDeleting }] = useDeleteServiceCategoryMutation();
    const [createCategory, { isLoading: isCreating }] = useCreateServiceCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateServiceCategoryMutation();

    const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState<any>(null);

    const handleDeleteClick = (category: any) => {
        if (category.services_count > 0) {
            showToastError(t("Services.Categories.CannotDeleteWithServices") || "لا يمكن حذف القسم لأنه يحتوي على خدمات مرتبطة به");
            return;
        }
        setSelectedCategory(category);
        setIsConfirmOpen(true);
    };

    const handleEditClick = (category: any) => {
        setSelectedCategoryToEdit(category);
        setIsAddModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedCategory) return;
        try {
            const res = await deleteCategory({ id: selectedCategory.id }).unwrap();
            showToastSuccess(res.message || t("Services.Categories.DeleteSuccess") || "تم حذف القسم بنجاح");
            setIsConfirmOpen(false);
            setSelectedCategory(null);
            refetch()
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleSaveCategory = async (data: any) => {
        const formData = new FormData();

        // Append name in both languages
        formData.append("name[ar]", data.name.ar);
        formData.append("name[en]", data.name.en);

        // Append description if both are provided
        if (data.description.ar) formData.append("description[ar]", data.description.ar);
        if (data.description.en) formData.append("description[en]", data.description.en);

        // Append image if provided
        if (data.image) formData.append("image", data.image);

        try {
            let res;
            if (selectedCategoryToEdit) {
                res = await updateCategory({ id: selectedCategoryToEdit.id, data: formData }).unwrap();
                showToastSuccess(res.message || t("Services.Categories.UpdateSuccess") || "تم تحديث القسم بنجاح");
            } else {
                res = await createCategory(formData).unwrap();
                showToastSuccess(res.message || t("Services.Categories.AddSuccess") || "تم إضافة القسم بنجاح");
            }
            refetch()
            setIsAddModalOpen(false);
            setSelectedCategoryToEdit(null);
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={t("Services.Categories.Title")}
                maxWidth="500px"
                side={dir === 'rtl' ? 'left' : 'right'}
            >
                <div className="space-y-4 pt-4">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500">{t("Common.loading")}</div>
                    ) : (
                        categories.map((category: any) => (
                            <div
                                key={category.id}
                                className="bg-white p-5 space-y-4 border border-gray-100 rounded-xl shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        {/* {category.image_url && ( */}
                                        <img
                                            src={category.image_url}
                                            onError={(e) => {
                                                e.currentTarget.src = "/default.png"
                                            }}
                                            alt={category.name_display || category.name}
                                            className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
                                        />
                                        {/* )} */}
                                        <span className="text-greenDark font-bold text-[19px]">{category.name_display || category.name}</span>
                                    </div>
                                    <span className="text-[#000000] text-[17px] font-semibold">
                                        {category.services_count} {t("Services.Categories.Service")}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1 !py-2 !px-2 !text-[14px] !rounded-[8px]"
                                        onClick={() => {
                                            onSelectCategory(category);
                                            onClose();
                                        }}
                                    >
                                        {t("Services.Categories.ViewServices")}
                                    </Button>
                                    <Button
                                        className="flex-1 !px-2 !bg-[#F68713] !py-2 !text-[14px] !rounded-[8px] hover:!bg-orange-500"
                                        onClick={() => handleEditClick(category)}
                                    >
                                        {t("Common.Edit") || "تعديل"}
                                    </Button>
                                    <Button
                                        className="flex-1 !px-2 !bg-[#EF4444] !py-2 !text-[14px] !rounded-[8px] hover:!bg-red-600"
                                        onClick={() => handleDeleteClick(category)}
                                    >
                                        {t("Services.Categories.DeleteCategory")}
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* footer  */}
                    <div className="pt-4 pb-6">
                        <Button
                            className="w-full !py-3 !rounded-[12px] shadow-lg shadow-green-200"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            {t("Services.Categories.AddCategory")}
                        </Button>
                    </div>
                </div>
            </Drawer>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                isDanger={true}
                loading={isDeleting}
                title={t("Services.Categories.DeleteCategory")}
                message={t("Services.Categories.DeleteConfirmMessage", { name: selectedCategory?.name_display || selectedCategory?.name })}
                description={t("Services.Categories.DeleteWarning")}
            />

            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setSelectedCategoryToEdit(null);
                }}
                onSave={handleSaveCategory}
                loading={isCreating || isUpdating}
                category={selectedCategoryToEdit}
            />
        </>
    );
}
