export interface Categories {
  id: number;
  name: string;
  description: string;
  guid: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}
