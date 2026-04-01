import Skeleton from "../../Ui/Skeleton";

export default function PlansSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-[#E5E7EB] rounded-[16px] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-[46px] w-full rounded-[12px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-[46px] w-full rounded-[12px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-[100px] w-full rounded-[12px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
