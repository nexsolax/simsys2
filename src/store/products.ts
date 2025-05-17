import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateProductRequest, Products, UpdateProductRequest } from '../shared/models/product';

export interface ProductsState {
  productsList: Products[] | undefined;
}

export interface ProductsActions {
  fetchAllProducts: () => Promise<void>;
  fetchOneProduct: (id: number) => Promise<Products>;
  createProduct: (product: CreateProductRequest) => Promise<any>;
  updateProduct: (product: UpdateProductRequest, id: number) => Promise<void>;
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
    fetchOneProduct: async (id: number) => {
      try {
        const response = await api.get(ENDPOINTS.PRODUCT.GET_ONE(id.toString()));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createProduct: async (product: CreateProductRequest) => {
      try {
        await api.post(ENDPOINTS.PRODUCT.CREATE, product);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateProduct: async (product: UpdateProductRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.PRODUCT.UPDATE(id.toString()), product);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteProduct: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.PRODUCT.DELETE(id.toString()));
        set((state) => {
          state.products.productsList = state.products.productsList?.filter(
            (product: Products) => product.id !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
