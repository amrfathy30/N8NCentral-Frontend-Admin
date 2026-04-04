import Modal from './Modal';
import { Input } from './Input';
import { Ban } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BanModalProps {
    isBanModalOpen: boolean;
    setIsBanModalOpen: (value: boolean) => void;
    banReason: string;
    setBanReason: (value: string) => void;
    handleConfirmBan: () => void;
    isBanning?: boolean;
}

export default function BanModal({
    isBanModalOpen,
    setIsBanModalOpen,
    banReason,
    setBanReason,
    handleConfirmBan,
    isBanning
}: BanModalProps) {
    const { t } = useTranslation();

    const handleClose = () => {
        setIsBanModalOpen(false);
        setBanReason("");
    };

    return (
        <Modal
            isOpen={isBanModalOpen}
            onClose={handleClose}
            title={t("Merchants.ConfirmBan")}
        >
            <div className="flex flex-col gap-6 pt-4">
                <Input
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder={t("Merchants.BanReasonPlaceholder")}
                    label={t("Merchants.BanReason")}
                    icon={Ban}
                />
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={handleConfirmBan}
                        disabled={!banReason.trim() || isBanning}
                        className="flex-1 py-2 rounded-[10px] bg-[#FB2C36] hover:bg-[#d9222b] shadow-lg shadow-[#FB2C36]/20 text-white font-bold text-[18px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isBanning ? t("Common.loading") || "..." : t("Merchants.ConfirmBan")}
                    </button>
                    <button
                        onClick={handleClose}
                        className="flex-1 py-2 rounded-[10px] bg-[#D2D2D233] text-[#4A5565] text-[18px] border border-[#E5E7EB] hover:bg-gray-200 transition-all font-bold"
                    >
                        {t("Common.Cancel")}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
