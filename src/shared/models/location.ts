export interface Locations {
  id: number;
  guid: string;
  locationName: string;
  description: string;
  inventoryGuid: string;
}

export interface CreateLocationRequest {
  locationName: string;
  description: string;
  inventoryGuid: string;
}

export interface UpdateLocationRequest {
  locationName: string;
  description: string;
  inventoryGuid: string;
}
