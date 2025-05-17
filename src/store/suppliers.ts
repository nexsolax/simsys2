import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateSupplierRequest, Suppliers, UpdateSupplierRequest } from '../shared/models/supplier';

export interface SuppliersState {
  suppliersList: Suppliers[] | undefined;
}

export interface SuppliersActions {
  fetchAllSuppliers: () => Promise<void>;
  fetchOneSupplier: (id: string) => Promise<Suppliers>;
  createSupplier: (supplier: CreateSupplierRequest) => Promise<any>;
  updateSupplier: (supplier: UpdateSupplierRequest, id: string) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
}

export const initialSuppliers: SuppliersState = {
  suppliersList: [],
};

export function suppliersActions(set: StoreSet): SuppliersActions {
  return {
    fetchAllSuppliers: async () => {
      try {
        const response = await api.get(ENDPOINTS.SUPPLIER.GET_ALL);
        set((state) => {
          state.suppliers.suppliersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneSupplier: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.SUPPLIER.GET_ONE}/${id}`);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createSupplier: async (supplier: CreateSupplierRequest) => {
      try {
        await api.post(ENDPOINTS.SUPPLIER.CREATE, supplier);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateSupplier: async (supplier: UpdateSupplierRequest, id: string) => {
      try {
        await api.put(ENDPOINTS.SUPPLIER.UPDATE(id), supplier);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteSupplier: async (id: string) => {
      try {
        const response = await api.delete(ENDPOINTS.SUPPLIER.DELETE(id));
        set((state) => {
          state.suppliers.suppliersList = state.suppliers.suppliersList?.filter(
            (supplier: Suppliers) => supplier.guid !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
