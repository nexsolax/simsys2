export interface Variant extends VariantDTO {
  variantValues: VariantValueDTO[];
}

export interface VariantDTO {
  variantId: number;
  name: string;
}

export interface VariantValueDTO {
  variantValueId: number;
  variantId: number;
  value: string;
}
