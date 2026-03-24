import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import i18n from './i18n/i18n';
import NotFound from './Pages/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Login from './Pages/Auth/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Buyers from './Pages/Users/Buyers/Buyers';
import Sellers from './Pages/Users/Sellers/Sellers';
import Affiliates from './Pages/Users/Affiliates/Affiliates';
import SuspendedAccounts from './Pages/Users/SuspendedAccounts/SuspendedAccounts';
import BuyerDetails from './Pages/Users/Buyers/BuyerDetails/BuyerDetails';
import SellerDetails from './Pages/Users/Sellers/SellerDetails/SellerDetails';
import AffiliateDetails from './Pages/Users/Affiliates/AffiliateDetails/AffiliateDetails';
import AffiliatesPage from './Pages/Affiliates/AffiliatesPage';
import ServicesPage from './Pages/Services/ServicesPage';
import OrdersPage from './Pages/Orders/OrdersPage';
import FinancialPage from './Pages/Financial/FinancialPage';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';
import Complaints from './Pages/Complaints/Complaints';
import Setting from './Pages/Setting/Setting';
import LogsPage from './Pages/Logs/LogsPage';

function UserDetailsSwitcher() {
    const { type } = useParams();

    switch (type) {
        case 'buyer':
            return <BuyerDetails />;
        case 'seller':
            return <SellerDetails />;
        case 'affiliate':
            return <AffiliateDetails />;
        default:
            return <NotFound />;
    }
}

function LocaleWrapper() {
    const { locale } = useParams();

    useEffect(() => {
        if (locale) {
            i18n.changeLanguage(locale);

            if (locale === 'ar') {
                document.documentElement.dir = 'rtl';
            } else {
                document.documentElement.dir = 'ltr';
            }
        }
    }, [locale]);

    return (
        <Routes>
            <Route path="admin" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="affiliate-page" element={<AffiliatesPage />} />
                <Route path="services-page" element={<ServicesPage />} />
                <Route path="orders-page" element={<OrdersPage />} />
                <Route path="financial-page" element={<FinancialPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="settings" element={<Setting />} />
                <Route path="logs" element={<LogsPage />} />
                <Route path="users">
                    <Route path="buyers" element={<Buyers />} />
                    <Route path="sellers" element={<Sellers />} />
                    <Route path="affiliate" element={<Affiliates />} />
                    <Route path="suspended" element={<SuspendedAccounts />} />
                    <Route path="details/:type/:id" element={<UserDetailsSwitcher />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

const AppRoutes = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return (
        <>
            <>
                <Routes>
                    <Route path="/" element={<Navigate to="/en/admin/login" replace />} />
                    <Route path="/:locale/*" element={<LocaleWrapper />} />
                </Routes>
            </>
        </>
    );
};

export default AppRoutes;
