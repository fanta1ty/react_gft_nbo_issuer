declare module "casbin.js" {
  export interface Permission {
    [action: string]: string[];
  }
}

export interface AuthorizerOptions {
  endpoint?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}

export class Authorizer {
  constructor(mode: "manual" | "auto", options?: AuthorizerOptions);
  setPermission(permission: Permission): void;
  setUser(user: string): Promise<void>;
  can(action: string, object: string): Promise<boolean>;
  cannot(action: string, object: string): Promise<boolean>;
}
