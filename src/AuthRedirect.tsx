import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const token = localStorage.getItem("N8NCentral_token");

  if (token) {
    return (
      <Navigate to={`/${localStorage.getItem("i18nextLng") || "ar"}`} replace />
    );
  }

  return <>{children}</>;
};

export default AuthRedirect;
