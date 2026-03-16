import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 py-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-main hover:text-main disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
            >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all ${currentPage === page
                            ? "bg-main text-white shadow-lg shadow-main/20 hover:bg-greenDark"
                            : "text-[#4A5565] hover:border hover:text-greenDark hover:border-greenDark"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:border-main hover:text-main disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
            >
                {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>
    );
}