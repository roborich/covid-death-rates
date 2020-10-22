import { useEffect, useState } from 'react';

export interface CovidHistoricData {
  date: number;
  states: number;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  dateChecked: string;
  death: number;
  hospitalized: number;
  totalTestResults: number;
  lastModified: string;
  total: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  hash: string;
}
export const getDailyData = (): Promise<CovidHistoricData[]> =>
  fetch('https://api.covidtracking.com/v1/us/daily.json').then((data) =>
    data.json(),
  );

export const useData = () => {
  const [data, setData] = useState<CovidHistoricData[]>([]);
  useEffect(() => {
    getDailyData().then(setData);
  }, []);
  return data;
};
