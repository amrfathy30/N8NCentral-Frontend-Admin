import DynamicTable from '../../../../../Components/Ui/DynamicTable'

interface ServicesProps {
    servicesData: any[]
    serviceColumns: any[]
}

export default function Services({ servicesData, serviceColumns }: ServicesProps) {
    return (
        <DynamicTable
            data={servicesData}
            columns={serviceColumns}
            showSearch={false}
        />
    )
}
