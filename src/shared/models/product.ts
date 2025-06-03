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
  images: string;
  consignmentGuid: string;
}

export interface CreateProductRequest {
  name: string;
  quantity: number;
  description: string;
  status: string;
  categoryGuid: string;
  variantGuid: string;
  image: string;
  consignmentGuid: string;
}

export interface UpdateProductRequest {
  name: string;
  quantity: number;
  description: string;
  status: string;
  categoryGuid: string;
  variantGuid: string;
  consignmentGuid: string;
}
