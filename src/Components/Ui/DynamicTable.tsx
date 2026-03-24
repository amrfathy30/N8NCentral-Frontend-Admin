import { useState, type ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { Input } from "./Input";
import { Search } from "lucide-react";

export interface DynamicTableColumn {
  field?: string;
  header?: string | ReactNode;
  body?: (rowData: any) => ReactNode;
  width?: string | number;
  key?: string | number;
}

interface FilterOption {
  label: string;
  value: string;
}

interface DynamicTableProps {
  data?: any[];
  columns?: DynamicTableColumn[];
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  filterField?: string;
  onFilterChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

export default function DynamicTable({
  data = [],
  columns = [],
  searchPlaceholder,
  filterOptions = [],
  filterField = "status",
  showSearch = true,
}: DynamicTableProps) {
  const { t, i18n } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const dir = i18n.dir();

  const getActiveColor = (filter: string) => {
    switch (filter) {
      case "active":
        return "!bg-greenDark";
      case "PendingReview":
      case "pending":
        return "!bg-[#F68713]";
      case "WaitVerified":
      case "waitVerified":
        return "!bg-[#F68713]";
      case "Rejected":
      case "rejected":
        return "!bg-[#D00808]";
      case "Blocked":
      case "blocked":
        return "!bg-[#E7000B]";
      case "Inactive":
      case "inactive":
        return "!bg-[#64748B]";
      default:
        return "!bg-greenDark";
    }
  };

  const activeColorClass = getActiveColor(activeFilter);

  const filteredData = data.filter((item) => {
    // Basic search filtering
    const searchMatch = Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(globalFilter.toLowerCase())
    );

    // Basic status filtering (if status exists)
    const statusMatch = activeFilter === "all" || item[filterField] === activeFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="space-y-4" dir={dir}>
      {/* Search and Filters Bar */}
      {showSearch && (
        <div className="bg-white p-2 rounded-[17px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Input
              placeholder={searchPlaceholder || t("Common.Search")}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="!mb-0"
              inputClassName="!bg-[#F9FAFB] !border-none !rounded-xl !py-2 !h-12 !text-sm"
            />
            <Search className={`absolute top-6 -translate-y-1/2 text-gray-400 ${dir === 'rtl' ? 'left-4' : 'right-4'}`} size={18} />
          </div>

          {/* Filter Buttons/Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-[#F9FAFB] p-2 rounded-[10px]">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`px-6 py-2 rounded-[10px] text-sm font-medium transition-all whitespace-nowrap ${activeFilter === option.value
                  ? `${getActiveColor(option.value)} text-white`
                  : " text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-hidden rounded-[11px] border border-gray-100 shadow-sm bg-white">
        <DataTable
          value={filteredData}
          className="custom-table"
          responsiveLayout="scroll"
          dataKey="id"
          emptyMessage={t("Common.NoDataFound")}
        >
          {columns.map((col, index) => (
            <Column
              key={col.field || col.key || index}
              field={col.field}
              header={col.header}
              body={col.body}
              alignHeader="center"
              align="center"
              style={{ minWidth: col.width || "120px" }}
              headerClassName={`!text-white !font-bold !py-4 !border-none !text-[15px] ${activeColorClass}`}
              bodyClassName="!py-4 !border-b !border-gray-50 !text-greenDark !text-[15px]"
            />
          ))}
        </DataTable>
      </div>

    </div>
  );
}
