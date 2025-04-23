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

export default function MuseumList(props) {
  const { setMuseumId, resetFormControls, setNotify, setMuseumVisible } = props;
  const [museumItem, setMuseumItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const showForUpdate = (id) => {
    setMuseumId(id);
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Museum)
      .fetchAll()
      .then((res) => {
        setMuseumItem(res.data);
        setSearchList(res.data);
        //setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...museumItem];
    x = x.filter((y) => {
      return y.name.toLowerCase().includes(searchKey.toLocaleLowerCase());
      //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
    });
    setSearchList(x);
  }, [searchKey]);

  const deleteMuseum = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.Museum)
        .delete(id)
        .then((res) => {
          setMuseumId(0);
          resetFormControls();
          setMuseumItem((prev) => prev.filter((item) => item.id !== id));
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
          placeholder="Search museum items"
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
                <b>Image List</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Location</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Establish Year</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Contact</b>
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
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Video</b>
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
                    {Array.isArray(item.images) ? (
                      item.images.map((img, index) => (
                        <img
                          key={index}
                          src={img.imageUrl}
                          alt="Museum"
                          width="50"
                          height="50"
                        />
                      ))
                    ) : (
                      <img
                        src={item.images}
                        alt="Museum"
                        width="50"
                        height="50"
                      />
                    )}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.location}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.establishYear}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.contact}
                  </TableCell>

                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    <img src={item.image} alt="Image" width={50} height={50} />
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    <img src={item.video} alt="Video" width={50} height={50} />
                  </TableCell>

                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteMuseum(item.id)}
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
