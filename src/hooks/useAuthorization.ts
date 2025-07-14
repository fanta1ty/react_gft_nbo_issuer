import { useState, useEffect, useCallback } from "react";
import { useCasbinContext } from "@/contexts/CasbinContext";

interface UseAuthorizationProps {
  resource: string;
  action: string;
  // Optional: auto-check on mount
  autoCheck?: boolean;
}

interface UseAuthorizationReturn {
  canAccess: boolean;
  isLoading: boolean;
  error: string | null;
  checkAccess: () => Promise<boolean>;
}

/**
 * Hook for checking user authorization for specific resources and actions
 * 
 * @example
 * ```tsx
 * const { canAccess, isLoading } = useAuthorization({
 *   resource: "certificates",
 *   action: "create",
 *   autoCheck: true
 * });
 * 
 * if (isLoading) return <Spinner />;
 * if (!canAccess) return <AccessDenied />;
 * return <CreateCertificateButton />;
 * ```
 */
export const useAuthorization = ({ 
  resource, 
  action, 
  autoCheck = true 
}: UseAuthorizationProps): UseAuthorizationReturn => {
  const [canAccess, setCanAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(autoCheck);
  const [error, setError] = useState<string | null>(null);
  
  const { canAccess: casbinCanAccess, isInitialized } = useCasbinContext();

  const checkAccess = useCallback(async (): Promise<boolean> => {
    if (!isInitialized) {
      setCanAccess(false);
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const hasAccess = await casbinCanAccess(resource, action);
      setCanAccess(hasAccess);
      setIsLoading(false);
      return hasAccess;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authorization check failed";
      setError(errorMessage);
      setCanAccess(false);
      setIsLoading(false);
      return false;
    }
  }, [resource, action, casbinCanAccess, isInitialized]);

  // Auto-check on mount and when dependencies change
  useEffect(() => {
    if (autoCheck && isInitialized) {
      checkAccess();
    }
  }, [autoCheck, isInitialized, checkAccess]);

  return {
    canAccess,
    isLoading,
    error,
    checkAccess,
  };
};

/**
 * Hook for checking multiple permissions at once
 * 
 * @example
 * ```tsx
 * const permissions = useMultipleAuthorizations([
 *   { resource: "certificates", action: "read" },
 *   { resource: "certificates", action: "create" },
 *   { resource: "users", action: "manage" }
 * ]);
 * 
 * const canRead = permissions[0]?.canAccess;
 * const canCreate = permissions[1]?.canAccess;
 * const canManageUsers = permissions[2]?.canAccess;
 * ```
 */
export const useMultipleAuthorizations = (
  permissions: Array<{ resource: string; action: string }>
): UseAuthorizationReturn[] => {
  return permissions.map(({ resource, action }) => 
    useAuthorization({ resource, action, autoCheck: true })
  );
};

/**
 * Hook for role-based authorization
 * 
 * @example
 * ```tsx
 * const { hasRole, userRoles, isLoading } = useRoleAuthorization();
 * 
 * if (hasRole("admin")) {
 *   return <AdminPanel />;
 * }
 * ```
 */
export const useRoleAuthorization = () => {
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { getUserRoles, isInitialized } = useCasbinContext();

  const fetchRoles = useCallback(async () => {
    if (!isInitialized) {
      setUserRoles([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const roles = await getUserRoles();
      setUserRoles(roles);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch user roles";
      setError(errorMessage);
      setUserRoles([]);
      setIsLoading(false);
    }
  }, [getUserRoles, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      fetchRoles();
    }
  }, [isInitialized, fetchRoles]);

  const hasRole = useCallback((role: string): boolean => {
    return userRoles.includes(role);
  }, [userRoles]);

  const hasAnyRole = useCallback((roles: string[]): boolean => {
    return roles.some(role => userRoles.includes(role));
  }, [userRoles]);

  const hasAllRoles = useCallback((roles: string[]): boolean => {
    return roles.every(role => userRoles.includes(role));
  }, [userRoles]);

  return {
    userRoles,
    isLoading,
    error,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    refetch: fetchRoles,
  };
};

export default useAuthorization;