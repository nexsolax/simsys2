import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import {
  CreateTransactionRequest,
  Transactions,
  UpdateTransactionRequest,
} from '../shared/models/transaction';

export interface TransactionsState {
  transactionsList: Transactions[] | undefined;
}

export interface TransactionsActions {
  fetchAllTransactions: () => Promise<void>;
  fetchOneTransaction: (id: number) => Promise<Transactions>;
  createTransaction: (transaction: CreateTransactionRequest) => Promise<any>;
  updateTransaction: (transaction: UpdateTransactionRequest, id: number) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export const initialTransactions: TransactionsState = {
  transactionsList: [],
};

export function transactionsActions(set: StoreSet): TransactionsActions {
  return {
    fetchAllTransactions: async () => {
      try {
        const response = await api.get(ENDPOINTS.TRANSACTION.GET_ALL);
        set((state) => {
          state.transactions.transactionsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneTransaction: async (id: number) => {
      try {
        const response = await api.get(ENDPOINTS.TRANSACTION.GET_ONE(id.toString()));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createTransaction: async (transaction: CreateTransactionRequest) => {
      try {
        await api.post(ENDPOINTS.TRANSACTION.CREATE, transaction);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateTransaction: async (transaction: UpdateTransactionRequest, id: number) => {
      try {
        await api.put(ENDPOINTS.TRANSACTION.UPDATE(id.toString()), transaction);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteTransaction: async (id: number) => {
      try {
        await api.delete(ENDPOINTS.TRANSACTION.DELETE(id.toString()));
        set((state) => {
          state.transactions.transactionsList = state.transactions.transactionsList?.filter(
            (transaction: Transactions) => transaction.id !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
