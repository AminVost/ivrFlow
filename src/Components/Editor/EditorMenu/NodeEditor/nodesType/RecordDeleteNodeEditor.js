import React from "react";
import { TextField, Box} from "@mui/material";

const RecordDeleteNodeEditor = ({ data, handleChange }) => {
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
          value="record_delete"
          InputProps={{ readOnly: true }}
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

export default RecordDeleteNodeEditor;
