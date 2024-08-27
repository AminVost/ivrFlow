import React, { useState } from "react";
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SendFaxNodeEditor = ({ data, handleChange }) => {
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

  const selectedFile = fileOptions.find(option => option.value === file);

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
        value="send_fax"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <TextField
        label="Fax Number"
        name="faxNumber"
        type="number"
        value={data.faxNumber || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl fullWidth sx={{ mb: 1.2 }}>
        <InputLabel>File</InputLabel>
        <Select
          name="file"
          value={file}
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
          value={fileGroup}
          onChange={handleFileGroupChange}
          disabled={!selectedFile}
        >
          {selectedFile?.groups.map((group, index) => (
            <MenuItem key={index} value={group}>
              {group}
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

export default SendFaxNodeEditor;
