import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function SearchBar(props) {
  const { search, setSearch } = props;
  return (
    <Paper>
      <IconButton aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
        inputProps={{ "aria-label": "search patients" }}
      />
    </Paper>
  );
}
