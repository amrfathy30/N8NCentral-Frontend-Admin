
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const COLORS = ["#1E5631", "#E5E7EB"];

export const SalesAreaChart = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const data = [
        { name: t("Charts.Days.Sat"), value: 3000 },
        { name: t("Charts.Days.Sun"), value: 4500 },
        { name: t("Charts.Days.Mon"), value: 3200 },
        { name: t("Charts.Days.Tue"), value: 5000 },
        { name: t("Charts.Days.Wed"), value: 4800 },
        { name: t("Charts.Days.Thu"), value: 6000 },
        { name: t("Charts.Days.Fri"), value: 5500 },
    ];

    return (
        <div className="custom-card h-[400px]">
            <h4 className={`font-bold text-gray-800 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t("Analytics.SalesChangeSubtitle")}
            </h4>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data} margin={{ top: 10, right: isRtl ? 40 : 10, left: isRtl ? 10 : 40, bottom: 0 }}>

                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1E5631" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#1E5631" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        reversed={isRtl}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        orientation={isRtl ? "right" : "left"}
                        width={40}
                    />

                    <Tooltip contentStyle={{ textAlign: isRtl ? 'right' : 'left', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#1E5631"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const UserBarChart = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const data = [
        { name: t("Charts.Months.Jan"), value: 400 },
        { name: t("Charts.Months.Feb"), value: 300 },
        { name: t("Charts.Months.Mar"), value: 500 },
        { name: t("Charts.Months.Apr"), value: 200 },
        { name: t("Charts.Months.May"), value: 450 },
    ];

    return (
        <div className="custom-card h-[400px]">
            <div className={`flex justify-between items-center mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <h4 className="font-bold text-gray-800">{t("Analytics.UserGrowthSubtitle")}</h4>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data} margin={{ top: 10, right: isRtl ? 40 : 10, left: isRtl ? 10 : 40, bottom: 0 }}>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        reversed={isRtl}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        orientation={isRtl ? "right" : "left"}
                        width={40}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ textAlign: isRtl ? 'right' : 'left', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill="#0A0F29" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const ConversionDonutChart = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const data = [
        { name: t("Common.Completed"), value: 75 },
        { name: t("Common.PendingReview"), value: 25 },
    ];

    return (
        <div className="custom-card h-[400px] flex flex-col items-center justify-center">
            <h4 className={`font-bold text-gray-800 mb-6 w-full ${isRtl ? 'text-right' : 'text-left'}`}>{t("Analytics.ConversionRate")}</h4>
            <div className="relative w-full h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            startAngle={isRtl ? 90 : 90}
                            endAngle={isRtl ? 450 : 450}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ textAlign: isRtl ? 'right' : 'left', borderRadius: '12px' }} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-gray-800">7.5%</span>
                </div>
            </div>
        </div>
    );
};
