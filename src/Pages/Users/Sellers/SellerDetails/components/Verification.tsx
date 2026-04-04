import { Shield, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'
import { useApproveSellerDocumentMutation, useRejectSellerDocumentMutation } from '../../../../../store/Api/users/Sellers/useSellersApi';
import { toast } from 'sonner';
import { handleApiError } from '../../../../../Components/Helper/handleApiError';
import { useState } from 'react';
import ConfirmModal from '../../../../../Components/Ui/ConfirmModal';
import Modal from '../../../../../Components/Ui/Modal';
import { Input } from '../../../../../Components/Ui/Input';
import { t } from 'i18next';

interface VerificationProps {
    verificationDocuments: any[];
    t: any;
    sellerId: string | number;
}

const collectionLabels: Record<string, { en: string; ar: string }> = {
    kyc_id_front: { en: "ID Card (Front)", ar: "صورة البطاقة (الوجه الأمامي)" },
    kyc_id_back: { en: "ID Card (Back)", ar: "صورة البطاقة (الوجه الخلفي)" },
    kyc_selfie: { en: "Selfie with ID Card", ar: "صورة سيلفي مع البطاقة" },
};

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'approved') return (
        <span className="flex items-center gap-1 text-greenDark text-[12px] font-semibold">
            <CheckCircle size={14} /> {t("Common.Verified")}
        </span>
    );
    if (status === 'rejected') return (
        <span className="flex items-center gap-1 text-red-600 text-[12px] font-semibold">
            <XCircle size={14} /> {t("Common.Rejected")}
        </span>
    );
    return (
        <span className="flex items-center gap-1 text-[#F68713] text-[12px] font-semibold">
            <Clock size={14} /> {t("Common.Pending")}
        </span>
    );
};

export default function Verification({ verificationDocuments, t, sellerId }: VerificationProps) {
    const [approveDocument, { isLoading: isApproving }] = useApproveSellerDocumentMutation();
    const [rejectDocument, { isLoading: isRejecting }] = useRejectSellerDocumentMutation();
    const lang = localStorage.getItem("i18nextLng") || "ar";
    const [selectedDocId, setSelectedDocId] = useState<string | number | null>(null);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const handleApprove = async () => {
        if (!selectedDocId) return;
        try {
            const res = await approveDocument({ sellerId, documentId: selectedDocId }).unwrap();
            toast.success(res.message || t("AccountDetails.VerificationSection.ApproveSuccess") || "Document approved successfully");
            setIsApproveModalOpen(false);
            setSelectedDocId(null);
        } catch (error) {
            handleApiError(error)
        }
    };

    const handleReject = async () => {
        if (!selectedDocId) return;
        try {
            const res = await rejectDocument({ sellerId, documentId: selectedDocId, reason: rejectReason }).unwrap();
            toast.success(res.message || t("AccountDetails.VerificationSection.RejectSuccess") || "Document rejected successfully");
            setIsRejectModalOpen(false);
            setSelectedDocId(null);
            setRejectReason("");
        } catch (error) {
            handleApiError(error)
        }
    };

    if (!verificationDocuments || verificationDocuments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-[16px] font-medium">{t("Common.NoDataFound")}</p>
            </div>
        );
    }

    const allApproved = verificationDocuments.every(d => d.status === 'approved');
    const anyRejected = verificationDocuments.some(d => d.status === 'rejected');

    const statusBg = allApproved
        ? 'bg-[#2B7B4C14] border-greenDark'
        : anyRejected
            ? 'bg-red-50 border-red-300'
            : 'bg-orange-50 border-orange-300';

    return (
        <div className="space-y-8">
            {/* Status Card */}
            <div className={`${statusBg} border rounded-[12px] p-6 flex flex-row items-center justify-between flex-wrap gap-4`}>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Shield size={24} className={allApproved ? "text-greenDark" : anyRejected ? "text-red-600" : "text-[#F68713]"} />
                        <div className="flex flex-col gap-1">
                            <h3 className={`text-[18px] font-bold flex items-center gap-2 ${allApproved ? "text-greenDark" : anyRejected ? "text-red-600" : "text-[#F68713]"}`}>
                                {t("AccountDetails.VerificationSection.Status")}
                            </h3>
                            <p className="text-gray-600 text-[14px]">
                                {allApproved
                                    ? t("AccountDetails.VerificationSection.SuccessMessage")
                                    : anyRejected
                                        ? t("AccountDetails.VerificationSection.RejectedMessage")
                                        : t("AccountDetails.VerificationSection.PendingMessage")}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <span className={`px-5 py-1 rounded-full text-[14px] font-semibold ${allApproved ? "bg-[#2B7B4C33] text-greenDark" : anyRejected ? "bg-red-100 text-red-600" : "bg-orange-100 text-[#F68713]"}`}>
                        {allApproved
                            ? t("AccountDetails.VerificationSection.Verified")
                            : anyRejected
                                ? t("AccountDetails.VerificationSection.Rejected")
                                : t("AccountDetails.VerificationSection.Pending")}
                    </span>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                {verificationDocuments.map((doc: any) => {
                    const isDocApproving = isApproving && selectedDocId === doc.id;
                    const isDocRejecting = isRejecting && selectedDocId === doc.id;

                    return (
                        <div key={doc.id} className="bg-white rounded-[18px] p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[#373B42] text-[13px] font-semibold">
                                    {lang === "en" ?
                                        collectionLabels[doc.collection_name]?.en
                                        : collectionLabels[doc.collection_name]?.ar
                                    }
                                </h4>
                                <StatusBadge status={doc.status} />
                            </div>

                            <div className="rounded-[12px] overflow-hidden border border-gray-100">
                                <img
                                    src={doc.thumb_url || doc.url}
                                    alt={doc.collection_name}
                                    className="w-full h-[150px] object-cover"
                                    onError={(e) => { e.currentTarget.src = "/default.png"; }}
                                />
                            </div>

                            {/* Rejection reason */}
                            {doc.rejection_reason && (
                                <p className="text-red-500 text-[12px] font-medium bg-red-50 px-3 py-2 rounded-[8px]">
                                    {t("AccountDetails.VerificationSection.RejectReason")}: {doc.rejection_reason}
                                </p>
                            )}

                            {/* Reviewer */}
                            {doc.reviewer && (
                                <p className="text-gray-400 text-[11px]">
                                    {t("AccountDetails.VerificationSection.ReviewedBy")}: <span className="font-semibold text-gray-600">{doc.reviewer.name}</span>
                                </p>
                            )}

                            {doc.status === 'pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedDocId(doc.id);
                                            setIsApproveModalOpen(true);
                                        }}
                                        disabled={isApproving || isRejecting}
                                        className="flex-1 bg-greenDark hover:bg-[#23663f] text-white py-2.5 rounded-[10px] font-semibold text-[14px] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDocApproving ? <Loader2 size={16} className="animate-spin" /> : t("AccountDetails.VerificationSection.Approve")}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedDocId(doc.id);
                                            setIsRejectModalOpen(true);
                                            setRejectReason("");
                                        }}
                                        disabled={isApproving || isRejecting}
                                        className="flex-1 bg-[#E7000B] hover:bg-[#b00707] text-white py-2.5 rounded-[10px] font-semibold text-[14px] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDocRejecting ? <Loader2 size={16} className="animate-spin" /> : t("AccountDetails.VerificationSection.Reject")}
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Approval Confirmation Modal */}
            <ConfirmModal
                isOpen={isApproveModalOpen}
                onClose={() => {
                    setIsApproveModalOpen(false);
                    setSelectedDocId(null);
                }}
                onConfirm={handleApprove}
                loading={isApproving}
                title={t("AccountDetails.VerificationSection.Approve")}
                message={t("Common.AreYouSure") || "Are you sure?"}
                description={t("AccountDetails.VerificationSection.ApproveDescription") || "You are about to approve this document."}
            />

            {/* Rejection Modal with Reason */}
            <Modal
                isOpen={isRejectModalOpen}
                onClose={() => {
                    setIsRejectModalOpen(false);
                    setSelectedDocId(null);
                    setRejectReason("");
                }}
                title={t("AccountDetails.VerificationSection.Reject")}
                maxWidth="max-w-[500px]"
            >
                <div className="space-y-5">
                    <p className="text-gray-600 text-sm">
                        {t("AccountDetails.VerificationSection.RejectDescription") || "Please provide a reason for rejecting this document."}
                    </p>
                    <Input
                        label={t("AccountDetails.VerificationSection.RejectReason") || "Reason"}
                        placeholder={t("AccountDetails.VerificationSection.RejectReasonPlaceholder") || "Write reason here..."}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        required
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={handleReject}
                            disabled={isRejecting || !rejectReason.trim()}
                            className="flex-1 bg-[#E7000B] hover:bg-[#b00707] text-white py-2.5 rounded-[10px] font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isRejecting ? <Loader2 size={16} className="animate-spin" /> : t("AccountDetails.VerificationSection.Reject")}
                        </button>
                        <button
                            onClick={() => {
                                setIsRejectModalOpen(false);
                                setSelectedDocId(null);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-[10px] font-semibold text-sm transition-all"
                        >
                            {t("Common.Cancel") || "Cancel"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
