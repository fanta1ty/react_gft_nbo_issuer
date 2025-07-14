import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Types for Casbin policies
export interface CasbinPolicy {
  ptype: string; // Policy type (p, g, etc.)
  v0: string;    // Subject (user/role)
  v1: string;    // Object (resource)
  v2: string;    // Action (read, write, etc.)
  v3?: string;   // Additional attributes
  v4?: string;   // Additional attributes
  v5?: string;   // Additional attributes
}

export interface CasbinModel {
  model: string; // The model configuration
}

// Hook to fetch all policies from backend
export const useGetCasbinPolicies = () => {
  return useQuery({
    queryKey: ["casbin-policies"],
    queryFn: async (): Promise<CasbinPolicy[]> => {
      const response = await axios.get("/api/casbin/policies");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to fetch model configuration from backend
export const useGetCasbinModel = () => {
  return useQuery({
    queryKey: ["casbin-model"],
    queryFn: async (): Promise<CasbinModel> => {
      const response = await axios.get("/api/casbin/model");
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook to fetch policies for a specific user
export const useGetUserPolicies = (userId: string) => {
  return useQuery({
    queryKey: ["user-policies", userId],
    queryFn: async (): Promise<CasbinPolicy[]> => {
      const response = await axios.get(`/api/casbin/user/${userId}/policies`);
      return response.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to add new policy (admin functionality)
export const useAddCasbinPolicy = () => {
  return useMutation({
    mutationFn: async (policy: Omit<CasbinPolicy, 'ptype'> & { ptype?: string }) => {
      const response = await axios.post("/api/casbin/policies", {
        ptype: policy.ptype || "p",
        ...policy
      });
      return response.data;
    },
  });
};

// Hook to remove policy (admin functionality)
export const useRemoveCasbinPolicy = () => {
  return useMutation({
    mutationFn: async (policy: CasbinPolicy) => {
      const response = await axios.delete("/api/casbin/policies", {
        data: policy
      });
      return response.data;
    },
  });
};