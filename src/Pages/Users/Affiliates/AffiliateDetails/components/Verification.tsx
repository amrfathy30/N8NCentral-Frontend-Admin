import { Shield } from "lucide-react";

export default function Verification({verificationDocuments,t}: { verificationDocuments: any[]; t: any }) {
    return (
        <div className="space-y-8">
            {/* Status Card */}
            <div className="bg-[#2B7B4C14] border border-greenDark rounded-[12px] p-6 flex flex-row items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-2">
                        <Shield size={24} className="text-greenDark" />

                        <div className="flex flex-col gap-1">
                            <h3 className="text-greenDark text-[18px] font-bold flex items-center gap-2 justify-start">
                                {t("AccountDetails.VerificationSection.Status")}
                            </h3>
                            <p className="text-greenDark text-[17px]">
                                {t("AccountDetails.VerificationSection.SuccessMessage")}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="bg-[#2B7B4C33] text-greenDark px-5 py-1 rounded-full text-[16px] font-semibold">
                        {t("AccountDetails.VerificationSection.Verified")}
                    </span>
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                {verificationDocuments.map((doc: any) => (
                    <div key={doc.id} className="bg-white rounded-[18px] p-5 shadow-sm border border-gray-100 flex flex-col gap-5">
                        <h4 className="text-[#373B42] text-[15px] font-semibold text-center">
                            {doc.title}
                        </h4>
                        <div className="rounded-[12px] overflow-hidden border border-gray-100">
                            <img src={doc.image} alt={doc.title} className="w-full h-[150px] object-center" />
                        </div>
                        <div className="flex gap-3">
                            <button className="flex-1 bg-greenDark hover:bg-[#23663f] text-white py-3 rounded-[10px] font-semibold text-[16px] transition-all active:scale-[0.98]">
                                {t("AccountDetails.VerificationSection.Approve")}
                            </button>
                            <button className="flex-1 bg-[#E7000B] hover:bg-[#b00707] text-white py-3 rounded-[10px] font-semibold text-[16px] transition-all active:scale-[0.98]">
                                {t("AccountDetails.VerificationSection.Reject")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
}
