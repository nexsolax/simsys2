import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { ProductDTO } from '../shared/models/product';

export interface ProductsState {
  productsList: any | undefined;
}

export interface ProductsActions {
  fetchAllProducts: () => Promise<void>;
  fetchOneProduct: (id: string) => Promise<void>;
  createProduct: (product: ProductDTO) => Promise<any>;
  updateProduct: (product: ProductDTO, id: number) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const initialProducts: ProductsState = {
  productsList: undefined,
};

export function productsActions(set: StoreSet): ProductsActions {
  return {
    fetchAllProducts: async () => {
      try {
        const response = await api.get(ENDPOINTS.PRODUCT.GET_ALL);
        set((state) => {
          state.products.productsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneProduct: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.PRODUCT.GET_ONE}/${id}`);
        set((state) => {
          state.products.productsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createProduct: async (product: ProductDTO) => {
      try {
        const response = await api.post(ENDPOINTS.PRODUCT.CREATE, product);
        set((state) => {
          state.products.productsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateProduct: async (product: ProductDTO, id: number) => {
      try {
        const response = await api.put(`${ENDPOINTS.PRODUCT.UPDATE}/${id}`, product);
        set((state) => {
          state.products.productsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteProduct: async (id: number) => {
      try {
        const response = await api.delete(`${ENDPOINTS.PRODUCT.DELETE}/${id}`);
        set((state) => {
          state.products.productsList = state.products.productsList.filter(
            (product: any) => product.productid !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
