import React from "react";
import { Button, Alert, Card, CardContent, Typography } from "@mui/material";
import { ProtectedComponent } from "@/components/Authorization";
import { useAuthorization, useRoleAuthorization } from "@/hooks/useAuthorization";
import { useCasbinContext } from "@/contexts/CasbinContext";

// Example 1: Simple resource protection
export const CreateCertificateExample = () => {
  return (
    <ProtectedComponent 
      resource="certificates" 
      action="create"
      fallbackComponent={<Alert severity="info">You don't have permission to create certificates</Alert>}
    >
      <Button variant="contained" color="primary">
        Create Certificate
      </Button>
    </ProtectedComponent>
  );
};

// Example 2: Role-based protection  
export const AdminPanelExample = () => {
  return (
    <ProtectedComponent 
      requiredRole="admin"
      fallbackComponent={<Alert severity="warning">Admin access required</Alert>}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">Admin Panel</Typography>
          <Typography>Welcome to the admin dashboard!</Typography>
        </CardContent>
      </Card>
    </ProtectedComponent>
  );
};

// Example 3: Multiple roles (user needs ANY of these roles)
export const ModeratorPanelExample = () => {
  return (
    <ProtectedComponent 
      requiredRoles={["admin", "moderator", "super-admin"]}
      fallbackComponent={<Alert severity="warning">Moderator access required</Alert>}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">Moderator Panel</Typography>
          <Typography>Content management tools</Typography>
        </CardContent>
      </Card>
    </ProtectedComponent>
  );
};

// Example 4: Using authorization hooks directly
export const CustomAuthorizationExample = () => {
  const { canAccess, isLoading, checkAccess } = useAuthorization({
    resource: "users",
    action: "delete",
    autoCheck: true
  });

  const { hasRole, userRoles } = useRoleAuthorization();

  if (isLoading) {
    return <Typography>Checking permissions...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">User Management</Typography>
        <Typography>Your roles: {userRoles.join(", ")}</Typography>
        
        {canAccess && (
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => console.log("Delete user")}
          >
            Delete User
          </Button>
        )}
        
        {hasRole("admin") && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => console.log("Admin action")}
          >
            Admin Action
          </Button>
        )}
        
        <Button onClick={checkAccess}>
          Re-check Access
        </Button>
      </CardContent>
    </Card>
  );
};

// Example 5: Dynamic permission checking
export const DynamicPermissionExample = () => {
  const { canAccess } = useCasbinContext();
  const [resource, setResource] = React.useState("certificates");
  const [action, setAction] = React.useState("read");
  const [hasPermission, setHasPermission] = React.useState(false);

  const checkPermission = async () => {
    const result = await canAccess(resource, action);
    setHasPermission(result);
  };

  React.useEffect(() => {
    checkPermission();
  }, [resource, action]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Dynamic Permission Check</Typography>
        <Typography>
          Resource: {resource}, Action: {action}
        </Typography>
        <Typography>
          Has Permission: {hasPermission ? "✅ Yes" : "❌ No"}
        </Typography>
        
        <Button onClick={() => setResource("users")}>
          Check Users
        </Button>
        <Button onClick={() => setAction("create")}>
          Check Create
        </Button>
      </CardContent>
    </Card>
  );
};

// Example 6: Error handling and loading states
export const RobustAuthorizationExample = () => {
  const { canAccess, isLoading, error } = useAuthorization({
    resource: "reports",
    action: "view"
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography>Checking authorization...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Authorization error: {error}
      </Alert>
    );
  }

  if (!canAccess) {
    return (
      <Alert severity="warning">
        You don't have permission to view reports
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Reports Dashboard</Typography>
        <Typography>Here are your reports...</Typography>
      </CardContent>
    </Card>
  );
};

// Main example component
export const CasbinExamples = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography variant="h4">Casbin Authorization Examples</Typography>
      
      <CreateCertificateExample />
      <AdminPanelExample />
      <ModeratorPanelExample />
      <CustomAuthorizationExample />
      <DynamicPermissionExample />
      <RobustAuthorizationExample />
    </div>
  );
};

export default CasbinExamples;