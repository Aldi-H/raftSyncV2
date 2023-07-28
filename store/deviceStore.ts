import { create } from 'zustand';
import axios from 'axios';

import { BASE_URL } from '@env';

interface Data {
  id: string;
  name: string;
  url?: string;
  token?: string;
}

interface DataState {
  DataDevices: [];
  getAllDevices: () => void;
  addDevice: (values: Data) => void;
  deleteDevice: (deviceId: string) => void;
}

export const useDeviceStore = create<DataState>(set => ({
  DataDevices: [],

  getAllDevices: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/devices`);

      const data = response.data.results.map(
        (item: { name: string; id: string }) => {
          return {
            name: item.name,
            id: item.id,
          };
        },
      );

      console.log(data);
      set({ DataDevices: data });
    } catch (error) {
      console.error(error);
    }
  },

  addDevice: async (values: Data) => {
    try {
      const response = await axios.post(`${BASE_URL}/devices`, values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },

  deleteDevice: async (deviceId: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/devices/${deviceId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
}));

/* interface ApiResponse {
  results: Array<{
    name: string;
    id: string;
  }>;
}

interface DeviceData {
  id: string;
  name: string;
  url: string;
  token: string;
}

export const useDeviceStore = create(set => ({
  devices: [],

  getAllDevices: async (): Promise<void> => {
    try {
      const response = await axios.get<ApiResponse>(`${BASE_URL}/devices`);

      const data = response.data.results.map(
        (item: { name: string; id: string }) => {
          return {
            name: item.name,
            id: item.id,
          };
        },
      );

      console.log(data);
      set({ devices: data });
    } catch (error) {
      console.error(error);
    }
  },

  addDevice: async (values: DeviceData): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/devices`, values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },

  deleteDevice: async (deviceId: string): Promise<void> => {
    try {
      const response = await axios.delete(`${BASE_URL}/devices/${deviceId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
})); */
