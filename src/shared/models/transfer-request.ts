export interface TransferRequests {
  guid: string;
  fromInventoryGuid: string;
  toInventoryGuid: string;
  userGuid: string;
  productGuid: string;
  quantity: number;
  createDate: string;
  note: string;
}

export interface CreateTransferRequest {
  fromInventoryGuid: string;
  toInventoryGuid: string;
  userGuid: string;
  productGuid: string;
  quantity: number;
  note: string;
}

export interface UpdateTransferRequest {
  fromInventoryGuid: string;
  toInventoryGuid: string;
  userGuid: string;
  productGuid: string;
  quantity: number;
  note: string;
}
