/**
 * Common Casbin model configurations for different authorization patterns
 */

// Basic RBAC Model (Role-Based Access Control)
export const RBAC_MODEL = `
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
`;

// RBAC with Domains (Multi-tenant)
export const RBAC_WITH_DOMAINS_MODEL = `
[request_definition]
r = sub, dom, obj, act

[policy_definition]
p = sub, dom, obj, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.dom) && r.dom == p.dom && r.obj == p.obj && r.act == p.act
`;

// ABAC Model (Attribute-Based Access Control)
export const ABAC_MODEL = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
`;

// RESTful API Model
export const RESTFUL_MODEL = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`;

// Hierarchical RBAC Model
export const HIERARCHICAL_RBAC_MODEL = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _
g2 = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && g2(r.obj, p.obj) && r.act == p.act
`;

// Example policy configurations for each model
export const EXAMPLE_POLICIES = {
  RBAC: [
    // Role assignments
    { ptype: "g", v0: "alice@company.com", v1: "admin" },
    { ptype: "g", v0: "bob@company.com", v1: "user" },
    { ptype: "g", v0: "charlie@company.com", v1: "moderator" },
    
    // Permissions
    { ptype: "p", v0: "admin", v1: "certificates", v2: "create" },
    { ptype: "p", v0: "admin", v1: "certificates", v2: "read" },
    { ptype: "p", v0: "admin", v1: "certificates", v2: "update" },
    { ptype: "p", v0: "admin", v1: "certificates", v2: "delete" },
    { ptype: "p", v0: "admin", v1: "users", v2: "manage" },
    
    { ptype: "p", v0: "moderator", v1: "certificates", v2: "create" },
    { ptype: "p", v0: "moderator", v1: "certificates", v2: "read" },
    { ptype: "p", v0: "moderator", v1: "certificates", v2: "update" },
    
    { ptype: "p", v0: "user", v1: "certificates", v2: "read" },
  ],
  
  RBAC_WITH_DOMAINS: [
    // Role assignments with domains
    { ptype: "g", v0: "alice@company.com", v1: "admin", v2: "domain1" },
    { ptype: "g", v0: "bob@company.com", v1: "user", v2: "domain1" },
    { ptype: "g", v0: "charlie@company.com", v1: "admin", v2: "domain2" },
    
    // Permissions with domains
    { ptype: "p", v0: "admin", v1: "domain1", v2: "certificates", v3: "create" },
    { ptype: "p", v0: "admin", v1: "domain2", v2: "certificates", v3: "create" },
    { ptype: "p", v0: "user", v1: "domain1", v2: "certificates", v3: "read" },
  ],
  
  ABAC: [
    // Direct user permissions
    { ptype: "p", v0: "alice@company.com", v1: "certificates", v2: "create" },
    { ptype: "p", v0: "bob@company.com", v1: "certificates", v2: "read" },
    { ptype: "p", v0: "charlie@company.com", v1: "users", v2: "manage" },
  ],
  
  RESTFUL: [
    // RESTful API patterns
    { ptype: "g", v0: "alice@company.com", v1: "admin" },
    { ptype: "p", v0: "admin", v1: "/api/certificates/*", v2: "GET|POST|PUT|DELETE" },
    { ptype: "p", v0: "user", v1: "/api/certificates", v2: "GET" },
    { ptype: "p", v0: "user", v1: "/api/certificates/*", v2: "GET" },
  ]
};

export default {
  RBAC_MODEL,
  RBAC_WITH_DOMAINS_MODEL,
  ABAC_MODEL,
  RESTFUL_MODEL,
  HIERARCHICAL_RBAC_MODEL,
  EXAMPLE_POLICIES,
};