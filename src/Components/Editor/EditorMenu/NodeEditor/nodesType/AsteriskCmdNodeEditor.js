import React from "react";
import { TextField, Box } from "@mui/material";

const AsteriskCmdNodeEditor = ({ data, handleChange }) => {
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
          value="asterisk_cmd"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Asterisk CMD"
          name="asteriskCmd"
          value={data.asteriskCmd || ''}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Asterisk CMD Value"
          name="asteriskCmdValue"
          value={data.asteriskCmdValue || ''}
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

export default AsteriskCmdNodeEditor;
