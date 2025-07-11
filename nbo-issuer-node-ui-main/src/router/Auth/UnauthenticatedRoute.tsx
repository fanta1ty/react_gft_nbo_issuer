import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../routes";
import useAuthContext from "./useAuthContext";

const UnauthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isSuccess } = useAuthContext();

  if (isSuccess) {
    return <Navigate to={AppRoutes.ROOT} replace />;
  }

  return children;
};

export default UnauthenticatedRoute;
