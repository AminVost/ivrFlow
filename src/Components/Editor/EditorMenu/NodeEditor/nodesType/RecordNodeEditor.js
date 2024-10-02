import React from "react";
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const RecordNodeEditor = ({ data, handleChange }) => {
  const recordOptions = [
    { value: 'appendRecording', label: 'Append to existing recording rather than replacing' },
    { value: 'keepRecordedFile', label: 'Keep recorded file upon hangup' },
    { value: 'recordWithoutAnswer', label: 'Do not answer, but record anyway if line not yet answered' },
    { value: 'quietMode', label: 'Quiet (do not play a beep tone)' },
    { value: 'skipIfNotAnswered', label: 'Skip recording if the line is not yet answered' },
    { value: 'useAltTerminator', label: 'Use alternate "*" terminator key (DTMF) instead of default "#"' },
    { value: 'ignoreTerminator', label: 'Ignore all terminator keys (DTMF) and keep recording until hangup' },
  ];

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
        value="record"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>Record Reason</InputLabel>
        <Select
          name="recordReason"
          value={data.recordReason || ''}
          onChange={handleChange}
        >
          <MenuItem value="reason1">Reason 1</MenuItem>
          <MenuItem value="reason2">Reason 2</MenuItem>
          <MenuItem value="reason3">Reason 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Max Duration"
        name="maxDuration"
        type="number"
        value={data.maxDuration || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Silence"
        name="silence"
        type="number"
        value={data.silence || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>Record Option</InputLabel>
        <Select
          name="recordOption"
          value={data.recordOption || ''}
          onChange={handleChange}
        >
          {recordOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
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
  );
};

export default RecordNodeEditor;
