import React, { useEffect, useState } from "react";
import { newWorldwideCases } from "../api";
import axios from "axios";
import numeral from "numeral";
import { format } from "date-fns";
import styles from "./Chart.module.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const chartData = (data, casesType) => {
  const dataArray = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      const newData = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      dataArray.push(newData);
    }
    lastDataPoint = data[casesType][date];
  }

  return dataArray;
};
export default function App({ casesType }) {
  const [worldwideCases, setWorldwideCases] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios.get(newWorldwideCases).then((response) => {
        let datas = chartData(response.data, casesType);
        setWorldwideCases(datas);
      });
    };

    fetchData();
  }, [casesType]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{format(new Date(label), "MMM d y")} </p>
          <p>{numeral(payload[0].value).format(`+ ${"0,0a"}`)}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Worldwide new {casesType}</h3>
      {worldwideCases?.length > 0 && (
        <ResponsiveContainer
          width="100%"
          height={200}
          className={styles.ResponsiveContainer}
        >
          <AreaChart
            width={500}
            height={200}
            data={worldwideCases}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: 10 }}
              interval={30}
              tickFormatter={(x) => {
                let date = new Date(x);
                return format(date, "MMM y");
              }}
            />
            <YAxis
              dataKey="y"
              style={{ fontSize: 10 }}
              tickFormatter={(number) => numeral(number).format("0a")}
            />
            <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
            <Tooltip
              wrapperStyle={{
                outline: "none",
                color: "white",
                backgroundColor: "black",
                padding: "5px",
                borderRadius: "2px",
                fontSize: 14,
              }}
              content={<CustomTooltip />}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
