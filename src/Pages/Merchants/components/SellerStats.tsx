import StatsCard from '../../Dashboard/components/StatsCard'
import { Users, ShoppingCart, CheckCircle, HandCoins } from 'lucide-react';

export default function SellerStats({ statsData, t }: { statsData: any, t: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <>
                <StatsCard title={t("Merchants.TotalMerchants")} value={statsData?.data?.total_sellers} icon={Users} color="bg-[#AD46FF]" />
                <StatsCard title={t("Merchants.ActiveMerchants")} value={statsData?.data?.active_sellers} icon={ShoppingCart} color="bg-greenDark" />
                <StatsCard title={t("Merchants.PendingVerification")} value={statsData?.data?.pending_verification} icon={CheckCircle} color="bg-[#F6F6F6] !text-greenDark" />
                <StatsCard title={t("Merchants.TotalRevenue")} value={statsData?.data?.total_revenue} icon={HandCoins} color="bg-[#F0B100]" />
            </>
        </div>)
}
