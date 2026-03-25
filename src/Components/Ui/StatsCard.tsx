import type { ElementType } from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: ElementType;
    color?: string;
    trend?: string;
}

const StatsCard = ({
    title,
    value,
    icon: Icon,
    color,
    trend
}: StatsCardProps) => (
    <div className="custom-card transition-all duration-300 hover:bg-greenDark group cursor-pointer h-full flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start mb-6">
                {Icon && (
                    <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-gray-200 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-none`}>
                        <div className={`p-4 rounded-2xl ${color}`}>
                            <Icon size={28} />
                        </div>
                    </div>
                )}

                {trend && (
                    <div className="flex flex-col items-center gap-1 transition-all duration-300 group-hover:text-white">
                        <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">
                            {trend}
                        </span>
                        <span className="text-[10px] text-gray-400 group-hover:text-white/70">
                            3+ اليوم
                        </span>
                    </div>
                )}
            </div>

            <div>
                <p className="text-[#64748B] text-[16px] font-medium mb-1 transition-colors duration-300 group-hover:text-white/80 truncate">
                    {title}
                </p>
                <h3 className="text-[12px] font-semibold text-[#101828] transition-colors duration-300 group-hover:text-white truncate">
                    {value}
                </h3>
            </div>
        </div>
    </div>
);

export default StatsCard;