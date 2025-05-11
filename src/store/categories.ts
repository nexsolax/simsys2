import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

export interface CategoriesState {
  lists: any | undefined;
}

export interface CategoriesActions {
  fetchAllCategories: () => Promise<void>;
  fetchOneCategory: (id: string) => Promise<void>;
}

export const initialCategories: CategoriesState = {
  lists: undefined,
};

export function categoriesActions(set: StoreSet): CategoriesActions {
  return {
    fetchAllCategories: async () => {
      try {
        const response = await api.get(ENDPOINTS.CATEGORIES.GET_ALL);
        set((state) => {
          state.categories.lists = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneCategory: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.CATEGORIES.GET_ONE}/${id}`);
        set((state) => {
          state.categories.lists = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
