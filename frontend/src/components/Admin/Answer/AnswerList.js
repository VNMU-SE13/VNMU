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

export default function AnswerList(props) {
  const { setAnswerId, resetFormControls, setNotify, setAnswerVisible } = props;
  const [answerItem, setAnswerItem] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [searchList, setSearchList] = useState([]);

  const showForUpdate = (id) => {
    setAnswerId(id);
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Answer)
      .fetchAll()
      .then((res) => {
        setAnswerItem(res.data);
        setSearchList(res.data);
        //setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...answerItem];
    x = x.filter((y) => {
      return y.text.toLowerCase().includes(searchKey.toLocaleLowerCase());
      //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
    });
    setSearchList(x);
  }, [searchKey]);

  const deleteQuestion = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint(ENDPIONTS.Answer)
        .delete(id)
        .then((res) => {
          setAnswerId(0);
          resetFormControls();
          setAnswerItem((prev) => prev.filter((item) => item.id !== id));
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
          placeholder="Search answer items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </SearchPaper>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Text</b>
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>The answer</b>
              </TableCell>

              <TableCell
                sx={{
                  width: "15%",
                  whiteSpace: "nowrap",
                }}
              >
                <b>Question</b>
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
                    {item.text}
                  </TableCell>
                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.isCorrect ? "Đúng" : "Sai"}
                  </TableCell>

                  <TableCell onClick={(e) => showForUpdate(item.id)}>
                    {item.question.text}
                  </TableCell>

                  <TableCell>
                    <DeleteOutLineTwoToneIcon
                      onClick={(e) => deleteQuestion(item.id)}
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
