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

const IfNodeEditor = ({ data, handleChange }) => {

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        className="inputText"
        id="labelIf"
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
        id="priorityIf"
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
        id="actionIf"
        name="action"
        label="Action"
        variant="outlined"
        onChange={handleChange}
        value="if"
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
        id="firstValueIf"
        name="firstValue"
        label="Value"
        variant="outlined"
        onChange={handleChange}
        value={data.firstValue || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the firstValue Component" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="operand-if-label">Select an option</InputLabel>
        <Select
          labelId="operand-if-label"
          id="operand-if"
          name="operand"
          label="Operand"
          variant="outlined"
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the Operand" />
          }
        >
          <MenuItem value="timeFrame">Time Frame</MenuItem>
          <MenuItem value="list">List</MenuItem>
          <MenuItem value="pattern">Pattern</MenuItem>
          <MenuItem value="bigger">&lt;</MenuItem>
          <MenuItem value="lessThanOrEqual">&le;</MenuItem>
          <MenuItem value="greaterThan">&gt;</MenuItem>
          <MenuItem value="greaterThanOrEqual">&ge;</MenuItem>
          <MenuItem value="equal">=</MenuItem>
          <MenuItem value="notEqual">&ne;</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="timeFrame-if-label">Select an option</InputLabel>
        <Select
          labelId="timeFrame-if-label"
          id="timeFrame-if"
          name="timeFrame"
          label="Time Frame"
          variant="outlined"
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the Time Frame" />
          }
        >
          <MenuItem value="timeFrame1">Time Frame1</MenuItem>
          <MenuItem value="timeFrame2">Time Frame2</MenuItem>
          <MenuItem value="timeFrame3">Time Frame3</MenuItem>
          <MenuItem value="timeFrame4">Time Frame4</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="list-if-label">Select an option</InputLabel>
        <Select
          labelId="list-if-label"
          id="list-if"
          name="list"
          label="List"
          variant="outlined"
          endAdornment={
            <InfoTooltipAdornment tooltipText="This is the List" />
          }
        >
          <MenuItem value="list1">list1</MenuItem>
          <MenuItem value="list2">list2</MenuItem>
          <MenuItem value="list3">list3</MenuItem>
          <MenuItem value="list4">list4</MenuItem>
        </Select>
      </FormControl>

      <TextField
        className="inputText"
        id="secoundValueIf"
        name="secoundValue"
        label="Value"
        variant="outlined"
        onChange={handleChange}
        value={data.secoundValue || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the secoundValue" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="trueGoTo-if-label">Select an option</InputLabel>
        <Select
          labelId="trueGoTo-if-label"
          id="trueGoTo-if"
          name="trueGoTo"
          label="When True Goto IVR"
          variant="outlined"
          endAdornment={
            <InfoTooltipAdornment tooltipText="When True Goto IVR" />
          }
        >
          <MenuItem value="ivr1">IVR 1</MenuItem>
          <MenuItem value="ivr2">IVR 2</MenuItem>
          <MenuItem value="ivr3">IVR 3</MenuItem>
          <MenuItem value="ivr4">IVR 4</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="falseGoTo-if-label">Select an option</InputLabel>
        <Select
          labelId="falseGoTo-if-label"
          id="falseGoTo-if"
          name="falseGoTo"
          label="When False Goto IVR"
          variant="outlined"
          endAdornment={
            <InfoTooltipAdornment tooltipText="When False Goto IVR" />
          }
        >
          <MenuItem value="ivr1">IVR 1</MenuItem>
          <MenuItem value="ivr2">IVR 2</MenuItem>
          <MenuItem value="ivr3">IVR 3</MenuItem>
          <MenuItem value="ivr4">IVR 4</MenuItem>
        </Select>
      </FormControl>

      <TextField
        className="inputText"
        id="commentsIf"
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

export default IfNodeEditor;
