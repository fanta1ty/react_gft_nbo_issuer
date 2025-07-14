import { PermissionAction, PermissionResource } from "@/types/casbin";
import { useCasbin } from "@/utils/useCasbin";
import { useCallback, useEffect, useState } from "react";

interface UsePermissionOptions {
  action: PermissionAction;
  resource: PermissionResource;
  autoCheck?: boolean;
}

export const usePermission = ({
  action,
  resource,
  autoCheck = true,
}: UsePermissionOptions) => {
  const { canAccess, isReady } = useCasbin();
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(autoCheck);

  const checkPermission = useCallback(async () => {
    if (!isReady) return;

    try {
      setIsLoading(true);
      const result = await canAccess(action, resource);
      setHasPermission(result);
    } catch (error) {
      console.error(`Permission check error:`, error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  }, [canAccess, action, resource, isReady]);

  useEffect(() => {
    if (autoCheck && isReady) {
      checkPermission();
    }
  }, [autoCheck, isReady, checkPermission]);

  return {
    hasPermission,
    isLoading,
    checkPermission,
  };
};
