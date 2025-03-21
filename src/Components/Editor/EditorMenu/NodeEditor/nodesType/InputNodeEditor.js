import React, { useState, useEffect } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, Button, FormControlLabel, IconButton, List, ListItem, ListItemText } from "@mui/material";
import InfoTooltipAdornment from '../../../../../utils/InfoTooltipAdornment';
import "./css/InputNodeEditor.css";
import getIcons from "../../../../../utils/getIcons";


const InputNodeEditor = ({ data, handleChange }) => {
  console.log('data :>> ', data);
  const [showDetails, setShowDetails] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

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

  const handleCheckboxChange = (event) => {
    setShowDetails(event.target.checked);

    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        name: event.target.name,
        value: event.target.checked ? "on" : "off"
      }
    };

    handleChange(modifiedEvent);
  };
  const [fileType, setFile] = useState('');
  const [fileItem, setFileGroup] = useState('');

  const fileOptions = [
    { value: 'fileType1', label: 'File Type 1', groups: ['FileItem1A', 'FileItem1B'] },
    { value: 'fileType2', label: 'File Type 2', groups: ['FileItem2A', 'FileItem2B'] },
    { value: 'fileType3', label: 'File Type 3', groups: ['FileItem3A', 'FileItem3B'] },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.value;
    setFile(selectedFile);

    // Reset fileItem when the fileType changes
    setFileGroup('');
    handleFileGroupChange({ target: { name: 'fileItem', value: null } });
    handleChange(event);
  };

  const handleFileGroupChange = (event) => {
    console.log('event ', event)
    setFileGroup(event.target.value);
    handleChange(event);
  };

  const currentFileGroups = fileOptions.find((option) => option.value === fileType)?.groups || [];

  const updateCommentsInData = (updatedComments) => {
    const formattedComments = updatedComments
      .map((item) => `${item.number}-${item.text}`)
      .join("\n");
    data.comments = formattedComments;
    handleChange({ target: { name: "comments", value: formattedComments } });
  };

  const handleAddOrUpdateComment = () => {
    if (newComment.trim() === "" || newNumber.trim() === "") return; // Skip if inputs are empty

    let updatedComments;
    if (editingIndex !== null) {
      // Update the existing comment
      updatedComments = comments.map((comment, index) =>
        index === editingIndex ? { number: newNumber.trim(), text: newComment.trim() } : comment
      );
      setEditingIndex(null); // Exit editing mode
    } else {
      // Add a new comment
      updatedComments = [...comments, { number: newNumber.trim(), text: newComment.trim() }];
    }

    setComments(updatedComments);
    setNewComment(""); // Reset input
    setNewNumber(""); // Reset number
    updateCommentsInData(updatedComments);
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setNewNumber(comments[index].number);
    setNewComment(comments[index].text);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null); // Exit editing mode
    setNewComment(""); // Reset input
    setNewNumber(""); // Reset number
  };

  const handleRemoveComment = (indexToRemove) => {
    const updatedComments = comments.filter((_, index) => index !== indexToRemove);
    setComments(updatedComments);
    updateCommentsInData(updatedComments);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormControlLabel
          control={
            <Checkbox
              name="showInfo"
              checked={showDetails}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Show Info"
        />
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          className="inputText"
          id="labelInput"
          name="label"
          label="label"
          variant="outlined"
          onChange={handleChange}
          value={data.label || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the label" />,
            sx: { paddingRight: 0 }
          }}
        />

        <TextField
          className="inputText"
          id="actionInput"
          name="action"
          label="action"
          variant="outlined"
          onChange={handleChange}
          value={'input'}
          InputProps={{
            readOnly: true,
            endAdornment: <InfoTooltipAdornment tooltipText="This is the action" />,
            sx: { paddingRight: 0 }
          }}
        />

        <TextField
          className="inputText"
          id="varNameInput"
          name="varName"
          label="Var Name"
          variant="outlined"
          onChange={handleChange}
          value={data.varName || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the Var Name Component" />,
            sx: { paddingRight: 0 }
          }}

        />
        <TextField
          className="inputText"
          id="valueInput"
          name="value"
          label="Value"
          variant="outlined"
          onChange={handleChange}
          value={data.value || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the Value" />,
            sx: { paddingRight: 0 }
          }}
        />

        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="fileType-label">File Type</InputLabel>
          <Select
            labelId="fileType-label"
            id="fileType-select"
            name="fileType"
            value={fileType}
            label=">File Type"
            onChange={handleFileChange}
            endAdornment={<InfoTooltipAdornment tooltipText="This is the fileType" />}
            sx={{
              '& .MuiSelect-select': {
                paddingRight: '60px'
              }
            }}
          >
            {fileOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ mb: 1.2, width: '100%' }} disabled={!fileType}>
          <InputLabel id="file-group-label">File Item</InputLabel>
          <Select
            labelId="file-group-label"
            id="file-group-select"
            name="fileItem"
            value={fileItem}
            label="File Item"
            onChange={handleFileGroupChange}
            endAdornment={<InfoTooltipAdornment tooltipText="This is the file group" />}
            sx={{
              '& .MuiSelect-select': {
                paddingRight: '60px'
              }
            }}
          >
            {currentFileGroups.map((group, index) => (
              <MenuItem key={index} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="inputText"
          id="varLengthInput"
          name="varLength"
          label="Var Length"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={data.varLength || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the varLength" />,
            sx: { paddingRight: 0 }
          }}
        />

        <TextField
          className="inputText"
          id="timeoutInput"
          name="timeout"
          label="Timeout"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={data.timeout || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the Timeout" />,
            sx: { paddingRight: 0 }
          }}
        />

        <TextField
          className="inputText"
          id="loopInput"
          name="loop"
          label="Loop"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={data.loop || ''}
          InputProps={{
            endAdornment: <InfoTooltipAdornment tooltipText="This is the Loop" />,
            sx: { paddingRight: 0 }
          }}
        />

        <Box>
          {/* <InputLabel sx={{ mb: 1.2 , color:"white" }}>Comments</InputLabel> */}
          <h6 className="commentsTitle">Comments</h6>
          <List>
            {comments.map((comment, index) => (
              <ListItem
                className="custom-list-item-comments"
                key={index}
                secondaryAction={
                  <Box sx={{
                    display: 'flex',
                    gap: '.5rem'              
                  }}>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditComment(index)}
                      disabled={editingIndex !== null && editingIndex !== index} // Disable edit for other items during edit
                    >
                      {getIcons('RiEdit2Line', {
                        style: { color: editingIndex !== null && editingIndex !== index ? "gray" : "white", fontSize: "22px" },
                        className: "icon-style-edit"
                      })}
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveComment(index)}
                      disabled={editingIndex !== null} // Disable delete during edit
                    >
                      {getIcons('RiDeleteBin6Line', { style: { color: editingIndex !== null && editingIndex !== index ? "gray" : "white", fontSize: "22px" },
                        className: "icon-style-delete" })}
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${comment.number} - ${comment.text}`} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="new-number-input"
                label="Number"
                variant="outlined"
                size="small"
                type="number"
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
                sx={{ flex: "1 1 50px" }}
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
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={editingIndex !== null ? getIcons("RiEdit2Line") : getIcons("RiAddBoxLine")}
                onClick={handleAddOrUpdateComment}
                sx={{ flex: "0 0 auto" }}
              >
                {editingIndex !== null ? "Update" : "Add"}
              </Button>
              {editingIndex !== null && (
                <Button
                  variant="outlined"
                  startIcon={getIcons("RiCloseFill")}
                  onClick={handleCancelEdit}
                  sx={{ flex: "0 0 auto" }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>

        </Box>

      </Box>
    </>
  );
};

export default InputNodeEditor;
