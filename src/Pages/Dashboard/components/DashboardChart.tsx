

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../../Components/Ui/CustomSelect";

const data = [
    { time: "1:00", value: 5 },
    { time: "2:00", value: 4 },
    { time: "3:00", value: 6 },
    { time: "4:00", value: 3.5 },
    { time: "5:00", value: 5 },
    { time: "6:00", value: 3 },
    { time: "7:00", value: 5.5 },
    { time: "8:00", value: 4.5 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-greenDark text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                {payload[0].value} مستخدم
            </div>
        );
    }
    return null;
};


const DashboardChart = ({ title }: { title: string }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const options = [
        { value: "today", label: t("Dashboard.Today") || "اليوم" },
        { value: "week", label: t("Dashboard.Week") || "الأسبوع" },
        { value: "month", label: t("Dashboard.Month") || "الشهر" },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full min-h-[300px]">
            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
                <CustomSelect
                    options={options}
                    className="w-32"
                    placeholder={t("Dashboard.SelectPeriod") || "اختر الفترة"}
                    value={options[0]}
                />
            </div>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1E5631" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#1E5631" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            reversed={isRtl}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            orientation={isRtl ? "right" : "left"}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <ReferenceLine y={4.5} stroke="#3b82f6" strokeDasharray="4 4" />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1E5631"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={{ r: 0 }}
                            activeDot={{ r: 6, fill: '#1E5631', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart