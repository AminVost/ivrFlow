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

const SayNumNodeEditor = ({ data, handleChange }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        className="inputText"
        id="labelSayNum"
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
        id="prioritySayNum"
        name="priority"
        label="Priority"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.priority || 0}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the priority" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="actionSayNum"
        name="action"
        label="Action"
        variant="outlined"
        onChange={handleChange}
        value="say_num"
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
        id="valueSayNum"
        name="value"
        label="Value"
        variant="outlined"
        onChange={handleChange}
        value={data.value || ""}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the Value Component" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="stepSayNum"
        name="step"
        label="Step"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.step || 0}
        InputProps={{
          endAdornment: (
            <InfoTooltipAdornment tooltipText="This is the step" />
          ),
          sx: { paddingRight: 0 },
        }}
      />

      <TextField
        className="inputText"
        id="commentsSayNum"
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

export default SayNumNodeEditor;
