import React from "react";
import { TextField, MenuItem, FormControl, Select, InputLabel, Box } from "@mui/material";

const SayDateNodeEditor = ({ data, handleChange }) => {

  const handleDateChange = (event) => {
    const value = event.target.value;
    // Allow partial matches to enable typing step by step
    const regex = /^\d{0,4}(\/\d{0,2})?(\/\d{0,2})?$/;
    if (regex.test(value)) {
      handleChange({ target: { name: 'date', value } });
    }
  };

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
        type="text"
        value={data.date || ''}
        onChange={handleDateChange}
        fullWidth
        sx={{ mb: 1.2 }}
        placeholder="YYYY/MM/DD"
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
