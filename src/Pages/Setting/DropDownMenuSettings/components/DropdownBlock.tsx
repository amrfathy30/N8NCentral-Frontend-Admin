import { X, Plus, Pencil } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../../../Components/Ui/Input';
import { useTranslation } from 'react-i18next';
import Button from '../../../../Components/Ui/Button';
import Modal from '../../../../Components/Ui/Modal';
import ConfirmModal from '../../../../Components/Ui/ConfirmModal';
import {
    useAddDropDownMenuSettingsDataMutation,
    useDeleteDropDownMenuSettingsDataMutation,
    useUpdateDropDownMenuSettingsDataMutation
} from '../../../../store/Api/DropDownMenuSettings/useDropDownMenuSettingsApi';
import { showToastSuccess, showToastError } from '../../../../Components/Helper/toastHelper';
import DropDownMenuSettingSkeleton from '../../../../Components/Skeleton/Setting/DropDownMenuSettingSkeleton';
import type { DropdownBlockProps, DropdownItem } from '../../../../types/setting';

export default function DropdownBlock({ title, items, categoryKey, isLoading = false }: DropdownBlockProps) {
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DropdownItem | null>(null);
    const [newNameEn, setNewNameEn] = useState('');
    const [newNameAr, setNewNameAr] = useState('');

    const [itemToDelete, setItemToDelete] = useState<string | number | null>(null);

    const [addCategoryItem, { isLoading: isAdding }] = useAddDropDownMenuSettingsDataMutation();
    const [updateCategoryItem, { isLoading: isUpdating }] = useUpdateDropDownMenuSettingsDataMutation();
    const [deleteCategoryItem, { isLoading: isDeleting }] = useDeleteDropDownMenuSettingsDataMutation();

    const openAddModal = () => {
        setEditingItem(null);
        setNewNameEn('');
        setNewNameAr('');
        setIsModalOpen(true);
    };

    const openEditModal = (item: DropdownItem) => {
        setEditingItem(item);
        if (typeof item.name === 'object') {
            setNewNameEn(item.name.en || '');
            setNewNameAr(item.name.ar || '');
        } else {
            setNewNameEn(item.name || '');
            setNewNameAr(item.name || '');
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!newNameEn.trim() || !newNameAr.trim()) {
            showToastError(t('DropDownMenuSettings.FillAllFields', 'يرجى ملء جميع الحقول'));
            return;
        }

        const payload = {
            key: categoryKey,
            data: {
                name: {
                    en: newNameEn,
                    ar: newNameAr,
                }
            }
        };

        try {
            if (editingItem) {
                await updateCategoryItem({
                    ...payload,
                    masterData: editingItem.id!.toString()
                }).unwrap();
                showToastSuccess(t('DropDownMenuSettings.UpdateSuccess', 'تم التحديث بنجاح'));
            } else {
                await addCategoryItem(payload).unwrap();
                showToastSuccess(t('DropDownMenuSettings.AddSuccess', 'تمت الإضافة بنجاح'));
            }

            setIsModalOpen(false);
            setNewNameEn('');
            setNewNameAr('');
            setEditingItem(null);
        } catch (error: any) {
            const errorMsg = error?.data?.message || (editingItem ? t('DropDownMenuSettings.UpdateError', 'حدث خطأ أثناء التحديث') : t('DropDownMenuSettings.AddError', 'حدث خطأ أثناء الإضافة'));
            showToastError(errorMsg);
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            await deleteCategoryItem({ key: categoryKey, masterData: itemToDelete.toString() }).unwrap();
            showToastSuccess(t('DropDownMenuSettings.DeleteSuccess', 'تم الحذف بنجاح'));
            setItemToDelete(null);
        } catch (error: any) {
            showToastError(error?.data?.message || t('DropDownMenuSettings.DeleteError', 'حدث خطأ أثناء الحذف'));
        }
    };

    const displayItems = Array.isArray(items) ? items : (items && (items as any).data && Array.isArray((items as any).data)) ? (items as any).data : [];

    const getItemName = (item: DropdownItem) => {
        if (typeof item.name === 'string') return item.name;
        if (item.name && typeof item.name === 'object') {
            const en = item.name.en || '';
            const ar = item.name.ar || '';
            if (en && ar) {
                return `${en} / ${ar}`;
            }
            return en || ar || '';
        }
        return '';
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-extrabold text-[#000000]">
                    {title}
                </h2>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 text-main font-bold hover:opacity-80 transition-all"
                >
                    <Plus size={20} />
                    <span>{t('DropDownMenuSettings.AddNew', 'إضافة جديد')}</span>
                </button>
            </div>

            {isLoading ? (
                <DropDownMenuSettingSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {displayItems.map((item: any) => {
                        const itemId = item.id;
                        return (
                            <div key={itemId} className="flex gap-2 items-center">
                                <div className="flex-1">
                                    <Input
                                        value={getItemName(item)}
                                        readOnly
                                        inputClassName="border border-[#E5E7EB] rounded-[10px] bg-gray-50 h-[46px] text-sm cursor-default"
                                        className="!mb-0"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="text-gray-400 hover:text-main transition-colors shrink-0"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setItemToDelete(itemId)}
                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${editingItem ? t('DropDownMenuSettings.EditItem', 'تعديل العنصر') : t('DropDownMenuSettings.AddNewItem', 'إضافة عنصر جديد')} (${title})`}
            >
                <div className="space-y-4">
                    <Input
                        label={t('DropDownMenuSettings.NameEn', 'الاسم (EN)')}
                        value={newNameEn}
                        onChange={(e) => setNewNameEn(e.target.value)}
                        placeholder="Enter name in English"
                    />
                    <Input
                        label={t('DropDownMenuSettings.NameAr', 'الاسم (AR)')}
                        value={newNameAr}
                        onChange={(e) => setNewNameAr(e.target.value)}
                        placeholder="أدخل الاسم بالعربية"
                    />
                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={handleSave}
                            loading={isAdding || isUpdating}
                            className="flex-1"
                        >
                            {editingItem ? t('Common.Update', 'تحديث') : t('DropDownMenuSettings.Add', 'إضافة')}
                        </Button>
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 !bg-gray-100 !text-gray-700"
                        >
                            {t('Common.Cancel', 'إلغاء')}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title={t('DropDownMenuSettings.DeleteConfirmTitle', 'تأكيد الحذف')}
                message={t('DropDownMenuSettings.DeleteConfirmMessage', 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟')}
                isDanger
                loading={isDeleting}
            />
        </div>
    );
}
