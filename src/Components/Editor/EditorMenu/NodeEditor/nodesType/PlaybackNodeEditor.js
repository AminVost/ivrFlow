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
  const [playbackFirstSelectValue, setPlaybackFirstSelectValue] = useState(data?.fileFirstSelect);
  const [playbackSecondOptions, setPlaybackSecondOptions] = useState([]);
  const [playbackSecondSelectValue, setPlaybackSecondSelectValue] = useState(
    data?.fileSecondSelect
  );
  console.log("data.fileSecondSelect ", data.fileSecondSelect);

  const handleFirstSelectChange = (event) => {
    const value = event.target.value;
    setPlaybackFirstSelectValue(value);

    let options = [];
    switch (value) {
      case "group1":
        options = ["Option 1-1", "Option 1-2", "Option 1-3"];
        break;
      case "group2":
        options = ["Option 2-1", "Option 2-2", "Option 2-3"];
        break;
      case "group3":
        options = ["Option 3-1", "Option 3-2", "Option 3-3"];
        break;
      default:
        options = [];
    }
    setPlaybackSecondOptions(options);

    // Reset the second select value if it's not in the new options
    if (!options.includes(playbackSecondSelectValue)) {
      console.log("! options ");
      setPlaybackSecondSelectValue("");
      handleChange({ target: { name: "fileSecondSelect", value: "" } });
    }
    handleChange({ target: { name: "fileFirstSelect", value } });
  };

  const handleSecondSelectChange = (event) => {
    const value = event.target.value;
    setPlaybackSecondSelectValue(value);
    handleChange({ target: { name: "fileSecondSelect", value } });
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
        <InputLabel id="first-select-playback-label">First Select</InputLabel>
        <Select
          labelId="first-select-playback-label"
          id="first-select-playback"
          name="fileFirstSelect"
          value={playbackFirstSelectValue}
          label="First Select"
          variant="outlined"
          onChange={handleFirstSelectChange}
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the first select" />
          }
        >
          <MenuItem value="group1">Group 1</MenuItem>
          <MenuItem value="group2">Group 2</MenuItem>
          <MenuItem value="group3">Group 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="second-select-playback-label">Second Select</InputLabel>
        <Select
          labelId="second-select-playback-label"
          id="second-select-playback"
          name="fileSecondSelect"
          value={playbackSecondSelectValue}
          label="Second Select"
          onChange={handleSecondSelectChange}
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the second select" />
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
