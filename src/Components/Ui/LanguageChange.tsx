import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

const LanguageChange = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const languageOptions = [
    { value: "ar", label: "العربية" },
    { value: "en", label: "English" },
  ];

  const toggleLanguage = () => {
    // تغيير اللغة
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);

    // تحديث المسار الحالي
    const segments = location.pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    navigate(newPath, { replace: true });
  };

  // الحصول على اسم اللغة الحالي
  const currentLabel =
    languageOptions.find((opt) => opt.value === i18n.language)?.label ||
    "Language";

  return (
    <button
      onClick={toggleLanguage}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 8,
        border: "1px solid #909090",
        backgroundColor: "#fff",
        color: "#3E8F60",
        cursor: "pointer",
      }}
    >
      {currentLabel}
      <Globe size={16} />
    </button>
  );
};

export default LanguageChange;
