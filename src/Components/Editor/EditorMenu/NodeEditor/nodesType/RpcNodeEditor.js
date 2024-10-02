import React from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const RpcNodeEditor = ({ data, handleChange }) => {
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
          value="rpc"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="routine-label">Routine</InputLabel>
          <Select
            labelId="routine-label"
            id="routine-select"
            name="routine"
            value={data.routine || ''}
            onChange={handleChange}
          >
            {['CRM', 'IV@-33', 'Save Voice Log', 'Soap header test'].map((ext) => (
              <MenuItem key={ext} value={ext}>{ext}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="whenRoutineRun-label">When Routine Run</InputLabel>
          <Select
            labelId="whenRoutineRun-label"
            id="whenRoutineRun-select"
            name="whenRoutineRun"
            value={data.whenRoutineRun || ''}
            onChange={handleChange}
          >
            {['NOW', 'ANSWER', 'HANGUP'].map((ext) => (
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

export default RpcNodeEditor;
