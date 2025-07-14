import { casbinState, casbinUserSelector } from "@/recoil/casbin";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getCasbinApiEndpoint,
  initializeCasbin,
  setCasbinUser,
} from "@/utils/casbin";
import { PermissionAction, PermissionResource } from "@/types";

export const useCasbin = () => {
  const [casbin, setCasbin] = useRecoilState(casbinState);
  const userInfo = useRecoilValue(casbinUserSelector);

  const initialize = useCallback(
    async (apiEndpoint?: string) => {
      if (casbin.isInitialized) return;

      setCasbin((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const endpoint = apiEndpoint || getCasbinApiEndpoint();
        const authorizer = await initializeCasbin(endpoint);

        setCasbin((prev) => ({
          ...prev,
          authorizer: authorizer as unknown,
          isInitialized: true,
          isLoading: false,
        }));
      } catch (error) {
        setCasbin((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to initialize Casbin",
        }));
      }
    },
    [casbin.isInitialized, setCasbin],
  );

  const setUser = useCallback(
    async (userId: string) => {
      const authorizer = userInfo.authorizer;
      if (!authorizer) {
        throw new Error("Casbin not initialized");
      }
      setCasbin((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));
      try {
        await setCasbinUser(authorizer, userId);
        setCasbin((prev) => ({
          ...prev,
          currentUser: userId,
          isLoading: false,
        }));
      } catch (error) {
        setCasbin((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to set user",
          isLoading: false,
        }));
      }
    },
    [userInfo.authorizer, setCasbin],
  );

  const canAccess = useCallback(
    async (
      action: PermissionAction,
      resource: PermissionResource,
    ): Promise<boolean> => {
      const authorizer = userInfo.authorizer;
      if (!authorizer || !casbin.isInitialized) {
        return false;
      }
      try {
        return await authorizer.can(action, resource);
      } catch (error) {
        console.error("Permission check failed:", error);
        return false;
      }
    },
    [userInfo.authorizer, casbin.isInitialized],
  );

  return {
    ...userInfo,
    isLoading: casbin.isLoading,
    initialize,
    setUser,
    canAccess,
  };
};
