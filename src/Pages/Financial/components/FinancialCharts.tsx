
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

export const RevenuePerformanceChart = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const data = [
        { name: t("Charts.Days.Sat"), merchant: 4000, platform: 2400, affiliates: 2400 },
        { name: t("Charts.Days.Sun"), merchant: 3000, platform: 1398, affiliates: 2210 },
        { name: t("Charts.Days.Mon"), merchant: 2000, platform: 9800, affiliates: 2290 },
        { name: t("Charts.Days.Tue"), merchant: 2780, platform: 3908, affiliates: 2000 },
        { name: t("Charts.Days.Wed"), merchant: 1890, platform: 4800, affiliates: 2181 },
        { name: t("Charts.Days.Thu"), merchant: 2390, platform: 3800, affiliates: 2500 },
        { name: t("Charts.Days.Fri"), merchant: 3490, platform: 4300, affiliates: 2100 },
    ];

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
                <LineChart data={data} margin={{ top: 10, right: isRtl ? 0 : 0, left: isRtl ? 0 : 0, bottom: 0 }}>
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

export const UsedFinancial = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === "rtl";

    const data = [
        { name: t("Charts.Days.Sat"), visa: 4000, stripe: 2400, digitalCurrencies: 2400 },
        { name: t("Charts.Days.Sun"), visa: 3000, stripe: 1398, digitalCurrencies: 2210 },
        { name: t("Charts.Days.Mon"), visa: 2000, stripe: 9800, digitalCurrencies: 2290 },
        { name: t("Charts.Days.Tue"), visa: 2780, stripe: 3908, digitalCurrencies: 2000 },
        { name: t("Charts.Days.Wed"), visa: 1890, stripe: 4800, digitalCurrencies: 2181 },
        { name: t("Charts.Days.Thu"), visa: 2390, stripe: 3800, digitalCurrencies: 2500 },
        { name: t("Charts.Days.Fri"), visa: 3490, stripe: 4300, digitalCurrencies: 2100 },
    ];

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
                <LineChart data={data} margin={{ top: 10, right: isRtl ? 0 : 0, left: isRtl ? 0 : 0, bottom: 0 }}>
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
