import { React } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styles from "./Cards.module.css";
import numeral from "numeral";
export default function SimplePaper({ data, cases, setCases }) {
  return (
    <Box
      className={styles.box}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        "& > :not(style)": {
          b: 0,
          width: 250,
          height: 150,
        },
        gap: "2em",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        className={`${styles.container} ${
          cases === "cases" ? styles.borderRed : styles.container
        }`}
        onClick={(e) => setCases("cases")}
      >
        <div className={styles.title}> Corona Virus Cases</div>
        <strong className={styles.colorRed}>
          {" "}
          {"+" + numeral(data.todayCases).format("0,0a")}
        </strong>
        <div>{numeral(data.cases).format("0,0a")} Total</div>
      </Paper>
      <Paper
        elevation={3}
        className={`${styles.container} ${
          cases === "recovered" ? styles.borderGreen : styles.container
        }`}
        onClick={(e) => setCases("recovered")}
      >
        <div className={styles.title}>Recovered</div>
        <strong className={styles.colorGreen}>
          {"+" + numeral(data.todayRecovered).format("0,0a")}
        </strong>
        <div>{numeral(data.recovered).format("0,0a")} Total</div>
      </Paper>
      <Paper
        elevation={3}
        className={`${styles.container} ${
          cases === "deaths" ? styles.borderRed : styles.container
        }`}
        onClick={(e) => setCases("deaths")}
      >
        <div className={styles.title}>Deaths</div>
        <strong className={styles.colorRed}>
          {"+" + numeral(data.todayDeaths).format("0,0a")}
        </strong>
        <div> {numeral(data.deaths).format("0,0a")} Total</div>
      </Paper>
    </Box>
  );
}
