import React, { useEffect, useMemo, useState, FC } from 'react';
import './styles.css';
import { useData } from './data';
import { getDataSince, getReadableDate } from './util';
import { Slider } from './Slider';

const Title: FC<{ range: number; readableDate: string }> = ({
  range,
  readableDate,
}) => {
  if (range < 2) {
    return <h2>All Time</h2>;
  }
  return (
    <h2>
      Using only data since <br />
      {readableDate}
    </h2>
  );
};
export default function App() {
  const data = useData();
  const [range, setRange] = useState(0);
  useEffect(() => {
    const initialIndex = data.findIndex(({ date }) => date === 20200801);
    if (initialIndex !== -1) {
      setRange(data.length - initialIndex);
    }
  }, [data]);
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
      <h1>COVID-19 US Death & Hospitalization Rates</h1>
      <div style={{ display: 'flex', width: '100vw' }}>
        <div style={{ flex: '1 1 auto', width: '50vw' }}>
          <Title range={range} readableDate={readableDate} />
          <div>
            Positive Cases: {totalsSinceDate.positive?.toLocaleString()}
          </div>
          <div>
            Hospitalized: {totalsSinceDate.hospitalized?.toLocaleString()}
          </div>
          <div>Deaths: {totalsSinceDate.death?.toLocaleString()}</div>
          <h2>COVID positive individuals have a:</h2>
          <h1>
            {' '}
            1 in {Math.round(1 / (deathRate / 100)).toLocaleString()} chance of
            death
          </h1>
          <h4>
            <div>{(100 - deathRate).toFixed(4)}% survival rate</div>
            <div>{deathRate.toFixed(4)}% death rate</div>
          </h4>

          <h1>
            1 in {Math.round(1 / (hospitalizationRate / 100)).toLocaleString()}{' '}
            chance of being hospitalized
          </h1>
          <h4>
            <div>
              {(100 - hospitalizationRate).toFixed(4)}% non-hospitalization rate
            </div>
            <div>{hospitalizationRate.toFixed(4)}% hospitalization rate</div>
          </h4>
        </div>
        <div
          style={{
            display: 'flex',
            flex: '0 0 160px',
            height: '500px',
          }}
        >
          <Slider value={range} onChange={setRange} data={data} />
        </div>
      </div>
    </div>
  );
}
