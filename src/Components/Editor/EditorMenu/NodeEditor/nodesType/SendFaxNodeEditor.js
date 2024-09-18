import React, { useState } from "react";
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const SendFaxNodeEditor = ({ data, handleChange }) => {
  const [fileType, setFile] = useState('');
  const [fileItem, setFileGroup] = useState('');

  const fileOptions = [
    { value: 'fileType1', label: 'File Type 1', groups: ['fileItem1A', 'fileItem1B'] },
    { value: 'fileType2', label: 'File Type 2', groups: ['fileItem2A', 'fileItem2B'] },
    { value: 'fileType3', label: 'File Type 3', groups: ['fileItem3A', 'fileItem3B'] },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.value;
    setFile(selectedFile);

    // Reset fileItem when the fileType changes
    setFileGroup('');
    handleFileGroupChange({ target: { name: 'fileItem', value: null } });
    handleChange(event);
  };

  const handleFileGroupChange = (event) => {
    setFileGroup(event.target.value);
    handleChange(event);
  };

  const selectedFile = fileOptions.find(option => option.value === fileType);

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
        <InputLabel>File Type</InputLabel>
        <Select
          name="fileType"
          value={fileType}
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
        <InputLabel>File Item</InputLabel>
        <Select
          name="fileItem"
          value={fileItem}
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
