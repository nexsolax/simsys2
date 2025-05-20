import { StoreSet } from '../store';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { CreateLocationRequest, Locations, UpdateLocationRequest } from '../shared/models/location';

export interface LocationsState {
  locationsList: Locations[] | undefined;
}

export interface LocationsActions {
  fetchAllLocations: () => Promise<void>;
  fetchOneLocation: (id: string) => Promise<Locations>;
  createLocation: (location: CreateLocationRequest) => Promise<any>;
  updateLocation: (location: UpdateLocationRequest, id: string) => Promise<void>;
  deleteLocation: (id: string) => Promise<void>;
}

export const initialLocations: LocationsState = {
  locationsList: undefined,
};

export function locationsActions(set: StoreSet): LocationsActions {
  return {
    fetchAllLocations: async () => {
      try {
        const response = await api.get(ENDPOINTS.LOCATION.GET_ALL);
        set((state) => {
          state.locations.locationsList = response.data;
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    fetchOneLocation: async (id: string) => {
      try {
        const response = await api.get(ENDPOINTS.LOCATION.GET_ONE(id));
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
    },
    createLocation: async (location: CreateLocationRequest) => {
      try {
        await api.post(ENDPOINTS.LOCATION.CREATE, location);
      } catch (error: any) {
        console.log(error);
      }
    },
    updateLocation: async (location: UpdateLocationRequest, id: string) => {
      try {
        await api.put(ENDPOINTS.LOCATION.UPDATE(id), location);
      } catch (error: any) {
        console.log(error);
      }
    },
    deleteLocation: async (id: string) => {
      try {
        await api.delete(ENDPOINTS.LOCATION.DELETE(id));
        set((state) => {
          state.locations.locationsList = state.locations.locationsList?.filter(
            (location: Locations) => location.guid !== id,
          );
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  };
}
