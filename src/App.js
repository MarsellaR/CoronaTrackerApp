import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { TodaysData } from "./api";
import axios from "axios";
import Cards from "./components/Cards";
import { allCountriesData } from "./api";
import CountrySelector from "./components/CountrySelector";
import Map from "./components/Map";
import LiveCases from "./components/LiveCases";
import Chart from "./components/Chart";
import { sortData } from "./components/LiveCases";
function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("Worldwide");
  const [countries, setCountries] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: "",
    long: "",
  });
  const [mapZoom, setMapZoom] = useState(2);
  const [cases, setCases] = useState("cases");
  const [circlesData, setCirclesData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(TodaysData)
        .then((response) => {
          setData(response.data);
          setMapCenter({
            ...mapCenter,
            lat: 34.80746,
            long: -40.4796,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchOneCountryData = () => {
      axios
        .get(allCountriesData)
        .then((response) => {
          response.data.map((country) => {
            return country.country === value
              ? (setData(country),
                setMapCenter({
                  ...mapCenter,
                  lat: country.countryInfo.lat,
                  long: country.countryInfo.long,
                }))
              : "";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    value === "Worldwide" && fetchData();
    value !== "Worldwide" && fetchOneCountryData();
  }, [value]);
  useEffect(() => {
    const fetchCountries = () => {
      axios.get(allCountriesData).then((response) => {
        const allCountries = response.data.map((country) => {
          return country.country;
        });
        setCountries(allCountries);
        let sortedData = sortData(response.data);
        setCirclesData(sortedData);
      });
    };
    fetchCountries();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.leftSide}>
        <header>
          <h2 style={{ color: "red" }}>COVID-19 TRACKER</h2>
          <CountrySelector
            countries={countries}
            value={value}
            setValue={setValue}
          />
        </header>
        <Cards data={data} cases={cases} setCases={setCases} />
        <Map
          center={mapCenter}
          zoom={mapZoom}
          data={circlesData}
          cases={cases}
        />
      </div>

      <div className={styles.rightSide}>
        <h3 className={styles.title}>Live Cases by Country</h3>
        <LiveCases data={circlesData} />
        <Chart casesType={cases} />
      </div>
    </div>
  );
}

export default App;
