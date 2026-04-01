import Skeleton from "../../Ui/Skeleton";

export default function StatsCardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="custom-card h-[180px] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <Skeleton className="w-14 h-14 rounded-2xl" />
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
