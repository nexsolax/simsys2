export interface Suppliers {
  id: number;
  guid: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  isActive: string;
}

export interface CreateSupplierRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  isActive: string;
}

export interface UpdateSupplierRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  isActive: string;
}
