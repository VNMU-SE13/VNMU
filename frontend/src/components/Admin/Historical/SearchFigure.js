import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../api";
import {
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import AddIcon from "@mui/icons-material/Add";

export default function SearchFigure({ values, setValues }) {
  const [figureItems, setFigureItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Figure)
      .fetchAll()
      .then((res) => {
        setFigureItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filteredItems = figureItems.filter(
      (item) => item.name.toLowerCase().includes(searchKey.toLowerCase())
      // !values.orderDetails.some((ordered) => ordered.foodItemId === item.foodItemId)
    );
    setSearchList(filteredItems);
  }, [searchKey, figureItems]);

  const addFigureItem = (figureItem) => {
    setValues((prevValues) => ({
      ...prevValues,
      figureIds: [...prevValues.figureIds, figureItem], // Thêm trực tiếp artifactItem
    }));
  };

  return (
    <>
      <Paper sx={{ display: "flex", alignItems: "center", p: 1, mb: 2 }}>
        <InputBase
          sx={{ flex: 1, ml: 1 }}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search food items"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List sx={{ maxHeight: 450, overflowY: "auto" }}>
        {searchList.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => addFigureItem(item.id)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => addFigureItem(item.id)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
