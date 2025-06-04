export interface Transactions {
  id: number;
  guid: string;
  money: number;
  createDate: Date;
  customerGuid: string;
  description: string;
}

export interface CreateTransactionRequest {
  money: number;
  customerGuid: string;
  description: string;
}

export interface UpdateTransactionRequest {
  money: number;
  customerGuid: string;
  description: string;
}
