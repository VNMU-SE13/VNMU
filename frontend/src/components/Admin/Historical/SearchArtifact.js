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

export default function SearchArtifact({ values, setValues }) {
  const [artifactItems, setArtifactItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.Artifact)
      .fetchAll()
      .then((res) => {
        setArtifactItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filteredItems = artifactItems.filter(
      (item) =>
        item.artifactName.toLowerCase().includes(searchKey.toLowerCase())
      // !values.orderDetails.some((ordered) => ordered.foodItemId === item.foodItemId)
    );
    setSearchList(filteredItems);
  }, [searchKey, artifactItems]);

  const addArtifactItem = (artifactItem) => {
    setValues((prevValues) => ({
      ...prevValues,
      artifactIds: [...prevValues.artifactIds, artifactItem], // Thêm trực tiếp artifactItem
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
            onClick={() => addArtifactItem(item.id)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemText primary={item.artifactName} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => addArtifactItem(item.id)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
