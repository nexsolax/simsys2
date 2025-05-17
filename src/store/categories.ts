import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  Categories,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../shared/models/category';
export interface CategoriesState {
  categoriesList: Categories[] | undefined;
}

export interface CategoriesActions {
  fetchAllCategories: () => Promise<void>;
  fetchOneCategory: (id: number) => Promise<Categories>;
  createCategory: (category: CreateCategoryRequest) => Promise<any>;
  updateCategory: (category: UpdateCategoryRequest, id: number) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const initialCategories: CategoriesState = {
  categoriesList: [],
};

export function categoriesActions(set: StoreSet): CategoriesActions {
  return {
    fetchAllCategories: async () => {
      try {
        const response = await api.get(ENDPOINTS.CATEGORIES.GET_ALL);
        set((state) => {
          state.categories.categoriesList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneCategory: async (id: number) => {
      try {
        const response = await api.get(ENDPOINTS.CATEGORIES.GET_ONE(id.toString()));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createCategory: async (category: CreateCategoryRequest) => {
      try {
        await api.post(ENDPOINTS.CATEGORIES.CREATE, category);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateCategory: async (category: UpdateCategoryRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.CATEGORIES.UPDATE(id.toString()), category);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteCategory: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.CATEGORIES.DELETE(id.toString()));
        set((state) => {
          state.categories.categoriesList = state.categories.categoriesList?.filter(
            (category: Categories) => category.id !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
