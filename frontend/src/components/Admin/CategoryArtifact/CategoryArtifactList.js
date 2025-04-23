import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../api";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import DeleteOutLineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

import {
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  IconButton,
  styled,
} from "@mui/material";

//import Table from "../../layout/Table";

export const SearchPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled(InputBase)`
  margin-left: ${({ theme }) => theme.spacing(1.5)};
  flex: 1;
`;

export default function CategoryArtifactList(props) {
  const { setCategoryId, resetFormControls, setNotify, setCategoryVisible } =
    props;
  const [categoryItem, setCategoryItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const showForUpdate = (id) => {
    setCategoryId(id);
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CategoryArtifact)
      .fetchAll()
      .then((res) => {
        setCategoryItem(res.data);
        setSearchList(res.data);
        //setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...categoryItem];
    x = x.filter((y) => {
      return y.title.toLowerCase().includes(searchKey.toLocaleLowerCase());
      //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
    });
    setSearchList(x);
  }, [searchKey]);

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.CategoryArtifact)
        .delete(id)
        .then((res) => {
          setCategoryId(0);
          resetFormControls();
          setCategoryItem((prev) => prev.filter((item) => item.id !== id));
          setSearchList((prev) => prev.filter((item) => item.id !== id));
          setNotify({ isOpen: true, message: "Deleted successfully." });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <SearchPaper>
        <SearchInput
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search category items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </SearchPaper>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "70%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "35%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Category Artifact</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "35%",
                  whiteSpace: "nowrap",
                }}
              >
                <b></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList.length > 0 ? (
              searchList.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.name}
                  </TableCell>

                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteCategory(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
