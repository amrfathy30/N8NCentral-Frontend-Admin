import DynamicTable, { type DynamicTableColumn } from "../../../../../Components/Ui/DynamicTable";

interface CommissionData {
    id: string;
    service: string;
    sellingValue: string;
    commission: string;
    status: string;
}

interface CommissionsProps {
    commissionsData: CommissionData[];
    commissionsColumns: DynamicTableColumn[];
    t: any;
}

export default function Commissions({ commissionsData, commissionsColumns, t }: CommissionsProps) {
    return (
        <>
            <h2 className="text-[20px] font-bold text-greenDark">
                {t("AccountDetails.Commission")}
            </h2>
            <DynamicTable
                data={commissionsData}
                columns={commissionsColumns}
                showSearch={false}
            />
        </>)
}
