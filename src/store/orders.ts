import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  CreateOrderDetailRequest,
  CreateOrderRequest,
  OrderDetail,
  Orders,
  UpdateOrderDetailRequest,
  UpdateOrderRequest,
} from '../shared/models/order';

export interface OrdersState {
  ordersList: Orders[] | undefined;
  orderDetailsList: OrderDetail[] | undefined;
}

export interface OrdersActions {
  fetchAllOrders: () => Promise<void>;
  fetchOneOrder: (id: number) => Promise<Orders>;
  createOrder: (order: CreateOrderRequest) => Promise<Orders>;
  updateOrder: (order: UpdateOrderRequest, id: number) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  fetchAllOrderDetails: () => Promise<void>;
  createOrderDetail: (orderDetail: CreateOrderDetailRequest, orderGuid: string) => Promise<void>;
  updateOrderDetail: (orderDetail: UpdateOrderDetailRequest, id: number) => Promise<void>;
  deleteOrderDetail: (id: number) => Promise<void>;
}

export const initialOrders: OrdersState = {
  ordersList: undefined,
  orderDetailsList: undefined,
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
        const response = await api.post(ENDPOINTS.ORDER.CREATE, order);
        return response.data;
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
    fetchAllOrderDetails: async () => {
      try {
        const response = await api.get(ENDPOINTS.ORDER_DETAIL.GET_ALL);
        set((state) => {
          state.orders.orderDetailsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createOrderDetail: async (orderDetail: CreateOrderDetailRequest, orderGuid: string) => {
      try {
        await api.post(ENDPOINTS.ORDER_DETAIL.CREATE(orderGuid), orderDetail);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateOrderDetail: async (orderDetail: UpdateOrderDetailRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.ORDER_DETAIL.UPDATE(id.toString()), orderDetail);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteOrderDetail: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.ORDER_DETAIL.DELETE(id.toString()));
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
