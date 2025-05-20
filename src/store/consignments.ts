import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  Consignments,
  CreateConsignmentRequest,
  UpdateConsignmentRequest,
} from '../shared/models/consignment';

export interface ConsignmentsState {
  consignmentsList: Consignments[] | undefined;
}

export interface ConsignmentsActions {
  fetchAllConsignments: () => Promise<void>;
  fetchOneConsignment: (id: string) => Promise<Consignments>;
  createConsignment: (consignment: CreateConsignmentRequest) => Promise<any>;
  updateConsignment: (consignment: UpdateConsignmentRequest, id: string) => Promise<void>;
  deleteConsignment: (id: string) => Promise<void>;
}

export const initialConsignments: ConsignmentsState = {
  consignmentsList: [],
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
        const response = await api.get(ENDPOINTS.CONSIGNMENT.GET_ONE(id));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createConsignment: async (consignment: CreateConsignmentRequest) => {
      try {
        await api.post(ENDPOINTS.CONSIGNMENT.CREATE, consignment);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateConsignment: async (consignment: UpdateConsignmentRequest, id: string) => {
      try {
        await api.put(ENDPOINTS.CONSIGNMENT.UPDATE(id), consignment);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteConsignment: async (id: string) => {
      try {
        await api.delete(ENDPOINTS.CONSIGNMENT.DELETE(id));
        set((state) => {
          state.consignments.consignmentsList = state.consignments.consignmentsList?.filter(
            (consignment: Consignments) => consignment.guid !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
