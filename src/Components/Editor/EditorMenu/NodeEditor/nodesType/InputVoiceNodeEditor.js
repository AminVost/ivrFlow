import React, { useState } from "react";
import { TextField, Box, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";

const InputVoiceNodeEditor = ({ data, handleChange }) => {
  const [file, setFile] = useState('');
  const [fileGroup, setFileGroup] = useState('');

  const fileOptions = [
    { value: 'file1', label: 'File 1', groups: ['Group 1A', 'Group 1B'] },
    { value: 'file2', label: 'File 2', groups: ['Group 2A', 'Group 2B'] },
    { value: 'file3', label: 'File 3', groups: ['Group 3A', 'Group 3B'] },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.value;
    setFile(selectedFile);

    // Reset fileGroup when the file changes
    setFileGroup('');
    handleFileGroupChange({ target: { name: 'fileGroup', value: null } });
    handleChange(event);
  };

  const handleFileGroupChange = (event) => {
    setFileGroup(event.target.value);
    handleChange(event);
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
        value="record"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>Speech Server</InputLabel>
        <Select
          name="speechServer"
          value={data.speechServer || ''}
          onChange={handleChange}
        >
          <MenuItem value="server1">Server 1</MenuItem>
          <MenuItem value="server2">Server 2</MenuItem>
          <MenuItem value="server3">Server 3</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Silence Threshold"
        name="silenceThreshold"
        type="number"
        value={data.silenceThreshold || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Talk Threshold Comment"
        name="talkThresholdComment"
        value={data.talkThresholdComment || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!!data.stopAnnounce}
            onChange={(e) => handleChange({ target: { name: 'stopAnnounce', value: e.target.checked } })}
            name="stopAnnounce"
          />
        }
        label="Stop Announce"
        sx={{ mb: 1.2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={!!data.acceptDtmf}
            onChange={(e) => handleChange({ target: { name: 'acceptDtmf', value: e.target.checked } })}
            name="acceptDtmf"
          />
        }
        label="Accept DTMF"
        sx={{ mb: 1.2 }}
      />

      <FormControl sx={{ mb: 1.2, width: '100%' }}>
        <InputLabel id="voiceLog-label">Voice Log</InputLabel>
        <Select
          labelId="voiceLog-label"
          id="voiceLog-select"
          name="voiceLog"
          value={data.voiceLog || ''}
          onChange={handleChange}
        >
          {['Default', 'Inactive', 'Active'].map((ext) => (
            <MenuItem key={ext} value={ext}>{ext}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Confidence Variable Name"
        name="confidenceVarName"
        value={data.confidenceVarName || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Text Variable Name"
        name="textVarName"
        value={data.textVarName || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>File</InputLabel>
        <Select
          name="file"
          value={file || ''}
          onChange={handleFileChange}
        >
          {fileOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>File Group</InputLabel>
        <Select
          name="fileGroup"
          value={fileGroup || ''}
          onChange={handleFileGroupChange}
        >
          {fileOptions.find((option) => option.value === file)?.groups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Var Length"
        name="varLength"
        type="number"
        value={data.varLength || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Timeout"
        name="timeout"
        type="number"
        value={data.timeout || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Loop"
        name="loop"
        type="number"
        value={data.loop || ''}
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
  );
};

export default InputVoiceNodeEditor;
