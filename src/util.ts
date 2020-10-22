import { CovidHistoricData } from "./data";
export const getYearMonthDay = (date: number): [number, number, number] => {
  const dateString = String(date);
  return [
    Number(dateString.substring(0, 4)),
    Number(dateString.substring(4, 6)) - 1,
    Number(dateString.substring(6, 8))
  ];
};
export const readableFromYMD = (ymd: [number, number, number]) => {
  return (
    new Date(...ymd)?.toLocaleString("default", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) ?? "unknown"
  );
};

export const getReadableDate = (date?: number) => {
  if (!date) {
    return "";
  }
  return readableFromYMD(getYearMonthDay(date));
};

export const getDataSince = (
  startDate: number,
  data: CovidHistoricData[]
): Pick<CovidHistoricData, "death" | "positive" | "hospitalized"> => {
  const latestDay = data[0];
  const beginDay = data.find((el) => el.date === startDate) ?? {
    death: 0,
    positive: 0,
    hospitalized: 0
  };
  return {
    death: latestDay?.death - beginDay?.death,
    positive: latestDay?.positive - beginDay.positive,
    hospitalized: latestDay?.hospitalized - beginDay.hospitalized
  };
};
