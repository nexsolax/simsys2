import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  CreateTransferRequest,
  UpdateTransferRequest,
  TransferRequests,
} from '../shared/models/transfer-request';

export interface TransferRequestsState {
  transferRequestsList: TransferRequests[] | undefined;
}

export interface TransferRequestsActions {
  fetchAllTransferRequests: () => Promise<void>;
  fetchOneTransferRequest: (id: string) => Promise<TransferRequests>;
  createTransferRequest: (transferRequest: CreateTransferRequest) => Promise<any>;
  updateTransferRequest: (transferRequest: UpdateTransferRequest, id: string) => Promise<void>;
  deleteTransferRequest: (id: string) => Promise<void>;
}

export const initialTransferRequests: TransferRequestsState = {
  transferRequestsList: undefined,
};

export function transferRequestsActions(set: StoreSet): TransferRequestsActions {
  return {
    fetchAllTransferRequests: async () => {
      try {
        const response = await api.get(ENDPOINTS.TRANSFER_REQUESTS.GET_ALL);
        set((state) => {
          state.transferRequests.transferRequestsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneTransferRequest: async (id: string) => {
      try {
        const response = await api.get(ENDPOINTS.TRANSFER_REQUESTS.GET_ONE(id));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createTransferRequest: async (transferRequest: CreateTransferRequest) => {
      try {
        await api.post(ENDPOINTS.TRANSFER_REQUESTS.CREATE, transferRequest);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateTransferRequest: async (transferRequest: UpdateTransferRequest, id: string) => {
      try {
        await api.put(ENDPOINTS.TRANSFER_REQUESTS.UPDATE(id), transferRequest);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteTransferRequest: async (id: string) => {
      try {
        await api.delete(ENDPOINTS.TRANSFER_REQUESTS.DELETE(id));
        set((state) => {
          state.transferRequests.transferRequestsList =
            state.transferRequests.transferRequestsList?.filter(
              (transferRequest: TransferRequests) => transferRequest.guid !== id,
            );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
