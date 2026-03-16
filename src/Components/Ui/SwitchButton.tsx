import { useTranslation } from "react-i18next";

interface SwitchButtonProps {
    checked: boolean;
    onChange: () => void;
}

export default function SwitchButton({ checked, onChange }: SwitchButtonProps) {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'ar' || localStorage.getItem('i18nextLng') === 'ar';

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? "bg-[#2B7B4C]" : "bg-gray-200"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked
                    ? (isRtl ? "-translate-x-6" : "translate-x-6")
                    : (isRtl ? "-translate-x-1" : "translate-x-1")
                    }`}
            />
        </button>
    );
}
