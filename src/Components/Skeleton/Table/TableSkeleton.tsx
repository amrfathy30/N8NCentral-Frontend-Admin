import type { TableSkeletonProps } from "../../../types/table";

export default function TableSkeleton({ rows = 4, columns = 6 }: TableSkeletonProps) {
    return (
        <div className="bg-greenDark rounded-xl border border-gray-100 overflow-hidden animate-pulse">
            <div className={` h-14 w-full bg-opacity-60 border-b border-gray-100 flex items-center px-6 gap-4`}>
                {Array.from({ length: columns }).map((_, i) => (
                    <div key={i} className="h-4 flex-1 bg-white/30 rounded-full mx-2" />
                ))}
            </div>

            <div className="bg-white">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4 border-b border-gray-50 px-6 h-16 items-center last:border-0">
                        {Array.from({ length: columns }).map((_, j) => (
                            <div key={j} className="h-4 flex-1 bg-gray-100 rounded-full mx-2" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
