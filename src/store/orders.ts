import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateOrderRequest, Orders, UpdateOrderRequest } from '../shared/models/order';

export interface OrdersState {
  ordersList: Orders[] | undefined;
}

export interface OrdersActions {
  fetchAllOrders: () => Promise<void>;
  fetchOneOrder: (id: number) => Promise<Orders>;
  createOrder: (order: CreateOrderRequest) => Promise<any>;
  updateOrder: (order: UpdateOrderRequest, id: number) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
}

export const initialOrders: OrdersState = {
  ordersList: undefined,
};

export function ordersActions(set: StoreSet): OrdersActions {
  return {
    fetchAllOrders: async () => {
      try {
        const response = await api.get(ENDPOINTS.ORDER.GET_ALL);
        set((state) => {
          state.orders.ordersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneOrder: async (id: number) => {
      try {
        const response = await api.get(ENDPOINTS.ORDER.GET_ONE(id.toString()));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createOrder: async (order: CreateOrderRequest) => {
      try {
        await api.post(ENDPOINTS.ORDER.CREATE, order);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateOrder: async (order: UpdateOrderRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.ORDER.UPDATE(id.toString()), order);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteOrder: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.ORDER.DELETE(id.toString()));
        set((state) => {
          state.orders.ordersList = state.orders.ordersList?.filter(
            (order: Orders) => order.id !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
