import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CustomerCreateRequest, CustomerUpdateRequest, Customers } from '../shared/models/customer';

export interface CustomersState {
  customersList: Customers[] | undefined;
}

export interface CustomersActions {
  fetchAllCustomers: () => Promise<void>;
  fetchOneCustomer: (id: string) => Promise<Customers>;
  createCustomer: (customer: CustomerCreateRequest) => Promise<any>;
  updateCustomer: (customer: CustomerUpdateRequest, id: number) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const initialCustomers: CustomersState = {
  customersList: [],
};

export function customersActions(set: StoreSet): CustomersActions {
  return {
    fetchAllCustomers: async () => {
      try {
        const response = await api.get(ENDPOINTS.CUSTOMER.GET_ALL);
        set((state) => {
          state.customers.customersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneCustomer: async (id: string) => {
      try {
        const response = await api.get(ENDPOINTS.CUSTOMER.GET_ONE(id));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createCustomer: async (customer: CustomerCreateRequest) => {
      try {
        await api.post(ENDPOINTS.CUSTOMER.CREATE, customer);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateCustomer: async (customer: CustomerUpdateRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.CUSTOMER.UPDATE(id.toString()), customer);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteCustomer: async (id: number) => {
      try {
        const response = await api.delete(ENDPOINTS.CUSTOMER.DELETE(id.toString()));
        set((state) => {
          state.customers.customersList = state.customers.customersList?.filter(
            (customer: Customers) => customer.id !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
