export interface ConsignmentDTO {
  id: number;
  sku: string;
  name: string;
  description: string;
  totalQuantity: number;
  totalPrice: number;
  importDate: string;
  status: string;
  supplierId: number;
  userId: number;
  productIds: number[];
}
