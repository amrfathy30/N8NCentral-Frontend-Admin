import { useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";
import Button from "../../Components/Ui/Button";
import ConfirmModal from "../../Components/Ui/ConfirmModal";

interface Category {
    id: number;
    name: string;
    servicesCount: number;
}

interface CategoriesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const mockCategories: Category[] = [
    { id: 1, name: "التسويق", servicesCount: 120 },
    { id: 2, name: "التسويق", servicesCount: 120 },
    { id: 3, name: "التسويق", servicesCount: 120 },
    { id: 4, name: "التسويق", servicesCount: 120 },
    { id: 5, name: "التسويق", servicesCount: 120 },
];

export default function CategoriesDrawer({ isOpen, onClose }: CategoriesDrawerProps) {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleDeleteClick = (category: Category) => {
        setSelectedCategory(category);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        console.log("Deleting:", selectedCategory?.name);
        setIsConfirmOpen(false);
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
                {mockCategories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-5 space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-greenDark font-semibold text-[19px]">{category.name}</span>
                            <span className="text-[#000000] text-[17px] font-semibold">
                                {category.servicesCount} {t("Services.Categories.Service")}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                className="flex-1 !py-2 !text-[14px] !rounded-[4px]"
                                onClick={() => console.log("View Services for:", category.name)}
                            >
                                {t("Services.Categories.ViewServices")}
                            </Button>
                            <Button
                                className="flex-1 !bg-[#EF4444] !py-2 !text-[14px] !rounded-[4px] hover:!bg-red-600"
                                onClick={() => handleDeleteClick(category)}
                            >
                                {t("Services.Categories.DeleteCategory")}
                            </Button>
                        </div>
                    </div>
                ))}

                {/* footer  */}
                <div className="pt-4 pb-6">
                    <Button
                        className="w-full !py-2"
                        onClick={() => console.log("Add Category clicked")}
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
                title={t("Services.Categories.DeleteCategory")} 
                message={t("Services.Categories.DeleteConfirmMessage", { name: selectedCategory?.name })}
                description={t("Services.Categories.DeleteWarning")}
            />
        </>
    );
}
