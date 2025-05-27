import { Categories } from './category';
import { Variant } from './variant';

export interface Products {
  id: number;
  name: string;
  quantity: number;
  description: string;
  status: string;
  guid: string;
  categoryGuid: string;
  variantGuid: string;
  category: Categories;
  variant: Variant;
}

export interface CreateProductRequest {
  name: string;
  quantity: number;
  description: string;
  status: string;
  categoryGuid: string;
  variantGuid: string;
}

export interface UpdateProductRequest {
  name: string;
  quantity: number;
  description: string;
  status: string;
  categoryGuid: string;
  variantGuid: string;
}
