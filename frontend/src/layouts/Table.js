import React from "react";
import { Table as MuiTable } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTable = styled(MuiTable)(({ theme }) => ({
  "& tbody td": {
    fontWeight: 300,
  },
  "& tbody tr:hover": {
    backgroundColor: "#fffbf2",
    cursor: "pointer",
  },
  "& .MuiTableCell-root": {
    border: "none",
  },
}));

export default function Table(props) {
  return <StyledTable>{props.children}</StyledTable>;
}
