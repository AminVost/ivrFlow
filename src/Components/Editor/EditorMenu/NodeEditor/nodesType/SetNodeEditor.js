import React from "react";
import { TextField, Box, Checkbox, FormControlLabel } from "@mui/material";

const SetNodeEditor = ({ data, handleChange }) => {
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
        value="set"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Var Name"
        name="varName"
        value={data.varName || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Value"
        name="value"
        value={data.value || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={data.evaluate || false}
            onChange={(e) => handleChange({ target: { name: 'evaluate', value: e.target.checked } })}
            name="evaluate"
          />
        }
        label="Evaluate"
        sx={{ mb: 1.2 }}
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

export default SetNodeEditor;
