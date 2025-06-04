export interface Inventories {
  id: number;
  guid: string;
  name: string;
  description: string;
  quantity: number;
  userGuid: string;
}

export interface CreateInventoryRequest {
  name: string;
  description: string;
  quantity: number;
  userGuid: string;
}

export interface UpdateInventoryRequest {
  name: string;
  description: string;
  quantity: number;
  userGuid: string;
}
