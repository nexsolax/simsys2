export interface Roles {
  id: number;
  guid: string;
  roleName: string;
  description: string;
}

export interface RoleCreateRequest {
  roleName: string;
  description: string;
}

export interface RoleUpdateRequest {
  roleName: string;
  description: string;
}
