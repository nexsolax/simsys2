import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateSupplierDTO, SupplierDTO, UpdateSupplierDTO } from '../shared/models/supplier';

export interface SuppliersState {
  suppliersList: any | undefined;
}

export interface SuppliersActions {
  fetchAllSuppliers: () => Promise<void>;
  fetchOneSupplier: (id: string) => Promise<void>;
  createSupplier: (supplier: CreateSupplierDTO) => Promise<any>;
  updateSupplier: (supplier: UpdateSupplierDTO, id: number) => Promise<void>;
  deleteSupplier: (id: number) => Promise<void>;
}

export const initialSuppliers: SuppliersState = {
  suppliersList: undefined,
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
        set((state) => {
          state.suppliers.suppliersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createSupplier: async (supplier: CreateSupplierDTO) => {
      try {
        const response = await api.post(ENDPOINTS.SUPPLIER.CREATE, supplier);
        set((state) => {
          state.suppliers.suppliersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateSupplier: async (supplier: UpdateSupplierDTO, id: number) => {
      try {
        const response = await api.put(`${ENDPOINTS.SUPPLIER.UPDATE(id.toString())}`, supplier);
        set((state) => {
          state.suppliers.suppliersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteSupplier: async (id: number) => {
      try {
        const response = await api.delete(`${ENDPOINTS.SUPPLIER.DELETE(id.toString())}`);
        set((state) => {
          state.suppliers.suppliersList = state.suppliers.suppliersList.filter(
            (supplier: any) => supplier.supplierId !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
