import React, { FC } from "react";
import styled from "styled-components";
import { CovidHistoricData } from "./data";
import { Slider as MUISlider } from "@material-ui/core";
import { getYearMonthDay } from "./util";

const getMarks = (data: CovidHistoricData[]) => {
  type Mark = { value: number; label: string };
  return data.reduce<Mark[]>((acc, item, index) => {
    const [year, month, day] = getYearMonthDay(item.date);
    if (day !== 1) {
      return acc;
    }

    return [
      ...acc,
      {
        value: index,
        label: new Date(year, month, day).toLocaleString("default", {
          month: "long"
        })
      }
    ];
  }, []);
};

interface SliderProps {
  data: CovidHistoricData[];
  value: number;
  onChange: (value: number) => void;
}

const YELLOW = " linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)";
const SliderWrapper = styled.div`
  min-height: 20vh;
  width: 20vh;

  .MuiSlider-root {
    .MuiSlider-track {
      width: 20px;
      background: ${YELLOW};
      border-radius: 0 0 10px 10px;
    }

    .MuiSlider-rail {
      width: 20px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }

    .MuiSlider-mark {
      width: 10px;
      background: rgba(0, 0, 0, 0.54);
    }

    .MuiSlider-markLabel {
      left: 42px;
      font-family: "Lexend Exa", sans-serif;
    }

    .MuiSlider-thumb {
      width: 30px;
      height: 30px;
      background: white;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);

      &.MuiSlider-active {
        box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
export const Slider: FC<SliderProps> = ({ value, onChange, data }) => {
  const handleChange = (_: any, value: unknown) => {
    onChange(data.length - (value as number));
  };
  const marks = getMarks(data);

  return (
    <SliderWrapper>
      <MUISlider
        value={data.length - value}
        orientation="vertical"
        onChange={handleChange}
        marks={marks}
        max={data.length - 1}
      />
    </SliderWrapper>
  );
};
