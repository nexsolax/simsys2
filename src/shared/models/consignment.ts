export interface Consignments {
  id: number;
  guid: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createDate: Date;
  supplierGuid: string;
  purchaseOrderGuid: string;
}

export interface CreateConsignmentRequest {
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplierGuid: string;
  purchaseOrderGuid: string;
}

export interface UpdateConsignmentRequest {
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  supplierGuid: string;
  purchaseOrderGuid: string;
}
