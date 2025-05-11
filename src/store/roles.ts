import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

export interface RolesState {
  rolesList: any | undefined;
}

export interface RolesActions {
  fetchAllRoles: () => Promise<void>;
  createRole: (name: string, desc: string) => Promise<void>;
  updateRole: (id: number, name: string, desc: string) => Promise<void>;
  deleteRole: (id: number) => Promise<void>;
}

export const initialRoles: RolesState = {
  rolesList: undefined,
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
    createRole: async (name: string, desc: string) => {
      try {
        const body = {
          roleName: name,
          description: desc,
        };
        const response = await api.post(ENDPOINTS.ROLE.CREATE, body);
        set((state) => {
          state.roles.rolesList = [...state.roles.rolesList, response.data];
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateRole: async (id: number, name: string, desc: string) => {
      try {
        const body = {
          roleName: name,
          description: desc,
        };
        await api.put(ENDPOINTS.ROLE.UPDATE(id.toString()), body);
        set((state) => {
          state.roles.rolesList = state.roles.rolesList.map((role: any) => {
            if (role.roleId === id) {
              return { ...role, roleId: id };
            }
            return role;
          });
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteRole: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.ROLE.DELETE(id.toString()));
        set((state) => {
          state.roles.rolesList = state.roles.rolesList.filter((role: any) => role.roleId !== id);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
