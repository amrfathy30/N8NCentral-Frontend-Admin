import { useTranslation } from "react-i18next";
import ButtonLink from "../../Components/Ui/ButtonLink";

export default function NotFound() {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng") || "ar";

  return (
    <div className="flex flex-col items-center justify-center py-10 text-main text-center px-4">
      <img src="/logo.png" alt={t("notFound.logoAlt")} />
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">{t("notFound.title")}</h2>
      <p className="text-lg mb-8">{t("notFound.description")}</p>

      <ButtonLink
        className="rounded-xl px-8 py-3 font-semibold"
        to={`/${lang}/admin/dashboard`}
      >
        {t("notFound.backToHome")}
      </ButtonLink>
    </div>
  );
}
