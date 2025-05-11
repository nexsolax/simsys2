import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { VariantValueDTO } from '../shared/models/variant';

export interface VariantsState {
  variantsList: any | undefined;
  variantsValueList: any | undefined;
}

export interface VariantsActions {
  fetchAllVariants: () => Promise<void>;
  fetchAllVariantsValue: () => Promise<void>;
  fetchOneVariant: (id: string) => Promise<void>;
  fetchOneCategory: (id: string) => Promise<void>;
  createVariant: (name: string) => Promise<any>;
  createVariantValue: (value: string, variantId: number) => Promise<void>;
  deleteVariant: (id: number) => Promise<void>;
  deleteVariantValue: (id: number) => Promise<void>;
  updateVariant: (name: string, id: number) => Promise<void>;
  updateVariantValue: (variantValue: VariantValueDTO, id: number) => Promise<void>;
}

export const initialVariants: VariantsState = {
  variantsList: undefined,
  variantsValueList: undefined,
};

export function variantsActions(set: StoreSet): VariantsActions {
  return {
    fetchAllVariants: async () => {
      try {
        const response = await api.get(ENDPOINTS.VARIANT.GET_ALL);
        set((state) => {
          state.variants.variantsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchAllVariantsValue: async () => {
      try {
        const response = await api.get(ENDPOINTS.VARIANT_VALUE.GET_ALL);
        set((state) => {
          state.variants.variantsValueList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneVariant: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.VARIANT.GET_ONE}/${id}`);
        set((state) => {
          state.variants.variantsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneCategory: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.VARIANT.GET_ONE}/${id}`);
        set((state) => {
          state.variants.variantsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createVariant: async (name: string) => {
      try {
        const body = {
          name,
        };
        const response = await api.post(ENDPOINTS.VARIANT.CREATE, body);
        set((state) => {
          state.variants.variantsList = [...state.variants.variantsList, response.data];
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createVariantValue: async (value: string, variantId: number) => {
      try {
        const body = {
          value,
          variantId,
        };
        await api.post(ENDPOINTS.VARIANT_VALUE.CREATE, body);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteVariant: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.VARIANT.DELETE(id.toString()));
        set((state) => {
          state.variants.variantsList = state.variants.variantsList.filter(
            (variant: any) => variant.variantId !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteVariantValue: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.VARIANT_VALUE.DELETE(id.toString()));
        set((state) => {
          state.variants.variantsValueList = state.variants.variantsValueList.filter(
            (variant: any) => variant.variantValueId !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateVariant: async (name: string, id: number) => {
      try {
        const body = {
          name,
        };
        await api.put(ENDPOINTS.VARIANT.UPDATE(id.toString()), body);
        set((state) => {
          state.variants.variantsList = state.variants.variantsList.map((variant: any) => {
            if (variant.variantId === id) {
              return { ...variant, variantId: id };
            }
            return variant;
          });
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateVariantValue: async (variantValue: VariantValueDTO, id: number) => {
      try {
        const body = variantValue;
        await api.put(ENDPOINTS.VARIANT_VALUE.UPDATE(id.toString()), body);
        set((state) => {
          state.variants.variantsValueList = state.variants.variantsValueList.map(
            (variantValue: any) => {
              if (variantValue.variantValueId === id) {
                return { ...variantValue, variantValueId: id };
              }
              return variantValue;
            },
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
