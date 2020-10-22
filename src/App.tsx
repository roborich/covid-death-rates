import React, { useMemo, useState } from "react";
import "./styles.css";
import { useData } from "./data";
import { getDataSince, getReadableDate } from "./util";
import { Slider } from "./Slider";
export default function App() {
  const data = useData();
  const [range, setRange] = useState(0);
  const index = data.length - range;
  const [readableDate, totalsSinceDate] = useMemo(() => {
    const sinceDate = data[index]?.date;
    return [getReadableDate(sinceDate), getDataSince(sinceDate, data)] as const;
  }, [data, index]);
  if (data.length === 0) {
    return <div>loading...</div>;
  }
  const deathRate = totalsSinceDate.death / totalsSinceDate.positive;
  const hospitalizationRate =
    totalsSinceDate.hospitalized / totalsSinceDate.positive;
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div>
          <h1>Covid-19 Death/Hospitalization Rates</h1>
          <h2>
            {range < 2 ? "All Time" : `Using only data since ${readableDate}`}
          </h2>
          <div>
            Total Positive Cases: {totalsSinceDate.positive?.toLocaleString()}
          </div>
          <div>
            Total Hospitalized: {totalsSinceDate.hospitalized?.toLocaleString()}
          </div>
          <div>Total Deaths: {totalsSinceDate.death?.toLocaleString()}</div>
          <h2>COVID positive individuals have a:</h2>
          <h1>
            {" "}
            1 in {Math.round(1 / (deathRate / 100)).toLocaleString()} chance of
            Death
          </h1>
          <h4>
            <div>{(100 - deathRate).toFixed(4)}% survival rate</div>
            <div>{deathRate.toFixed(4)}% death rate</div>
          </h4>

          <h1>
            1 in {Math.round(1 / (hospitalizationRate / 100)).toLocaleString()}{" "}
            chance of Hospitalization
          </h1>
          <h4>
            <div>
              {100 - hospitalizationRate.toFixed(4)}% non-hospitalization rate
            </div>
            <div>{hospitalizationRate.toFixed(4)}% hospitalization rate</div>
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
            flex: 1,
            paddingTop: "32px",
            height: "500px"
          }}
        >
          <Slider value={range} onChange={setRange} data={data} />
        </div>
      </div>
    </div>
  );
}
