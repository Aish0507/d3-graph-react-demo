import React, { useState } from "react";
import StackedAreaChart from "./components/charts/StackedAreaChart";
import "./App.css";

const allKeys = ["data-1", "data-2", "data-3"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors: any = {
  "data-1": "green",
  "data-2": "orange",
  "data-3": "purple"
};

const toPercent = (decimal: number, fixed: number = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
  const { payload = [], label } = o;
  const total = payload.reduce(
    (result: number, entry: any) => result + entry.value,
    0
  );

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState([
    {
      year: 1980,
      "data-1": 400,
      "data-2": 300,
      "data-3": 2400
    },
    {
      year: 1990,
      "data-1": 3000,
      "data-2": 300,
      "data-3": 2210
    },
    {
      year: 2000,
      "data-1": 2000,
      "data-2": 5,
      "data-3": 2290
    },
    {
      year: 2010,
      "data-1": 2780,
      "data-2": 300,
      "data-3": 2000
    },
    {
      year: 2020,
      "data-1": 1890,
      "data-2": 300,
      "data-3": 2181
    }
  ]);

  return (
    <React.Fragment>
      <div className="demo-text">
        I utilized D3 version 7.8.5 in conjunction with React. After reviewing the provided screenshots, I conducted thorough research and developed a demonstration using placeholder data.

        Furthermore, I incorporated modifications to enhance the graph layout, specifically focusing on the in-built features such as Offset and Curve types. This enables convenient customization of stacked area charts by employing various offset and smoothing algorithms. Notably, this flexibility allows for the creation of streamgraphs, a variation of the traditional stacked area graph.

        For clarification, the offset type governs the stacking arrangement of data, while the curve type dictates the smoothing algorithm applied to each shape in the graph.
      </div>
      <StackedAreaChart data={data} keys={keys} colors={colors} />
      <div className="fields">
        {allKeys.map(key => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={e => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter(_key => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors?.[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData([
            ...data,
            {
              year: Math.max(...data.map(d => d.year)) + 10,
              "data-1": Math.round(Math.random() * 100),
              "data-2": Math.round(Math.random() * 125),
              "data-3": Math.round(Math.random() * 150)
            }
          ])
        }
      >
        Add data
      </button>
      {/* <AreaChart
        width={500}
        height={400}
        data={rechartData}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" orientation="top" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="a"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="b"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="c"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart> */}
      {/* <MarketshareAreaChart /> */}
    </React.Fragment>
  );
}

export default App;
