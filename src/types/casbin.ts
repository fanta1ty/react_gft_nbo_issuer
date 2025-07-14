export interface CasbinPermission {
  [action: string]: string[];
}
export interface CasbinAuthorizerOptions {
  endpoint?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}

export interface CasbinUser {
  id: string;
  permission?: CasbinPermission;
}

export interface CasbinState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  currentUser: string | null;
  authorizer: unknown;
}

export type PermissionAction =
  | "read"
  | "write"
  | "delete"
  | "assign"
  | "approve"
  | "reject"
  | "invite"
  | "upload"
  | "download"
  | "publish"
  | "admin";

export type PermissionResource =
  // Certificates Management
  | "certificates"
  | "certificate_assignments"
  | "certificate_downloads"

  // People Management
  | "candidates"
  | "students"
  | "representatives"
  | "issuer_profiles"

  // Document & File Management
  | "documents"
  | "file_uploads"
  | "images"

  // System Areas
  | "dashboard"
  | "reports"
  | "analytics"
  | "profile"
  | "settings"

  // Workflows
  | "onboarding"
  | "invitations"
  | "approvals"
  | "notifications"

  // Administrative
  | "system_admin"
  | "user_management"
  | "organization_settings";
