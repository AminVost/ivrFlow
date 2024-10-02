import React from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SetRecordPlanNodeEditor = ({ data, handleChange }) => {
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
          value="set_record_plan"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="setRecordPlan-label">set_record_plan</InputLabel>
          <Select
            labelId="setRecordPlan-label"
            id="setRecordPlan-select"
            name="setRecordPlan"
            value={data.setRecordPlan || ''}
            onChange={handleChange}
          >
            {['Record Plan 1', 'Record Plan 2'].map((ext) => (
              <MenuItem key={ext} value={ext}>{ext}</MenuItem>
            ))}
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
    </>
  );
};

export default SetRecordPlanNodeEditor;
