
import AffiliateCommissions from "./AffiliateCommissions";
import TransactionHistory from "./TransactionHistory";

export const FinancialSidebar = () => {

    return (
        <div className="space-y-6">
            {/* AffiliateCommissions */}
            <AffiliateCommissions />

            {/* TransactionHistory */}
            <TransactionHistory />
        </div>
    );
};
