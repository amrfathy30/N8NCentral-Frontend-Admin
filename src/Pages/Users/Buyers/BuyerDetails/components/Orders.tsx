import DynamicTable from '../../../../../Components/Ui/DynamicTable'

export default function Orders({ ordersData, orderColumns }: { ordersData: any[], orderColumns: any[] }) {
    return (
        <div>
            <DynamicTable
                data={ordersData}
                columns={orderColumns}
                showSearch={false}
            />
        </div>
    )
}
