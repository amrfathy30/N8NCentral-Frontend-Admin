import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { selectCurrentToken } from "../../store/Slices/authSlice";

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const currentLang = localStorage.getItem("i18nextLng") || "ar";
    return <Navigate to={`/${currentLang}/admin/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect;