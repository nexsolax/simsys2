export interface User {
  userId: number;
  username: string;
  email: string;
  contactInfo: string;
  createdDate: string;
  status: boolean;
  roleId: number;
}

export interface UserDTO {
  userId: number;
  username: string;
  email: string;
  contactInfo: string;
  createdDate: string;
  status: boolean;
  roleId: number;
}

export interface UserCreateDTO {
  username: string;
  email: string;
  contactInfo: string;
  roleId: number;
  status: boolean;
  createdDate: string;
}

export interface UserUpdateDTO {
  username: string;
  email: string;
  contactInfo: string;
  roleId: number;
  status: boolean;
}
