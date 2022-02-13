import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({ label }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel htmlFor="grouped-select">{label}</InputLabel>
      <Select defaultValue="" id="grouped-select" label="Grouping">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <ListSubheader>Available</ListSubheader>
        <MenuItem value={1}>Option 1</MenuItem>
        <MenuItem value={2}>Option 2</MenuItem>
        <ListSubheader>Taken</ListSubheader>
        <MenuItem value={3}>
          <strike>Option 3</strike>
        </MenuItem>
        <MenuItem value={4}>
          <strike>Option 4</strike>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
