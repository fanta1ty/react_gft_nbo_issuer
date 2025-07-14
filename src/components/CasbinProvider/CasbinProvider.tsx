import React, { useEffect, ReactNode } from "react";
import { useCasbin } from "@/utils/useCasbin";
import useSnackbar from "@/utils/useSnackbar";
import useAuthContext from "@/router/Auth/useAuthContext";

interface CasbinProviderProps {
  children: ReactNode;
}

export const CasbinProvider: React.FC<CasbinProviderProps> = ({ children }) => {
  const { initialize, setUser, hasError, error, isReady } = useCasbin();
  const { show } = useSnackbar();

  const authContext = useAuthContext();
  const isAuthenticated = authContext.isSuccess;
  const isAuthLoading = authContext.isLoading;
  const userId = authContext.id;
  const userEmail = authContext.email;

  useEffect(() => {
    const initCasbin = async () => {
      try {
        await initialize();
        const currentUserId = getCurrentUserId();
        if (currentUserId) {
          await setUser(currentUserId);
        }
      } catch (error) {
        console.error("Failed to initialize Casbin:", error);
        show("Failed to initialize permissions");
      }
    };

    initCasbin();
  }, [initialize, setUser, show]);

  // Show error if Casbin fails
  useEffect(() => {
    if (hasError && error) {
      show(`Permission system error: ${error}`);
    }
  }, [hasError, error, show]);

  return <>{children}</>;
};

const getCurrentUserId = (): string | null => {
  return localStorage.getItem("userId") || "guest";
};
