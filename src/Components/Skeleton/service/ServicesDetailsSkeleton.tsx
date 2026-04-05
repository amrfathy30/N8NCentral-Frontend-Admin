import Skeleton from "../../Ui/Skeleton"; 

export default function ServicesDetailsSkeleton() {
    return (
        <div className="space-y-8 pb-10 p-4">
            {/* Header: Title and Back button */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-20" />
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side: Content */}
                <div className="flex-1 space-y-6">
                    <Skeleton className="h-8 w-32 rounded-full" /> 
                    <div className="space-y-3">
                        <Skeleton className="h-12 w-full" /> 
                        <Skeleton className="h-12 w-3/4" /> 
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" /> 
                        <Skeleton className="h-5 w-5/6" /> 
                    </div>

                    {/* Stats (Rating, Buyers, Delivery) */}
                    <div className="flex items-center flex-wrap gap-4 md:gap-16 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-3 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="w-full lg:w-[400px]">
                    <Skeleton className="aspect-square w-full rounded-[20px]" />
                </div>
            </div>

            {/* Additional Services & Tools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-40" /> 
                    <Skeleton className="h-48 w-full rounded-[12px]" /> 
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-6 w-40" /> 
                    <Skeleton className="h-48 w-full rounded-[12px]" /> 
                </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-32 w-full rounded-[24px]" />
            </div>

            {/* Steps & Download Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-28 w-full rounded-[10px]" />
                    ))}
                </div>
                {/* Download Circle */}
                <div className="lg:col-span-1 flex items-center justify-center">
                    <Skeleton className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full" />
                </div>
            </div>
        </div>
    );
}