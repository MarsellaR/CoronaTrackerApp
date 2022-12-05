import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import styles from "./Circles.module.css";

const casesTypeColors = {
  cases: {
    hex: "red",
    multiplier: 100,
  },
  recovered: {
    hex: "green",

    multiplier: 100,
  },
  deaths: {
    hex: "red",
    multiplier: 400,
  },
};

export const Circles = (data, cases) =>
  data.map((country, id) => (
    <Circle
      key={id}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[cases].hex,
        fillColor: casesTypeColors[cases].hex,
        fillOpacity: 0.4,
      }}
      radius={Math.sqrt(country[cases]) * casesTypeColors[cases].multiplier}
      const
    >
      <Popup>
        <div className={styles.infoContainer}>
          <div
            className={styles.infoFlag}
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));


