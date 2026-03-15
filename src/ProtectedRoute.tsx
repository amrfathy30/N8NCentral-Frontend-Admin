/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { ReactNode } from "react";
interface AuthRedirectProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: AuthRedirectProps) => {
  const tokenLocal = localStorage.getItem("N8NCentral_token");
  const tokenCookie = Cookies.get("N8NCentral_token");

  if (!tokenLocal && !tokenCookie) {
    return (
      <Navigate
        to={`/${localStorage.getItem("i18nextLng") || "ar"}/login`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
