import React from "react";
import { TextField, MenuItem, FormControl, Select, InputLabel, Box } from "@mui/material";

const SayDateNodeEditor = ({ data, handleChange }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Label"
        name="label"
        value={data.label || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Priority"
        name="priority"
        type="number"
        value={data.priority || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Action"
        name="action"
        value="say_date"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={data.date || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>Date Type</InputLabel>
        <Select
          name="dateType"
          value={data.dateType || ''}
          onChange={handleChange}
        >
          <MenuItem value="shamsi">shamsi</MenuItem>
          <MenuItem value="miladi">miladi</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Comments"
        name="comments"
        multiline
        rows={3}
        value={data.comments || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
    </Box>
  );
};

export default SayDateNodeEditor;
