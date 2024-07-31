import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { GENDER, SPECIES, STATUS } from "../../helpers/constant";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Filter.module.css";

function Filter({ handleFilterChange, isAdvanceFilter = false }) {
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    onFilterChange();
  }, [species, status, gender, name]);

  const onFilterChange = () => {
    const filters = {
      ...(status && { status }),
      ...(name && { name }),
      ...(gender && { gender }),
      ...(species && { species }),
    };
    handleFilterChange(filters);
  };

  return (
    <div
      className={styles.container}
      style={{ justifyContent: isAdvanceFilter ? "space-between" : "center" }}
    >
      <div>
        <TextField
          type="text"
          fullWidth
          className={styles.searchField}
          size="small"
          placeholder="Search"
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {isAdvanceFilter && (
        <div className={styles.advanceFilters}>
          <div className={styles.filter}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel size="small">Status</InputLabel>
              <Select
                value={status}
                className={styles.select}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                size="small"
              >
                <MenuItem value="">Select</MenuItem>
                {STATUS.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.filter}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel size="small">Species</InputLabel>
              <Select
                value={species}
                size="small"
                className={styles.select}
                onChange={(e) => setSpecies(e.target.value)}
                label="Species"
              >
                <MenuItem value="">Select</MenuItem>
                {SPECIES.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.filter}>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel size="small">Gender</InputLabel>
              <Select
                value={gender}
                size="small"
                className={styles.select}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="">Select</MenuItem>
                {GENDER.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
