export interface Orders {
  id: number;
  guid: string;
  customerGuid: string;
  transactionGuid: string;
  description: string;
  totalPrice: number;
  isActive: string;
  orderDetails: OrderDetail[];
}

export interface CreateOrderRequest {
  orderGuid: string;
  productGuid: string;
  quantity: number;
}

export interface UpdateOrderRequest {
  orderGuid: string;
  productGuid: string;
  quantity: number;
}

export interface OrderDetail {
  id: number;
  guid: string;
  orderGuid: string;
  productGuid: string;
  quantity: number;
}
