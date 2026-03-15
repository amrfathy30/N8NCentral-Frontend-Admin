// import { useTranslation } from 'react-i18next';
import { Link, NavLink } from "react-router-dom";
import LanguageChange from "../../../Components/Ui/LanguageChange";

const Navbar = () => {
  // const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng") || "ar";

  const isLogin = location.pathname.includes(`/${lang}/admin/login`)

  if (isLogin) return null;

  return (
    <nav className="w-full bg-white">
      <div className="flex justify-between h-16 items-center px-2 lg:px-8">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link to={`/${lang}/admin/dashboard`}>
            <img src="/logo.png" alt="logo" className="w-32 h-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <LanguageChange />

          <NavLink
            to={`/${lang}/admin/login`}
            className="px-4 py-2 flex justify-center gap-2 items-center bg-main text-white rounded-md hover:bg-greenDark transition"
          >
            <span>تسجيل الدخول</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
