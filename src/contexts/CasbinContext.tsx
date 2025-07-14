import React, { createContext, useContext, useEffect, useState, FC, PropsWithChildren } from "react";
import { useGetCasbinPolicies, useGetCasbinModel } from "@/api/useCasbinPolicies";
import { casbinService } from "@/services/casbinService";
import { useAuthContext } from "@/router/Auth/useAuthContext";

interface CasbinContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  canAccess: (resource: string, action: string) => Promise<boolean>;
  getUserRoles: () => Promise<string[]>;
  getUserPermissions: () => Promise<string[][]>;
  refresh: () => void;
}

const CasbinContext = createContext<CasbinContextType | undefined>(undefined);

export const useCasbinContext = (): CasbinContextType => {
  const context = useContext(CasbinContext);
  if (!context) {
    throw new Error("useCasbinContext must be used within a CasbinProvider");
  }
  return context;
};

interface CasbinProviderProps extends PropsWithChildren {
  // Optional: provide default model if backend doesn't have one
  defaultModel?: string;
}

export const CasbinProvider: FC<CasbinProviderProps> = ({ 
  children, 
  defaultModel = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
` }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { email, isSuccess: isAuthSuccess } = useAuthContext();

  // Fetch policies and model from backend
  const {
    data: policies,
    isLoading: isPoliciesLoading,
    error: policiesError,
    refetch: refetchPolicies
  } = useGetCasbinPolicies();

  const {
    data: modelData,
    isLoading: isModelLoading,
    error: modelError,
    refetch: refetchModel
  } = useGetCasbinModel();

  const isLoading = isPoliciesLoading || isModelLoading;

  // Initialize Casbin when data is ready
  useEffect(() => {
    const initializeCasbin = async () => {
      if (!isAuthSuccess || !policies || isLoading) {
        return;
      }

      try {
        setError(null);
        setIsInitialized(false);

        // Use model from backend or fallback to default
        const model = modelData?.model || defaultModel;
        
        // Initialize Casbin service
        await casbinService.initialize(model, policies);
        setIsInitialized(true);

        console.log("Casbin initialized with", policies.length, "policies");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to initialize Casbin";
        setError(errorMessage);
        console.error("Casbin initialization error:", err);
      }
    };

    initializeCasbin();
  }, [policies, modelData, isLoading, isAuthSuccess, defaultModel]);

  // Handle errors
  useEffect(() => {
    if (policiesError || modelError) {
      const errorMessage = 
        policiesError?.message || 
        modelError?.message || 
        "Failed to fetch Casbin configuration";
      setError(errorMessage);
    }
  }, [policiesError, modelError]);

  // Context methods
  const canAccess = async (resource: string, action: string): Promise<boolean> => {
    if (!isInitialized || !email) {
      return false;
    }

    try {
      return await casbinService.enforce(email, resource, action);
    } catch (err) {
      console.error("Error checking access:", err);
      return false;
    }
  };

  const getUserRoles = async (): Promise<string[]> => {
    if (!isInitialized || !email) {
      return [];
    }

    try {
      return await casbinService.getRolesForUser(email);
    } catch (err) {
      console.error("Error getting user roles:", err);
      return [];
    }
  };

  const getUserPermissions = async (): Promise<string[][]> => {
    if (!isInitialized || !email) {
      return [];
    }

    try {
      return await casbinService.getPermissionsForUser(email);
    } catch (err) {
      console.error("Error getting user permissions:", err);
      return [];
    }
  };

  const refresh = () => {
    casbinService.reset();
    setIsInitialized(false);
    setError(null);
    refetchPolicies();
    refetchModel();
  };

  const contextValue: CasbinContextType = {
    isInitialized,
    isLoading,
    error,
    canAccess,
    getUserRoles,
    getUserPermissions,
    refresh,
  };

  return (
    <CasbinContext.Provider value={contextValue}>
      {children}
    </CasbinContext.Provider>
  );
};

export default CasbinProvider;