export interface Variant {
  id: number;
  guid: string;
  color: string;
  size: string;
}

export interface CreateVariantRequest {
  color: string;
  size: string;
}

export interface UpdateVariantRequest {
  color: string;
  size: string;
}
