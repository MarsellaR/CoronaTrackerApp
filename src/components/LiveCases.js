import React from "react";
import styles from "./LiveCases.module.css";
import numeral from "numeral";
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.todayCases > b.todayCases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

const liveCases = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((country, i) => {
        return (
          <div key={i} className={styles.liveCases}>
            <p>{country.country}</p>{" "}
            <p>{numeral(country.todayCases).format("0,0")}</p>
          </div>
        );
      })}
    </div>
  );
};

export default liveCases;
