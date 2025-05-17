export interface PurchaseOrders {
  guid: string;
  supplierGuid: string;
  description: string;
  totalPrice: number;
  isActive: string;
  purchaseOrderDetails: PurchaseOrderDetail[];
}

export interface PurchaseOrderDetail {
  guid: string;
  productGuid: string;
  quantity: number;
}

export interface CreatePurchaseOrderRequest {
  supplierGuid: string;
  description: string;
  totalPrice: number;
  isActive: string;
  purchaseOrderDetails: CreatePurchaseOrderDetailRequest[];
}

export interface CreatePurchaseOrderDetailRequest {
  productGuid: string;
  quantity: number;
}
