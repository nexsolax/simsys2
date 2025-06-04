import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  CreateInventoryRequest,
  Inventories,
  UpdateInventoryRequest,
} from '../shared/models/inventory';

export interface InventoriesState {
  inventoriesList: Inventories[] | undefined;
}

export interface InventoriesActions {
  fetchAllInventories: () => Promise<void>;
  fetchOneInventory: (id: number) => Promise<Inventories>;
  createInventory: (inventory: CreateInventoryRequest) => Promise<any>;
  updateInventory: (inventory: UpdateInventoryRequest, id: string) => Promise<void>;
  deleteInventory: (id: string) => Promise<void>;
}

export const initialInventories: InventoriesState = {
  inventoriesList: undefined,
};

export function inventoriesActions(set: StoreSet): InventoriesActions {
  return {
    fetchAllInventories: async () => {
      try {
        const response = await api.get(ENDPOINTS.INVENTORY.GET_ALL);
        set((state) => {
          state.inventories.inventoriesList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneInventory: async (id: number) => {
      try {
        const response = await api.get(ENDPOINTS.INVENTORY.GET_ONE(id.toString()));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createInventory: async (inventory: CreateInventoryRequest) => {
      try {
        await api.post(ENDPOINTS.INVENTORY.CREATE, inventory);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateInventory: async (inventory: UpdateInventoryRequest, id: string) => {
      try {
        await api.put(ENDPOINTS.INVENTORY.UPDATE(id), inventory);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteInventory: async (id: string) => {
      try {
        await api.delete(ENDPOINTS.INVENTORY.DELETE(id));
        set((state) => {
          state.inventories.inventoriesList = state.inventories.inventoriesList?.filter(
            (inventory: Inventories) => inventory.guid !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
