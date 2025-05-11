import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { ConsignmentDTO } from '../shared/models/consignment';

export interface ConsignmentsState {
  consignmentsList: any | undefined;
}

export interface ConsignmentsActions {
  fetchAllConsignments: () => Promise<void>;
  fetchOneConsignment: (id: string) => Promise<void>;
  createConsignment: (consignment: ConsignmentDTO) => Promise<any>;
  updateConsignment: (consignment: ConsignmentDTO, id: number) => Promise<void>;
  deleteConsignment: (id: number) => Promise<void>;
}

export const initialConsignments: ConsignmentsState = {
  consignmentsList: undefined,
};

export function consignmentsActions(set: StoreSet): ConsignmentsActions {
  return {
    fetchAllConsignments: async () => {
      try {
        const response = await api.get(ENDPOINTS.CONSIGNMENT.GET_ALL);
        set((state) => {
          state.consignments.consignmentsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneConsignment: async (id: string) => {
      try {
        const response = await api.get(`${ENDPOINTS.CONSIGNMENT.GET_ONE}/${id}`);
        set((state) => {
          state.consignments.consignmentsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    createConsignment: async (consignment: ConsignmentDTO) => {
      try {
        const response = await api.post(ENDPOINTS.CONSIGNMENT.CREATE, consignment);
        set((state) => {
          state.consignments.consignmentsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    updateConsignment: async (consignment: ConsignmentDTO, id: number) => {
      try {
        const response = await api.put(`${ENDPOINTS.CONSIGNMENT.UPDATE}/${id}`, consignment);
        set((state) => {
          state.consignments.consignmentsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteConsignment: async (id: number) => {
      try {
        const response = await api.delete(`${ENDPOINTS.CONSIGNMENT.DELETE}/${id}`);
        set((state) => {
          state.consignments.consignmentsList = state.consignments.consignmentsList.filter(
            (consignment: any) => consignment.id !== id,
          );
        });
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
