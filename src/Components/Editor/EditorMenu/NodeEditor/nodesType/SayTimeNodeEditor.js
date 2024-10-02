import React from "react";
import { TextField, MenuItem, FormControl, Select, InputLabel, Box } from "@mui/material";

const SayDateNodeEditor = ({ data, handleChange }) => {
  const handleDateChange = (event) => {
    const value = event.target.value;
    const regexPartial = /^(\d{0,2}):?(\d{0,2})$/; // Allows partial hh:mm format

    // Only update the state if the input is partially valid
    if (regexPartial.test(value)) {
      handleChange({ target: { name: 'time', value } });
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
        value="say_time"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Time"
        name="time"
        type="text"
        value={data.time || ''}
        onChange={handleDateChange}
        fullWidth
        sx={{ mb: 1.2 }}
        placeholder="hh:mm"
      />
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
