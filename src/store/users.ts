import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { User, UserCreateDTO, UserUpdateDTO } from '../shared/models/user';

export interface UsersState {
  usersList: User[] | undefined;
}

export interface UsersActions {
  fetchAllUsers: () => Promise<void>;
  createUser: (user: UserCreateDTO) => Promise<void>;
  updateUser: (id: number, user: UserUpdateDTO) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const initialUsers: UsersState = {
  usersList: undefined,
};

export function usersActions(set: StoreSet): UsersActions {
  return {
    fetchAllUsers: async () => {
      try {
        const response = await api.get(ENDPOINTS.USER.GET_ALL);
        set((state) => {
          state.users.usersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createUser: async (user: UserCreateDTO) => {
      try {
        const response = await api.post(ENDPOINTS.USER.CREATE, user);
        set((state) => {
          state.users.usersList = [...state.users.usersList!, response.data];
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateUser: async (id: number, user: UserUpdateDTO) => {
      try {
        await api.put(ENDPOINTS.USER.UPDATE(id.toString()), user);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteUser: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.USER.DELETE(id.toString()));
        set((state) => {
          state.users.usersList = state.users.usersList!.filter((user: any) => user.userId !== id);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
