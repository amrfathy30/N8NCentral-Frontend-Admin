import { UploadIcon } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    value?: File | null;
    acceptedTypes?: string;
    placeholder?: string;
    className?: string;
}

export default function FileUpload({
    onFileSelect,
    value,
    placeholder,
    acceptedTypes = "image/*,.pdf,.doc,.docx",
    className = "",
}: FileUploadProps) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileSelect(file);
    };

    return (
        <div className={className}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={acceptedTypes}
            />
            <div
                onClick={handleFileClick}
                className="border-2 border-dashed border-gray-200 rounded-[20px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-main hover:bg-main/5 transition-all group"
            >
                <div className="w-12 h-12 rounded-full flex items-center justify-center ">
                    <UploadIcon className="w-[48px] h-[48px] text-[#99A1AF]" />
                </div>
                <span className="font-semibold text-[#4A5565] text-[16px]">
                    {value ? value.name : placeholder}
                </span>
                <span className="text-[#6A7282] text-[14px]">
                    {t("sellerDashboard.services.FileType")}
                </span>
            </div>
        </div>
    );
}
