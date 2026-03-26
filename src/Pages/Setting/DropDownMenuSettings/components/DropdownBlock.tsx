import { X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../../../Components/Ui/Input';
import { useTranslation } from 'react-i18next';
import Button from '../../../../Components/Ui/Button';

export interface DropdownItem {
    id: string;
    name: string;
}

interface DropdownBlockProps {
    title: string;
    items: DropdownItem[];
}

export default function DropdownBlock({ title, items: initialItems }: DropdownBlockProps) {
    const { t } = useTranslation();
    const [items, setItems] = useState<DropdownItem[]>(initialItems);
    const [newItemName, setNewItemName] = useState('');

    const handleAdd = () => {
        if (!newItemName.trim()) return;
        setItems([...items, { id: Date.now().toString(), name: newItemName }]);
        setNewItemName('');
    };

    const handleDelete = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleChange = (id: string, value: string) => {
        setItems(items.map(item => item.id === id ? { ...item, name: value } : item));
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-[#000000] mb-4">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {items.map(item => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <div className="flex-1">
                            <Input
                                value={item.name}
                                onChange={(e) => handleChange(item.id, e.target.value)}
                                inputClassName="border border-[#E5E7EB] rounded-[10px] bg-white h-[46px] text-sm focus:border-greenDark"
                                className="!mb-0"
                            />
                        </div>

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors shrink-0 mb-4"
                        >
                            <X className="w-4 h-4 text-[#000000]" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-4 items-center mt-6 bg-[#F5F5F5] p-2 rounded-[17px]">
                <div className="flex-1">
                    <Input
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={t('DropDownMenuSettings.AddNew', 'إضافة نوع جديد')}
                        inputClassName="border border-[#D7D9DC] rounded-[10px] bg-[#F5F5F5] h-[46px] text-sm focus:border-greenDark"
                    />
                </div>
                <Button
                    onClick={handleAdd}
                    className="!py-2 !shrink-0"
                >
                    {t('DropDownMenuSettings.Add', 'إضافة')}
                </Button>
            </div>
        </div>
    );
}
