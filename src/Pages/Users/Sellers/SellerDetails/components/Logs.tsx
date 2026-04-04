interface LogsProps {
    t: any;
    activityLog: any[];
}

const ActionBadge = ({ action }: { action: string }) => {
    const colors: Record<string, string> = {
        created: 'bg-green-100 text-greenDark',
        updated: 'bg-blue-100 text-blue-700',
        deleted: 'bg-red-100 text-red-600',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${colors[action] || 'bg-gray-100 text-gray-600'}`}>
            {action}
        </span>
    );
};

export default function Logs({ t, activityLog }: LogsProps) {
    if (!activityLog || activityLog.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-[16px] font-medium">{t("Common.NoDataFound")}</p>
            </div>
        );
    }

    return (
        <section className="space-y-4">
            <h3 className="text-[#027A48] text-[21px] font-bold">
                {t("AccountDetails.ActivityLog")}
            </h3>
            <div className="space-y-3">
                {activityLog.map((log: any) => (
                    <div key={log.id} className="bg-white rounded-[12px] p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <ActionBadge action={log.action} />
                                    <span className="text-[#373B42] text-[14px] font-semibold">{log.description}</span>
                                </div>

                                {/* Properties */}
                                {/* {log.properties && Object.keys(log.properties).length > 0 && (
                                    <div className="bg-gray-50 rounded-[8px] p-3 mt-1">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5">
                                            {Object.entries(log.properties).map(([key, val]) => (
                                                <div key={key} className="flex flex-col">
                                                    <span className="text-[11px] text-gray-400 font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                                                    <span className="text-[12px] text-gray-700 font-semibold" title={String(val)}>
                                                        {String(val)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )} */}

                                {/* Causer */}
                                <p className="text-[12px] text-gray-400">
                                    {t("AccountDetails.LogBy")}{" "}
                                    <span className="text-gray-600 font-semibold">{log.causer_name}</span>
                                    {" "}({log.causer_type})
                                </p>
                            </div>

                            {/* Date */}
                            <div className="text-right">
                                <span className="text-[12px] text-gray-400">
                                    {log.created_at ? new Date(log.created_at).toLocaleString() : "—"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
