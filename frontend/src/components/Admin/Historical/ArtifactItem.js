import React from "react";
import {
  List,
  ListItemText,
  Paper,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

export default function ArtifactItem({ values, setValues }) {
  const orderedArtifactItems = Array.isArray(values.artifactIds)
    ? values.artifactIds
    : [];

  const removeArtifactItem = (index, id) => {
    let x = { ...values };
    x.artifactIds = x.artifactIds.filter((_, i) => i !== index);
    if (id !== 0) x.deleteArtifactItem += id + ",";
    setValues({ ...x });
  };

  return (
    <List>
      {orderedArtifactItems.length === 0 ? (
        <ListItem>
          <ListItemText
            primary="Please select artifact items"
            primaryTypographyProps={{
              sx: { textAlign: "center", fontStyle: "italic" },
            }}
          />
        </ListItem>
      ) : (
        orderedArtifactItems.map((item, idx) => (
          <Paper
            key={idx}
            sx={{
              margin: "15px 0px",
              "&:hover": { cursor: "pointer" },
              "&:hover .deleteButton": { display: "block" },
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {item}
                  </Typography>
                }
                // secondary={
                //   <>
                //     <ButtonGroup
                //       size="small"
                //       sx={{
                //         backgroundColor: "#E3E3E3",
                //         borderRadius: 2,
                //         "& .MuiButtonBase-root": {
                //           border: "none",
                //           minWidth: 25,
                //           padding: "2px",
                //         },
                //         "& button:nth-of-type(2)": {
                //           fontSize: "1.2em",
                //           color: "#000",
                //         },
                //       }}
                //     >

                //     </ButtonGroup>

                //   </>
                // }
              />
              <ListItemSecondaryAction
                sx={{ display: "none" }}
                className="deleteButton"
              >
                <IconButton onClick={() => removeArtifactItem(idx, item)}>
                  <DeleteTwoToneIcon sx={{ color: "#E81719" }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))
      )}
    </List>
  );
}
