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

const InputNodeEditor = ({ data, handleChange }) => {
  const [inputFirstSelectValue, setInputFirstSelectValue] = useState(data?.fileFirstSelect);
  const [inputSecondOptions, setInputSecondOptions] = useState([]);
  const [inputSecondSelectValue, setInputSecondSelectValue] = useState(
    data?.fileSecondSelect
  );
  console.log("data.fileSecondSelect ", data.fileSecondSelect);

  const handleFirstSelectChange = (event) => {
    const value = event.target.value;
    setInputFirstSelectValue(value);

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
    setInputSecondOptions(options);

    // Reset the second select value if it's not in the new options
    if (!options.includes(inputSecondSelectValue)) {
      console.log("! options ");
      setInputSecondSelectValue("");
      handleChange({ target: { name: "fileSecondSelect", value: "" } });
    }
    handleChange({ target: { name: "fileFirstSelect", value } });
  };

  const handleSecondSelectChange = (event) => {
    const value = event.target.value;
    setInputSecondSelectValue(value);
    handleChange({ target: { name: "fileSecondSelect", value } });
  };

  useEffect(() => {
    if (inputFirstSelectValue) {
      handleFirstSelectChange({ target: { value: inputFirstSelectValue } });
    }
  }, []);

  useEffect(() => {
    if (
      inputSecondSelectValue &&
      inputSecondOptions.length > 0 &&
      !inputSecondOptions.includes(inputSecondSelectValue)
    ) {
      console.log("!inputSecondOptions", inputSecondOptions);
      console.log("!inputSecondSelectValue", inputSecondSelectValue);
      setInputSecondSelectValue("");
    }
  }, [inputSecondOptions]);

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        className="inputText"
        id="labelInput"
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
        id="priorityInput"
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
        id="actionInput"
        name="action"
        label="Action"
        variant="outlined"
        onChange={handleChange}
        value="input"
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
        id="varNameInput"
        name="varName"
        label="Var Name"
        variant="outlined"
        onChange={handleChange}
        value={data.varName || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the Var Name Component" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="valueInput"
        name="value"
        label="Value"
        variant="outlined"
        onChange={handleChange}
        value={data.value || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the Value" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="first-select-input-label">First Select</InputLabel>
        <Select
          labelId="first-select-input-label"
          id="first-select-input"
          name="fileFirstSelect"
          value={inputFirstSelectValue}
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
        <InputLabel id="second-select-input-label">Second Select</InputLabel>
        <Select
          labelId="second-select-input-label"
          id="second-select-input"
          name="fileSecondSelect"
          value={inputSecondSelectValue}
          label="Second Select"
          onChange={handleSecondSelectChange}
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the second select" />
          }
        >
          {inputSecondOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
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
        value={data.varLength || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the Var Length" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="timeoutInput"
        name="timeout"
        label="Timeout (second)"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.timeout || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the Timeout" />
          ),
          sx: { paddingRight: 0 },
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
        value={data.loop || ""}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the Loop" />,
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="commentsInput"
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

export default InputNodeEditor;
