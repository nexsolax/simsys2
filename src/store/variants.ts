import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateVariantRequest, UpdateVariantRequest, Variant } from '../shared/models/variant';

export interface VariantsState {
  variantsList: Variant[] | undefined;
}

export interface VariantsActions {
  fetchAllVariants: () => Promise<void>;
  fetchOneVariant: (id: string) => Promise<Variant>;
  createVariant: (variant: CreateVariantRequest) => Promise<any>;
  deleteVariant: (id: number) => Promise<void>;
  updateVariant: (variant: UpdateVariantRequest, id: number) => Promise<void>;
}

export const initialVariants: VariantsState = {
  variantsList: [],
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
    fetchOneVariant: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.VARIANT.GET_ONE}/${id}`);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createVariant: async (variant: CreateVariantRequest) => {
      try {
        await api.post(ENDPOINTS.VARIANT.CREATE, variant);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateVariant: async (variant: UpdateVariantRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.VARIANT.UPDATE(id.toString()), variant);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteVariant: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.VARIANT.DELETE(id.toString()));
        set((state) => {
          state.variants.variantsList = state.variants.variantsList?.filter(
            (variant: Variant) => variant.id !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
