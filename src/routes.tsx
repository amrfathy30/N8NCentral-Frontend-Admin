import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
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
import Merchants from './Pages/Merchants/Sellers';
import ServicesDetails from './Pages/Services/ServicesDetails';
import PermissionsPage from './Pages/Setting/Permissions/PermissionsPage';
import DropDownMenuSettings from './Pages/Setting/DropDownMenuSettings/DropDownMenuSettings';
import GeneralSettings from './Pages/Setting/GeneralSettings/GeneralSettings';
import LogsPage from './Pages/LogsPage/LogsPage';
import AuthRedirect from './Components/Helper/AuthRedirect';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

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
                <Route path="login"
                    element={
                        <AuthRedirect>
                            <Login />
                        </AuthRedirect>
                    } />

                {/* Protected Routes */}
                <Route element={
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="affiliate-page" element={<AffiliatesPage />} />
                    <Route path="services-page" element={<ServicesPage />} />
                    <Route path="orders-page" element={<OrdersPage />} />
                    <Route path="financial-page" element={<FinancialPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="complaints" element={<Complaints />} />
                    <Route path="general-settings" element={<GeneralSettings />} />
                    <Route path="drop-down-menu-settings" element={<DropDownMenuSettings />} />
                    <Route path="logs" element={<LogsPage />} />
                    <Route path="permissions" element={<PermissionsPage />} />
                    <Route path="services-details/:id" element={<ServicesDetails />} />
                    <Route path="users">
                        <Route path="buyers" element={<Buyers />} />
                        <Route path="sellers" element={<Sellers />} />
                        <Route path="affiliate" element={<Affiliates />} />
                        <Route path="suspended" element={<SuspendedAccounts />} />
                        <Route path="details/:type/:id" element={<UserDetailsSwitcher />} />
                    </Route>
                    <Route path="merchants" element={<Merchants />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

const AppRoutes = () => {
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
