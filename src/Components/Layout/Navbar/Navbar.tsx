import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";
import LanguageChange from "../../../Components/Ui/LanguageChange";
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, logout } from '../../../store/Slices/authSlice';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = localStorage.getItem("i18nextLng") || "ar";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = useSelector(selectCurrentToken)
  const userData = useSelector(selectCurrentUser)

  const isLoginPath = location.pathname.includes(`/${lang}/admin/login`);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate(`/${lang}/admin/login`);
  };

  if (isLoginPath) return null;

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-[50]">
      <div className="flex justify-between h-20 items-center px-4 lg:px-10">
        <div className="flex items-center gap-2 lg:gap-4">
          <Link to={`/${lang}/admin/dashboard`} className="transition-transform hover:scale-105">
            <img src="/logo.png" alt="logo" className="w-36 h-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <LanguageChange />

          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-main/10 flex items-center justify-center text-main overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                  <User size={22} />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-bold text-gray-800 leading-none mb-0.5">
                    {userData?.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {userData?.email}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className={`absolute top-full mt-2 ${lang === "ar" ? "left-0" : "right-0 sm:left-auto sm:right-0"}  w-56 bg-white rounded-lg shadow-xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden`}>
                  <div className="px-4 py-3 border-b border-gray-50 sm:hidden">
                    <p className="text-sm font-bold text-gray-900">{userData?.name}</p>
                    <p className="text-xs text-gray-500">{userData?.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 transition-colors group-hover:bg-red-200">
                      <LogOut size={18} />
                    </div>
                    <span className="text-sm font-bold">{t("Navbar.Logout")}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={`/${lang}/admin/login`}
              className="px-6 py-2.5 flex justify-center gap-2 items-center bg-main text-white rounded-xl font-bold text-sm hover:bg-greenDark transition-all shadow-lg shadow-main/20 hover:shadow-main/40 hover:-translate-y-0.5"
            >
              <span>{t("Navbar.Login")}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
