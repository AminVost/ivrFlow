import React, { useState, useEffect } from "react";
import { TextField, Box, Select, MenuItem, FormControl, InputLabel, heckbox, FormControlLabel, Checkbox } from "@mui/material";

const SendFaxNodeEditor = ({ data, handleChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  const handleCheckboxChange = (event) => {
    setShowDetails(event.target.checked);

    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        name: event.target.name,
        value: event.target.checked ? "on" : "off"
      }
    };

    handleChange(modifiedEvent);
  };
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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormControlLabel
          control={
            <Checkbox
              name="showInfo"
              checked={showDetails}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Show Info"
        />
      </Box>
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
            label="File Type"
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
            label="File Item"
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
    </>
  );
};

export default SendFaxNodeEditor;
