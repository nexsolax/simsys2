import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CustomerCreateDTO, CustomerUpdateDTO } from '../shared/models/customer';

export interface CustomersState {
  customersList: any | undefined;
}

export interface CustomersActions {
  fetchAllCustomers: () => Promise<void>;
  fetchOneCustomer: (id: string) => Promise<void>;
  createCustomer: (customer: CustomerCreateDTO) => Promise<any>;
  updateCustomer: (customer: CustomerUpdateDTO, id: number) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const initialCustomers: CustomersState = {
  customersList: undefined,
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
        set((state) => {
          state.customers.customersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createCustomer: async (customer: CustomerCreateDTO) => {
      try {
        const response = await api.post(ENDPOINTS.CUSTOMER.CREATE, customer);
        set((state) => {
          state.customers.customersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateCustomer: async (customer: CustomerUpdateDTO, id: number) => {
      try {
        const response = await api.put(ENDPOINTS.CUSTOMER.UPDATE(id.toString()), customer);
        set((state) => {
          state.customers.customersList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteCustomer: async (id: number) => {
      try {
        const response = await api.delete(ENDPOINTS.CUSTOMER.DELETE(id.toString()));
        set((state) => {
          state.customers.customersList = state.customers.customersList.filter(
            (customer: any) => customer.id !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
