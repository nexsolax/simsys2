export interface Customers {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  bankCard: string;
  guid: string;
}

export interface CustomerCreateRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  bankCard: string;
}

export interface CustomerUpdateRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  bankCard: string;
}
