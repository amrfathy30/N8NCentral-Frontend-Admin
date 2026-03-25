
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useTranslation } from "react-i18next";

export const RevenuePerformanceChart = ({RevenuePerformanceChartData}: {RevenuePerformanceChartData: any[]}) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    return (
        <div className="custom-card h-[400px]">
            <div className="flex flex-col gap-2 mb-6">
                <h4 className="font-bold text-gray-800">
                    {t("Financial.RevenuePerformance")}
                </h4>
                <p className="text-[#6B7280] text-[14px]">
                    {t("Financial.RevenuePerformanceDescription")}
                </p>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={RevenuePerformanceChartData} margin={{ top: 10, right: isRtl ? 0 : 0, left: isRtl ? 0 : 0, bottom: 0 }}>
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
                    <Tooltip
                        contentStyle={{
                            textAlign: isRtl ? 'right' : 'left',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-xs mx-1 text-gray-600">{t(`Financial.Sidebar.${value.charAt(0).toUpperCase() + value.slice(1)}`)}</span>}
                    />
                    <Line type="monotone" dataKey="merchant" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="affiliates" stroke="#14B8A6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="platform" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const UsedFinancial = ({UsedFinancialData}: {UsedFinancialData: any[]}) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    return (
        <div className="custom-card h-[400px]">
            <div className="flex flex-col gap-2 mb-6">
                <h4 className="font-bold text-gray-800">
                    {t("Financial.UsedFinancial")}
                </h4>
                <p className="text-[#6B7280] text-[14px]">
                    {t("Financial.UsedFinancialDescription")}
                </p>
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={UsedFinancialData} margin={{ top: 10, right: isRtl ? 0 : 0, left: isRtl ? 0 : 0, bottom: 0 }}>
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
                    <Tooltip
                        contentStyle={{
                            textAlign: isRtl ? 'right' : 'left',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-xs mx-1 text-gray-600">{t(`Financial.Sidebar.${value.charAt(0).toUpperCase() + value.slice(1)}`)}</span>}
                    />
                    <Line type="monotone" dataKey="stripe" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="visa" stroke="#14B8A6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="digitalCurrencies" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
