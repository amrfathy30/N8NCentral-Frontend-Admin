
import AffiliateCommissions from "./AffiliateCommissions";
import TransactionHistory from "./TransactionHistory";

export const FinancialSidebar = ({ transactions }: { transactions: any[] }) => {

    return (
        <div className="space-y-6">
            {/* AffiliateCommissions */}
            <AffiliateCommissions />
            {/* TransactionHistory */}
            <TransactionHistory transactions={transactions} />
        </div>
    );
};
