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

export default function ProductList(props) {
  const { setProductId, resetFormControls, setNotify, setProductVisible } =
    props;
  const [productItem, setProductItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const showForUpdate = (id) => {
    setProductId(id);
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Product)
      .fetchAll()
      .then((res) => {
        setProductItem(res.data);
        setSearchList(res.data);
        //setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...productItem];
    x = x.filter((y) => {
      return y.name.toLowerCase().includes(searchKey.toLocaleLowerCase());
      //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
    });
    setSearchList(x);
  }, [searchKey]);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.Product)
        .delete(id)
        .then((res) => {
          setProductId(0);
          resetFormControls();
          setProductItem((prev) => prev.filter((item) => item.id !== id));
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
          placeholder="Search product items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </SearchPaper>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "190%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Name</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Description</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Point</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Stock</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Category</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Image</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "10%",
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
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.description}
                  </TableCell>

                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.point}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.stock}
                  </TableCell>

                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.categoryProduct.name}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    <img src={item.image} alt="Image" width={50} height={50} />
                  </TableCell>

                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteProduct(item.id)}
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
