import React, { ReactNode } from "react";
import { usePermission } from "@/utils/usePermission";
import { PermissionAction, PermissionResource } from "@/types/casbin";
import { CircularProgress, Box, Alert } from "@mui/material";

interface ProtectedComponentProps {
  action: PermissionAction;
  resource: PermissionResource;
  children: ReactNode;
  fallback?: ReactNode;
  loadingComponent?: ReactNode;
  showError?: boolean;
}

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  action,
  resource,
  children,
  fallback = (
    <Alert severity="warning">
      You don't have permission to access this content.
    </Alert>
  ),
  loadingComponent = (
    <Box display="flex" justifyContent="center" p={2}>
      <CircularProgress size={24} />
    </Box>
  ),
}) => {
  const { hasPermission, isLoading } = usePermission({ action, resource });

  if (isLoading) {
    return <>{loadingComponent}</>;
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>;
};
