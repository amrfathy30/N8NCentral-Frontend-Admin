import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = i18n.language;

  const isLogin = location.pathname.includes(`/${lang}/admin/login`);

  if (isLogin) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#F6F6F6]" dir={dir}>
      <header className="z-50 w-full border-b border-gray-100 bg-white shrink-0">
        <Navbar />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 hidden lg:flex flex-col border-e border-gray-100 bg-[#0F172A] relative">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
