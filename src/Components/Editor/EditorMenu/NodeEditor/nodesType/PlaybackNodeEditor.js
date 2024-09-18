import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InfoTooltipAdornment from "../../../../../utils/InfoTooltipAdornment";

const PlaybackNodeEditor = ({ data, handleChange }) => {
  const [playbackFirstSelectValue, setPlaybackFirstSelectValue] = useState(data?.fileType);
  const [playbackSecondOptions, setPlaybackSecondOptions] = useState([]);
  const [playbackSecondSelectValue, setPlaybackSecondSelectValue] = useState(
    data?.fileItem
  );

  const handleFirstSelectChange = (event) => {
    const value = event.target.value;
    setPlaybackFirstSelectValue(value);

    let options = [];
    switch (value) {
      case "type1":
        options = ["File 1-1", "File 1-2", "File 1-3"];
        break;
      case "type2":
        options = ["File 2-1", "File 2-2", "File 2-3"];
        break;
      case "type3":
        options = ["File 3-1", "File 3-2", "File 3-3"];
        break;
      default:
        options = [];
    }
    setPlaybackSecondOptions(options);

    // Reset the File Item value if it's not in the new options
    if (!options.includes(playbackSecondSelectValue)) {
      console.log("! options ");
      setPlaybackSecondSelectValue("");
      handleChange({ target: { name: "fileItem", value: "" } });
    }
    handleChange({ target: { name: "fileType", value } });
  };

  const handleSecondSelectChange = (event) => {
    const value = event.target.value;
    setPlaybackSecondSelectValue(value);
    handleChange({ target: { name: "fileItem", value } });
  };

  useEffect(() => {
    if (playbackFirstSelectValue) {
      handleFirstSelectChange({ target: { value: playbackFirstSelectValue } });
    }
  }, []);

  useEffect(() => {
    if (
      playbackSecondSelectValue &&
      playbackSecondOptions.length > 0 &&
      !playbackSecondOptions.includes(playbackSecondSelectValue)
    ) {
      console.log("!playbackSecondOptions", playbackSecondOptions);
      console.log("!playbackSecondSelectValue", playbackSecondSelectValue);
      setPlaybackSecondSelectValue("");
    }
  }, [playbackSecondOptions]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        className="inputText"
        id="labelPlayback"
        name="label"
        label="Label"
        variant="outlined"
        onChange={handleChange}
        value={data.label || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the label" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="priorityPlayback"
        name="priority"
        label="Priority"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.priority || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the priority" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="actionPlayback"
        name="action"
        label="Action"
        variant="outlined"
        onChange={handleChange}
        value="playback"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the action" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="varNamePlayback"
        name="filePath"
        label="File Path"
        variant="outlined"
        onChange={handleChange}
        value={data.filePath || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the File Path Component" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="first-select-playback-label">File Type</InputLabel>
        <Select
          labelId="first-select-playback-label"
          id="first-select-playback"
          name="fileType"
          value={playbackFirstSelectValue}
          label="File Type"
          variant="outlined"
          onChange={handleFirstSelectChange}
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the File Type" />
          }
        >
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          <MenuItem value="type3">Type 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="second-select-playback-label">File Item</InputLabel>
        <Select
          labelId="second-select-playback-label"
          id="second-select-playback"
          name="fileItem"
          value={playbackSecondSelectValue}
          label="File Item"
          onChange={handleSecondSelectChange}
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the File Item" />
          }
        >
          {playbackSecondOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="inputText"
        id="commentsPlayback"
        multiline
        rows={3}
        name="comments"
        label="Comments"
        variant="outlined"
        onChange={handleChange}
        value={data.comments || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="These are the comments" />
          ),
          sx: { paddingRight: 0 },
        }}
      />
    </Box>
  );
};

export default PlaybackNodeEditor;
