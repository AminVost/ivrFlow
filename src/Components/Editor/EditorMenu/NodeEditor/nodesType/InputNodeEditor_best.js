import React, { useState, useEffect } from "react";
import { TextField, Box, Button, IconButton, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const InputNodeEditor = ({ data, handleChange }) => {
  console.log('data :>> ', data);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    if (data.comments) {
      // Parse existing comments in data.comments and populate the comments list
      const existingComments = data.comments.split("\n").map((item) => {
        const [number, ...textParts] = item.split("-");
        return { number: number.trim(), text: textParts.join("-").trim() };
      });
      setComments(existingComments);
    }
  }, [data.comments]);

  const updateCommentsInData = (updatedComments) => {
    const formattedComments = updatedComments
      .map((item) => `${item.number}-${item.text}`)
      .join("\n");
    // Update data.comments only when necessary
    data.comments = formattedComments;
    handleChange({ target: { name: "comments", value: formattedComments } });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "" || newNumber.trim() === "") return; // Skip if inputs are empty
    const updatedComments = [...comments, { number: newNumber.trim(), text: newComment.trim() }];
    setComments(updatedComments);
    setNewComment(""); // Reset input
    setNewNumber(""); // Reset number
    updateCommentsInData(updatedComments); // Update data.comments only once
  };

  const handleRemoveComment = (indexToRemove) => {
    const updatedComments = comments.filter((_, index) => index !== indexToRemove);
    setComments(updatedComments);
    updateCommentsInData(updatedComments); // Update data.comments only once
  };

  return (
    <>
      <Box>
        <List>
          {comments.map((comment, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveComment(index)}>
                  🗑️
                </IconButton>
              }
            >
              <ListItemText primary={`${comment.number} - ${comment.text}`} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <TextField
            id="new-number-input"
            label="Number"
            variant="outlined"
            size="small"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            sx={{ flex: "1 1 100px" }}
          />
          <TextField
            id="new-comment-input"
            label="Comment"
            variant="outlined"
            size="small"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ flex: "2 1 200px" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddComment}
            sx={{ flex: "0 0 auto" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InputNodeEditor;
