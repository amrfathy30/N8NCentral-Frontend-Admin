import Select from "react-select";
import { useTranslation } from "react-i18next";

interface CustomSelectProps {
    options: { value: string; label: string }[];
    placeholder?: string;
    value?: { value: string; label: string } | null;
    onChange?: (option: any) => void;
    className?: string;
    isSearchable?: boolean;
}

export default function CustomSelect({ options, placeholder, value, onChange, className, isSearchable = false }: CustomSelectProps) {
    const { i18n } = useTranslation();
    const isAr = i18n.language === "ar";

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            borderColor: state.isFocused ? "#EAECF0" : "#EAECF0",
            borderRadius: "10px",
            height: "44px",
            backgroundColor: "#F9FAFB",
            boxShadow: "none",
            border: "1px solid #EAECF0",
            paddingLeft: isAr ? "8px" : "8px",
            paddingRight: isAr ? "8px" : "8px",
            "&:hover": { borderColor: "#EAECF0" },
            cursor: "pointer",
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused
                ? "#F6FEF9"
                : state.isSelected
                    ? "#F6FEF9"
                    : "white",
            color: state.isSelected ? "#2B7B4C" : "#101828",
            cursor: "pointer",
            fontSize: "14px",
            ':active': {
                backgroundColor: state.isSelected ? '#F6FEF9' : '#F6FEF9',
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: "#667085",
            fontSize: "14px",
        }),
        singleValue: (base: any) => ({
            ...base,
            color: "#101828",
            fontSize: "14px",
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 10,
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: "#667085",
        }),
        indicatorSeparator: () => ({ display: "none" }),
    };

    return (
        <div className={`w-full ${className}`}>
            <Select
                options={options}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                isSearchable={isSearchable}
                styles={customStyles}
                menuPortalTarget={document.body}
            />
        </div>
    );
}
