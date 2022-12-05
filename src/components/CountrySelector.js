import { React, useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { allCountries } from "../api";
import axios from "axios";

export default function SelectSmall({ value, setValue }) {
  const [countries, setCountries] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const fetchCountries = () => {
      axios.get(allCountries).then((response) => {
        setCountries(response.data.map((item) => item.country));
      });
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          sx={{ backgroundColor: "white" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={value}
        >
          <MenuItem value="Worldwide">
            <b>Worldwide</b>
          </MenuItem>
          {countries.length > 0 &&
            countries.map((country, i) => (
              <MenuItem key={i} value={country}>
                {country}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
