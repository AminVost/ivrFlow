import React from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const GoToTagNodeEditor = ({ data, handleChange }) => {
  return (
    <>
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
          value="goto_tag"
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
        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="ivrTagGroup-label">Ivr Tag Group</InputLabel>
          <Select
            labelId="ivrTagGroup-label"
            id="ivrTagGroup-select"
            name="ivrTagGroup"
            value={data.ivrTagGroup || ''}
            onChange={handleChange}
          >
            {['Ivr Tag Group 1', 'Ivr Tag Group 2', 'Ivr Tag Group 3'].map((ext) => (
              <MenuItem key={ext} value={ext}>{ext}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Value"
          name="value"
          value={data.value || ''}
          onChange={handleChange}
          fullWidth
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
    </>
  );
};

export default GoToTagNodeEditor;
