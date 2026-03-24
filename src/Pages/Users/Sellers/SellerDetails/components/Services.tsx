import DynamicTable from '../../../../../Components/Ui/DynamicTable'

export default function Services({ servicesData, serviceColumns }: { servicesData: any[], serviceColumns: any[] }) {
    return (
        <DynamicTable
            data={servicesData}
            columns={serviceColumns}
            showSearch={false}
        />)
}
