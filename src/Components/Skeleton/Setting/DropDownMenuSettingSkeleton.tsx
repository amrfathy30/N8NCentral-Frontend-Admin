import Skeleton from '../../Ui/Skeleton'

export default function DropDownMenuSettingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <Skeleton className="flex-1 h-[46px]" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="w-4 h-4" />
                    </div>
                </div>
            ))}
        </div>
    )
}
