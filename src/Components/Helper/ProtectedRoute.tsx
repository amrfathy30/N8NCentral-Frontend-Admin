import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { selectCurrentToken } from "../../store/Slices/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useSelector(selectCurrentToken);

  if (!token) {
    const currentLang = localStorage.getItem("i18nextLng") || "ar";
    return <Navigate to={`/${currentLang}/admin/login`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
