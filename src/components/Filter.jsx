import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { GENDER, SPECIES, STATUS } from "../helpers/constant";
import SearchIcon from "@mui/icons-material/Search";

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
      style={{
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: isAdvanceFilter ? "space-between" : "center",
      }}
    >
      <TextField
        type="text"
        placeholder="Search"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
          },
          "& .MuiInputBase-root": {
            minWidth: "500px",
          },
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
      {isAdvanceFilter && (
        <div>
          <FormControl
            variant="outlined"
            style={{
              marginLeft: "10px",
              minWidth: 120,
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              sx={{ borderRadius: "30px" }}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="">Select</MenuItem>
              {STATUS.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            style={{
              marginLeft: "10px",
              minWidth: 120,
            }}
          >
            <InputLabel>Species</InputLabel>
            <Select
              value={species}
              sx={{ borderRadius: "30px" }}
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
          <FormControl
            variant="outlined"
            style={{
              marginLeft: "10px",
              minWidth: 120,
            }}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              sx={{ borderRadius: "30px" }}
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
      )}
    </div>
  );
}

export default Filter;
