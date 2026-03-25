import { useTranslation } from "react-i18next";

export default function Stats({ stats }: { stats: any[] }) {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-[16px] shadow-md h-full flex flex-col justify-between">
                    <h2 className="text-[#6B7280] text-[14px] mb-2">{stat?.title}</h2>
                    <p className="text-[#101828] text-[20px] font-extrabold mb-2">{stat?.value}</p>
                    {stat?.netCommission &&
                        <p className="text-[#4B5563] text-[12px] font-bold">{t("Financial.NetCommission")}</p>
                    }
                    {stat?.includesPendingAndCompletedProjects &&
                        <p className="text-[#4B5563] text-[12px] font-bold">{t("Financial.IncludesPendingAndCompletedProjects")}</p>
                    }
                    {stat?.lastMonth &&
                        <div className="text-greenDark font-bold bg-[#EFF6FF] p-2 rounded-full w-fit text-[12px] flex gap-1">
                            <span>
                                {stat?.lastMonth}
                            </span>
                            <span>
                                {t("Financial.LastMonth")}
                            </span>
                        </div>
                    }
                    {stat?.refundRate &&
                        <div className="text-[#B91C1C] font-bold bg-[#EFF6FF] p-2 rounded-full w-fit text-[12px] flex gap-1">
                            <span>
                                {stat?.refundRate}
                            </span>
                            <span>
                                {t("Financial.RefundRate")}
                            </span>
                        </div>
                    }
                    {stat?.underReview &&
                        <div className="text-[#A16207] font-bold bg-[#FEFCE8] p-2 rounded-full w-fit text-[12px] flex gap-1">
                            <span>
                                {t("Financial.underReview")}
                            </span>
                            <span>
                                {stat?.underReview}
                            </span>
                        </div>
                    }
                </div>
            ))}
        </div>)
}
