import { useState } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "../../Components/Ui/Drawer";
import Button from "../../Components/Ui/Button";
import AddCategoryModal from "./AddCategoryModal";

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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSaveCategory = (data: any) => {
    console.log("Saving data...", data);
    setIsAddModalOpen(false);
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
                                onClick={() => console.log("Delete Category:", category.name)}
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
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        {t("Services.Categories.AddCategory")}
                    </Button>
                </div>
            </div>
        </Drawer>
        <AddCategoryModal 
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSaveCategory} 
        />
            </>
    );
}
