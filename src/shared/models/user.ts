export interface Users {
  id: number;
  username: string;
  email: string;
  contactInfo: string;
  guid: string;
  roleGuid: string;
  active: boolean;
}

export interface UserCreateRequest {
  username: string;
  password: string;
  email: string;
  contactInfo: string;
  isActive: boolean;
  roleGuid: string;
}

export interface UserUpdateRequest {
  username: string;
  password: string;
  email: string;
  contactInfo: string;
  isActive: boolean;
  roleGuid: string;
}
