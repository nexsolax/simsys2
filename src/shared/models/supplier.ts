export interface SupplierDTO {
  supplierId: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdDate: string;
  updatedDate: string;
  rating: null;
  userId: number;
}

export interface CreateSupplierDTO {
  name: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  userId: number;
  createdDate: string;
  updatedDate: string;
}

export interface UpdateSupplierDTO {
  name: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  userId: number;
  createdDate: string;
  updatedDate: string;
}
