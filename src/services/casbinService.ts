import { Enforcer, newEnforcer } from "casbin.js";
import { CasbinPolicy, CasbinModel } from "@/api/useCasbinPolicies";

class CasbinService {
  private enforcer: Enforcer | null = null;
  private isInitialized = false;

  /**
   * Initialize Casbin enforcer with model and policies from backend
   */
  async initialize(model: string, policies: CasbinPolicy[]): Promise<void> {
    try {
      // Create enforcer with model configuration
      this.enforcer = await newEnforcer(model);
      
      // Add all policies to enforcer
      for (const policy of policies) {
        const policyRule = [
          policy.v0, // subject (user/role)
          policy.v1, // object (resource)
          policy.v2, // action
          ...(policy.v3 ? [policy.v3] : []),
          ...(policy.v4 ? [policy.v4] : []),
          ...(policy.v5 ? [policy.v5] : [])
        ].filter(Boolean);

        if (policy.ptype === "p") {
          await this.enforcer.addPolicy(...policyRule);
        } else if (policy.ptype === "g") {
          await this.enforcer.addRoleForUser(policy.v0, policy.v1);
        }
      }

      this.isInitialized = true;
      console.log("Casbin enforcer initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Casbin enforcer:", error);
      throw error;
    }
  }

  /**
   * Check if user has permission for a specific action on a resource
   */
  async enforce(subject: string, object: string, action: string): Promise<boolean> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return false;
    }

    try {
      const result = await this.enforcer.enforce(subject, object, action);
      return result;
    } catch (error) {
      console.error("Error enforcing policy:", error);
      return false;
    }
  }

  /**
   * Get all roles for a user
   */
  async getRolesForUser(user: string): Promise<string[]> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return [];
    }

    try {
      return await this.enforcer.getRolesForUser(user);
    } catch (error) {
      console.error("Error getting roles for user:", error);
      return [];
    }
  }

  /**
   * Get all users with a specific role
   */
  async getUsersForRole(role: string): Promise<string[]> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return [];
    }

    try {
      return await this.enforcer.getUsersForRole(role);
    } catch (error) {
      console.error("Error getting users for role:", error);
      return [];
    }
  }

  /**
   * Get all permissions for a user
   */
  async getPermissionsForUser(user: string): Promise<string[][]> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return [];
    }

    try {
      return await this.enforcer.getPermissionsForUser(user);
    } catch (error) {
      console.error("Error getting permissions for user:", error);
      return [];
    }
  }

  /**
   * Add policy dynamically (requires backend sync)
   */
  async addPolicy(subject: string, object: string, action: string): Promise<boolean> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return false;
    }

    try {
      return await this.enforcer.addPolicy(subject, object, action);
    } catch (error) {
      console.error("Error adding policy:", error);
      return false;
    }
  }

  /**
   * Remove policy dynamically (requires backend sync)
   */
  async removePolicy(subject: string, object: string, action: string): Promise<boolean> {
    if (!this.enforcer || !this.isInitialized) {
      console.warn("Casbin enforcer not initialized");
      return false;
    }

    try {
      return await this.enforcer.removePolicy(subject, object, action);
    } catch (error) {
      console.error("Error removing policy:", error);
      return false;
    }
  }

  /**
   * Check if enforcer is initialized
   */
  isReady(): boolean {
    return this.isInitialized && this.enforcer !== null;
  }

  /**
   * Reset the enforcer (useful for re-initialization)
   */
  reset(): void {
    this.enforcer = null;
    this.isInitialized = false;
  }
}

// Export singleton instance
export const casbinService = new CasbinService();
export default casbinService;