import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "../../../Components/Ui/Input";
import Button from "../../../Components/Ui/Button";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { showToastSuccess } from "../../../Components/Ui/ToastHelper";

export default function Login() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const lang = localStorage.getItem("i18nextLng") || "en"
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Login data:", data);
    showToastSuccess(t("Auth.Login.LoginSuccess"))
    navigate(`/${lang}/admin/dashboard`)
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
      dir={dir}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-main tracking-tight">
            {t("Auth.Login.Title")}
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            {t("Auth.Login.Description")}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label={t("Auth.Login.EmailLabel")}
              type="email"
              icon={Mail}
              placeholder={t("Auth.Login.EmailPlaceholder")}
              error={errors.email as { message: string }}
              {...register("email", {
                required: t("Auth.Login.EmailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("Auth.Login.InvalidEmail"),
                },
              })}
            />

            <Input
              label={t("Auth.Login.PasswordLabel")}
              type="password"
              icon={Lock}
              placeholder={t("Auth.Login.PasswordPlaceholder")}
              error={errors.password as { message: string }}
              {...register("password", {
                required: t("Auth.Login.PasswordRequired"),
              })}
            />
          </div>

          <div className="flex items-center justify-start">
            <Link
              to={`/${i18n.language}/admin/forget-password`}
              className="text-sm font-semibold text-main hover:text-opacity-80 transition-all"
            >
              {t("Auth.Login.ForgetPassword")}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full py-4 rounded-2xl text-[18px] font-bold shadow-lg shadow-main/20 hover:shadow-main/40 transition-shadow"
          >
            {t("Auth.Login.SignIn")}
          </Button>
        </form>
      </div>
    </div>
  );
}
