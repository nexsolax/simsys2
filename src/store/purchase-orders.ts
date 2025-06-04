import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  CreatePurchaseOrderRequest,
  PurchaseOrders,
  UpdatePurchaseOrderRequest,
} from '../shared/models/purchase-order';

export interface PurchaseOrdersState {
  purchaseOrdersList: PurchaseOrders[] | undefined;
}

export interface PurchaseOrdersActions {
  fetchAllPurchaseOrders: () => Promise<void>;
  fetchOnePurchaseOrder: (id: string) => Promise<PurchaseOrders>;
  createPurchaseOrder: (purchaseOrder: CreatePurchaseOrderRequest) => Promise<any>;
  updatePurchaseOrder: (purchaseOrder: UpdatePurchaseOrderRequest, guid: string) => Promise<any>;
  deletePurchaseOrder: (id: string) => Promise<void>;
}

export const initialPurchaseOrders: PurchaseOrdersState = {
  purchaseOrdersList: [],
};

export function purchaseOrdersActions(set: StoreSet): PurchaseOrdersActions {
  return {
    fetchAllPurchaseOrders: async () => {
      try {
        const response = await api.get(ENDPOINTS.PURCHASE_ORDERS.GET_ALL);
        set((state) => {
          state.purchaseOrders.purchaseOrdersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOnePurchaseOrder: async (id: string) => {
      try {
        const response = await api.get(ENDPOINTS.PURCHASE_ORDERS.GET_ONE(id));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createPurchaseOrder: async (purchaseOrder: CreatePurchaseOrderRequest) => {
      try {
        await api.post(ENDPOINTS.PURCHASE_ORDERS.CREATE, purchaseOrder);
      } catch (error: any) {
        console.log(error);
      }
    },
    updatePurchaseOrder: async (purchaseOrder: UpdatePurchaseOrderRequest, guid: string) => {
      try {
        await api.put(ENDPOINTS.PURCHASE_ORDERS.UPDATE(guid), purchaseOrder);
      } catch (error: any) {
        console.log(error);
      }
    },
    deletePurchaseOrder: async (id: string) => {
      try {
        await api.delete(ENDPOINTS.PURCHASE_ORDERS.DELETE(id));
        set((state) => {
          state.purchaseOrders.purchaseOrdersList = state.purchaseOrders.purchaseOrdersList?.filter(
            (purchaseOrder: PurchaseOrders) => purchaseOrder.guid !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
