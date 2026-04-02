import { useState } from "react";
import ConfirmModal from "../../../../../Components/Ui/ConfirmModal";

export default function Withdrawal({ withdrawalRequests, t, lang }: { withdrawalRequests: any[]; t: any; lang: string }) {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleApproveClick = (request: any) => {
        setSelectedRequest(request);
        setIsApproveModalOpen(true);
    };

    const handleConfirmApprove = () => {
        console.log("Approved ID:", selectedRequest?.id);
        setIsApproveModalOpen(false);
    };

    const handleRejectClick = (request: any) => {
        setSelectedRequest(request);
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = () => {
        console.log("Rejected ID:", selectedRequest?.id);
        setIsRejectModalOpen(false);
    };
    return (
        <div className="space-y-6">
            <h2 className="text-[20px] font-extrabold text-greenDark mb-4">
                {t("AccountDetails.WithdrawalRequests")}
            </h2>
            <div className="space-y-4">
                {withdrawalRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-[18px] p-6 shadow-sm border border-gray-100 relative">
                        {/* Status Badge */}
                        <div className={`absolute top-6 ${lang === 'ar' ? 'left-6' : 'right-6'}`}>
                            <span className="bg-[#F6871333] text-[#F68713] px-4 py-1.5 rounded-full text-[14px] font-semibold">
                                {request.status}
                            </span>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Request Title & Date */}
                            <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                <h3 className="text-greenDark text-[18px] font-bold mb-1">
                                    {t("AccountDetails.Withdrawal.WithdrawalRequest")} #{request.id}
                                </h3>
                                <p className="text-greenDark text-[14px] font-semibold">
                                    {t("AccountDetails.Withdrawal.RequestedOn")} {request.date}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-50 pb-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#606060] text-[14px] font-semibold">{t("AccountDetails.Withdrawal.AmountRequested")}</span>
                                    <span className="text-[#010101] text-[17px] font-semibold">{request.amount}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#606060] text-[14px] font-semibold">{t("AccountDetails.Withdrawal.PaymentMethod")}</span>
                                    <span className="text-[#010101] text-[17px] font-semibold">{request.method}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[#606060] text-[14px] font-semibold">{t("AccountDetails.Withdrawal.AvailableBalance")}</span>
                                    <span className="text-[#010101] text-[17px] font-semibold">{request.balance}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-start gap-3">
                                <button onClick={() => handleApproveClick(request)} className="bg-greenDark hover:bg-[#23663f] text-white px-8 py-2.5 rounded-[8px] font-semibold text-[16px] transition-all active:scale-[0.98]">
                                    {t("AccountDetails.Withdrawal.ApproveRequest")}
                                </button>
                                <button onClick={() => handleRejectClick(request)} className="bg-[#E7000B] hover:bg-[#b00707] text-white px-8 py-2.5 rounded-[8px] font-semibold text-[16px] transition-all active:scale-[0.98]">
                                    {t("AccountDetails.Withdrawal.RejectRequest")}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* approve modal */}
            <ConfirmModal
                isOpen={isApproveModalOpen}
                onClose={() => setIsApproveModalOpen(false)}
                onConfirm={handleConfirmApprove}
                title={t("AccountDetails.Withdrawal.ApproveTitle")}
                message={t("AccountDetails.Withdrawal.ApproveMessage")}
            />
            {/* Reject modal */}
            <ConfirmModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleConfirmReject}
                isDanger={true}
                title={t("AccountDetails.Withdrawal.RejectTitle")}
                message={t("AccountDetails.Withdrawal.RejectMessage")}
            />
        </div>)
}
