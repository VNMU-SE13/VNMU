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

export default function HistoricalList(props) {
  const {
    setHistoricalId,
    resetFormControls,
    setNotify,
    setHistoryListVisibility,
  } = props;
  const [historicalItem, setHistoricalItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const showForUpdate = (id) => {
    setHistoricalId(id);
    setHistoryListVisibility(false);
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Historical)
      .fetchAll()
      .then((res) => {
        setHistoricalItem(res.data);
        setSearchList(res.data);
        //setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...historicalItem];
    x = x.filter((y) => {
      return y.name.toLowerCase().includes(searchKey.toLocaleLowerCase());
      //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
    });
    setSearchList(x);
  }, [searchKey]);

  const deleteArtifact = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.Historical)
        .delete(id)
        .then((res) => {
          setHistoryListVisibility(false);
          setHistoricalId(0);
          resetFormControls();
          setHistoricalItem((prev) => prev.filter((item) => item.id !== id));
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
          placeholder="Search historical items"
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
                <b>Image</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Start Date</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>End Date</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Timeline</b>
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
                <b>Gorvernance</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Politial Structure</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Figure</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Artifact</b>
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
                <b>Figure</b>
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
                          alt="Historical"
                          width="50"
                          height="50"
                        />
                      ))
                    ) : (
                      <img
                        src={item.images}
                        alt="Historical"
                        width="50"
                        height="50"
                      />
                    )}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.startDate}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.endDate}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.timeLine}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.location}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.gorvernance}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.politialStructure}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.figure}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.artifactHistoricals.length > 0
                      ? item.artifactHistoricals
                          .map(
                            (artifactItem) =>
                              artifactItem.artifact?.artifactName ||
                              "Unknown Artifact"
                          )
                          .join(", ")
                      : "No artifacts"}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.categoryId}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.historicalFigures.length > 0
                      ? item.historicalFigures
                          .map(
                            (figureItem) =>
                              figureItem.figure?.name || "Unknown Figure"
                          )
                          .join(", ")
                      : "No figures"}
                  </TableCell>
                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteArtifact(item.id)}
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
