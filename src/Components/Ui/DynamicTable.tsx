import type { ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface DynamicTableColumn {
  field?: string;
  header?: string | ReactNode;
  body?: (rowData: any) => ReactNode;
  width?: string | number;
  key?: string | number;
}

interface DynamicTableProps {
  data?: any[];
  columns?: DynamicTableColumn[];
}

export default function DynamicTable({
  data = [],
  columns = [],
}: DynamicTableProps) {
  return (
    <div className="card shadow-lg bg-white p-4 rounded-2xl border border-gray-200">
      <DataTable value={data} className="rounded-2xl">
        {columns.map((col, index) => (
          <Column
            key={col.field || col.key || index}
            field={col.field}
            header={col.header}
            body={col.body}
            style={{ minWidth: col.width || "150px" }}
            headerClassName="text-center"
            bodyClassName="text-center"
          />
        ))}
      </DataTable>
    </div>
  );
}
