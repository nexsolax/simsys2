export interface CustomerDTO {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: boolean;
  bankcard: string;
  createdDate: string;
  updatedDate: string;
}

export interface CustomerCreateDTO {
  name: string;
  address: string;
  phone: string;
  email: string;
  status: boolean;
  bankcard: string;
  createdDate: string;
  updatedDate: string;
}

export interface CustomerUpdateDTO {
  name: string;
  address: string;
  phone: string;
  email: string;
  status: boolean;
  bankcard: string;
  createdDate: string;
  updatedDate: string;
}
