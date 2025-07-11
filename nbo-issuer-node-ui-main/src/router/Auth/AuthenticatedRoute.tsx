import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppRoutes } from "../routes";
import useAuthContext from "./useAuthContext";

const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isSuccess } = useAuthContext();
  const location = useLocation();

  if (isSuccess) {
    return children;
  }

  return (
    <Navigate to={`${AppRoutes.LOGIN}?from=${location.pathname}`} replace />
  );
};

export default AuthenticatedRoute;
