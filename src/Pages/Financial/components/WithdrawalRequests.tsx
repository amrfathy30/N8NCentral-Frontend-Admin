import { useTranslation } from 'react-i18next';
import DynamicTable from '../../../Components/Ui/DynamicTable'
import { useState } from 'react';
import ConfirmModal from '../../../Components/Ui/ConfirmModal';

export default function WithdrawalRequests({ withdrawalRequests }: { withdrawalRequests: any[] }) {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState("all");

    const [requestToApprove, setRequestToApprove] = useState<any>(null);
    const [requestToReject, setRequestToReject] = useState<any>(null);

    const ActionButtons = (rowData: any) => (
        <div className="flex justify-center items-center gap-2">
            {rowData.status === "Approved" ? (
                <span className="text-greenDark font-bold text-sm">{t("Common.Converted") || "تم التحويل"}</span>
            ) : (
                <>
                    <button className="bg-greenDark text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
                        {t("Common.View")}
                    </button>
                    <button onClick={() => setRequestToApprove(rowData)} className="bg-orange-500 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
                        {t("Common.Adoption")}
                    </button>
                    <button onClick={() => setRequestToReject(rowData)} className="bg-red-500 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all flex items-center gap-1">
                        {t("Common.Reject")}
                    </button>
                </>
            )}
        </div>
    );

    const columns = [
        {
            field: "id",
            header: t("Financial.Table.ID"),
            width: "150px",
            body: (rowData: any) => (
                <div className="flex flex-col items-center">
                    <span className={`font-bold ${rowData.status === 'Approved' ? 'text-greenDark' : 'text-greenDark'}`}>
                        {rowData.status === 'Approved' ? t("Common.Approved") || "موافق عليه" : t("Common.PendingReview")}
                    </span>
                    <span className="text-gray-400 text-xs mt-1">{rowData.id}</span>
                </div>
            )
        },
        {
            field: "name",
            header: t("Financial.Table.Entity") || "الجهة",
            width: "180px",
            body: (rowData: any) => (
                <div className="flex flex-col items-center">
                    <span className="text-greenDark font-bold">{rowData.name}</span>
                    <span className="text-gray-400 text-xs mt-1">{rowData.userId}</span>
                </div>
            )
        },
        {
            field: "type",
            header: t("Financial.Table.Type"),
            body: (rowData: any) => (
                <span className="text-greenDark">
                    {rowData.type === "Affiliate" ? t("Sidebar.Affiliate") : t("Sidebar.Merchants")}
                </span>
            )
        },
        {
            field: "amount",
            header: t("Financial.Table.Amount"),
            body: (rowData: any) => (
                <span className="text-greenDark">{rowData.amount}</span>
            )
        },
        {
            header: t("Financial.Table.Actions"),
            body: (rowData: any) => <ActionButtons {...rowData} />,
            width: "300px"
        }
    ];

    const filterOptions = [
        { label: t("Financial.AllRequests"), value: "all" },
    ];

    return (
        <div className="custom-card !p-0 overflow-hidden">
            <div className="flex justify-between items-center p-6 bg-white">
                <div className="flex flex-col items-start">
                    <h4 className="font-bold text-gray-800 text-xl">
                        {t("Financial.WithdrawalRequests")}
                    </h4>
                    <p className="text-[#6B7280] text-sm">
                        مراجعة/اعتماد/رفض/تحويل
                    </p>
                </div>
            </div>

            <div className="px-6 pb-6">
                <DynamicTable
                    data={withdrawalRequests}
                    columns={columns}
                    filterOptions={filterOptions}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    searchPlaceholder={t("Financial.SearchPlaceholder")}
                />
            </div>
            {/* Approve Modal */}
            <ConfirmModal
                isOpen={!!requestToApprove}
                onClose={() => setRequestToApprove(null)}
                title={t("Financial.ApproveTitle")}
                message={t("Financial.ApproveMessage")}
                isStop={true}
                onConfirm={() => {
                    console.log("Approving request:", requestToApprove.id);
                    setRequestToApprove(null);
                }}
            />
            {/* Reject Modal */}
            <ConfirmModal
                isOpen={!!requestToReject}
                onClose={() => setRequestToReject(null)}
                title={t("Financial.RejectTitle")}
                message={t("Financial.RejectMessage")}
                isDanger={true}
                onConfirm={() => {
                    console.log("Rejecting request:", requestToReject.id);
                    setRequestToReject(null);
                }}
            />
        </div>
    );
}
