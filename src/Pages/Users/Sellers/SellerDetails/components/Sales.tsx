import DynamicTable from "../../../../../Components/Ui/DynamicTable";

export default function Sales({ salesData, salesColumns }: { salesData: any[], salesColumns: any[] }) {
    return (
        <DynamicTable
            data={salesData}
            columns={salesColumns}
            showSearch={false}
        />)
}
