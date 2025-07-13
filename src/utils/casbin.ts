import casbinjs, { Authorizer } from "casbin.js";
import { PermissionAction, PermissionResource } from "../types/casbin";

export const initializeCasbin = async (
  apiEndpoint: string,
): Promise<Authorizer> => {
  try {
    const authorizer = new casbinjs.Authorizer("auto", {
      endpoint: `${apiEndpoint}/api/casbin`,
    });
    return authorizer;
  } catch (error) {
    console.error("Failed to initialize Casbin:", error);
    throw error;
  }
};

export const checkPermission = async (
  authorizer: Authorizer,
  action: PermissionAction,
  resource: PermissionResource,
): Promise<boolean> => {
  try {
    return await authorizer.can(action, resource);
  } catch (error) {
    console.error("Permission check failed:", error);
    return false;
  }
};

export const setCasbinUser = async (
  authorizer: Authorizer,
  userId: string,
): Promise<void> => {
  try {
    await authorizer.setUser(userId);
  } catch (error) {
    console.error("Failed to set Casbin user:", error);
    throw error;
  }
};

export const getCasbinApiEndpoint = (): string => {
  return import.meta.env.VITE_ISSUER_API_URL || "http://localhost:3001";
};
