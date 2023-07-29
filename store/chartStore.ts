import axios from 'axios';
import { create } from 'zustand';
import moment from 'moment';

import { BASE_URL } from '@env';

interface ChartData {
  createdAt: string;
  ppm: number;
}

interface ChartDataStoreState {
  chartDatas: ChartData[];
  xAxisDateValue: string[];
  yAxisPpmValue: number[];
  periods: string;
  timeDetailValue: string;
  ppmDetailValue: number;
  volumesValue: string;
}

interface ChartDataStoreActions {
  changePeriods: (newPeriods: string) => void;
  getAllChartData: (deviceId: string, periods: string) => Promise<void>;
  openValve: (deviceId: string, volumesValue: string) => Promise<void>;
}

export const useChartStore = create<
  ChartDataStoreState & ChartDataStoreActions
>(set => ({
  chartDatas: [],
  xAxisDateValue: [],
  yAxisPpmValue: [],
  periods: '',
  timeDetailValue: '',
  ppmDetailValue: 0,
  volumesValue: '50',

  changePeriods: (newPeriods: string) => {
    set({ periods: newPeriods });
  },

  getAllChartData: async (deviceId: string, periods: string) => {
    try {
      const response = await axios.get<{ results: ChartData[] }>(
        `${BASE_URL}/measurements/${deviceId}?period=${periods}`,
      );

      const data = response.data.results;
      const timeData = response.data.results.map(dataItem =>
        moment(dataItem.createdAt).utcOffset('+0700').format('D MMM YY'),
      );
      const ppmData = response.data.results.map(dataItem => dataItem.ppm);

      console.log(periods);
      console.log(response.data.results);

      set({
        chartDatas: data,
        periods: periods,
        xAxisDateValue: timeData,
        yAxisPpmValue: ppmData,
        timeDetailValue: timeData[timeData.length - 1],
        ppmDetailValue: ppmData[ppmData.length - 1],
      });
    } catch (error) {
      console.error(error);
    }
  },

  openValve: async (deviceId: string, volumesValue: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/actions/valve/${deviceId}/flow/${volumesValue}`,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
}));
