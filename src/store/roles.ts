import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { Roles, RoleCreateRequest, RoleUpdateRequest } from '../shared/models/role';

export interface RolesState {
  rolesList: Roles[] | undefined;
}

export interface RolesActions {
  fetchAllRoles: () => Promise<void>;
  createRole: (role: RoleCreateRequest) => Promise<void>;
  updateRole: (id: number, roleUpdated: RoleUpdateRequest) => Promise<void>;
  deleteRole: (id: number) => Promise<void>;
}

export const initialRoles: RolesState = {
  rolesList: [],
};

export function rolesActions(set: StoreSet): RolesActions {
  return {
    fetchAllRoles: async () => {
      try {
        const response = await api.get(ENDPOINTS.ROLE.GET_ALL);
        set((state) => {
          state.roles.rolesList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createRole: async (role: RoleCreateRequest) => {
      try {
        await api.post(ENDPOINTS.ROLE.CREATE, role);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateRole: async (id: number, roleUpdated: RoleUpdateRequest) => {
      try {
        await api.put(ENDPOINTS.ROLE.UPDATE(id.toString()), roleUpdated);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteRole: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.ROLE.DELETE(id.toString()));
        set((state) => {
          state.roles.rolesList = state.roles.rolesList?.filter((role: Roles) => role.id !== id);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
