import React, { FC, ReactNode } from "react";
import { useAuthorization, useRoleAuthorization } from "@/hooks/useAuthorization";
import { Box, CircularProgress, Alert } from "@mui/material";

interface ProtectedComponentProps {
  children: ReactNode;
  // Resource-based protection
  resource?: string;
  action?: string;
  // Role-based protection
  requiredRole?: string;
  requiredRoles?: string[];
  requireAllRoles?: boolean; // If true, user must have ALL roles. If false, user needs ANY role
  // Fallback components
  loadingComponent?: ReactNode;
  fallbackComponent?: ReactNode;
  // Show error messages
  showError?: boolean;
}

/**
 * Component that conditionally renders children based on user permissions
 * 
 * @example
 * ```tsx
 * // Resource-based protection
 * <ProtectedComponent resource="certificates" action="create">
 *   <CreateCertificateButton />
 * </ProtectedComponent>
 * 
 * // Role-based protection
 * <ProtectedComponent requiredRole="admin">
 *   <AdminPanel />
 * </ProtectedComponent>
 * 
 * // Multiple roles (user needs ANY of these roles)
 * <ProtectedComponent requiredRoles={["admin", "moderator"]}>
 *   <ModeratorPanel />
 * </ProtectedComponent>
 * 
 * // Multiple roles (user needs ALL of these roles)
 * <ProtectedComponent requiredRoles={["admin", "super-admin"]} requireAllRoles>
 *   <SuperAdminPanel />
 * </ProtectedComponent>
 * ```
 */
export const ProtectedComponent: FC<ProtectedComponentProps> = ({
  children,
  resource,
  action,
  requiredRole,
  requiredRoles,
  requireAllRoles = false,
  loadingComponent,
  fallbackComponent,
  showError = false,
}) => {
  // Resource-based authorization
  const resourceAuth = useAuthorization({
    resource: resource || "",
    action: action || "",
    autoCheck: !!(resource && action),
  });

  // Role-based authorization
  const roleAuth = useRoleAuthorization();

  // Determine which authorization method to use
  const isResourceBased = resource && action;
  const isRoleBased = requiredRole || requiredRoles;

  // Loading state
  const isLoading = isResourceBased ? resourceAuth.isLoading : roleAuth.isLoading;
  
  // Error state
  const error = isResourceBased ? resourceAuth.error : roleAuth.error;

  // Access determination
  let hasAccess = false;

  if (isResourceBased) {
    hasAccess = resourceAuth.canAccess;
  } else if (isRoleBased) {
    if (requiredRole) {
      hasAccess = roleAuth.hasRole(requiredRole);
    } else if (requiredRoles) {
      hasAccess = requireAllRoles 
        ? roleAuth.hasAllRoles(requiredRoles)
        : roleAuth.hasAnyRole(requiredRoles);
    }
  } else {
    // No protection specified, allow access
    hasAccess = true;
  }

  // Render loading state
  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  // Render error state
  if (error && showError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Authorization error: {error}
      </Alert>
    );
  }

  // Render content based on access
  if (hasAccess) {
    return <>{children}</>;
  }

  // Render fallback for no access
  return fallbackComponent ? <>{fallbackComponent}</> : null;
};

export default ProtectedComponent;