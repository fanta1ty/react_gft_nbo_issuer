import { PermissionAction, PermissionResource } from "@/types/casbin";
import { useCasbin } from "@/utils/useCasbin";
import { useEffect, useState } from "react";

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

  const checkPermission = async () => {
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
  };

  useEffect(() => {
    if (autoCheck && isReady) {
      checkPermission();
    }
  }, [action, resource, isReady, autoCheck]);

  return {
    hasPermission,
    isLoading,
    checkPermission,
  };
};
