import React, { useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import InfoTooltipAdornment from '../../../../../utils/InfoTooltipAdornment';

const InputNodeEditor = ({ data, handleChange }) => {
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
    console.log('event ' , event)
    setFileGroup(event.target.value);
    handleChange(event);
  };

  const currentFileGroups = fileOptions.find((option) => option.value === file)?.groups || [];

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        className="inputText"
        id="labelInput"
        name="label"
        label="label"
        variant="outlined"
        onChange={handleChange}
        value={data.label || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the label" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="priorityInput"
        name="priority"
        label="Priority"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.priority || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the priority" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="actionInput"
        name="action"
        label="action"
        variant="outlined"
        onChange={handleChange}
        value={'input'}
        InputProps={{
          readOnly: true,
          endAdornment: <InfoTooltipAdornment tooltipText="This is the action" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="varNameInput"
        name="varName"
        label="Var Name"
        variant="outlined"
        onChange={handleChange}
        value={data.varName || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the Var Name Component" />,
          sx: { paddingRight: 0 }
        }}

      />
      <TextField
        className="inputText"
        id="valueInput"
        name="value"
        label="Value"
        variant="outlined"
        onChange={handleChange}
        value={data.value || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the Value" />,
          sx: { paddingRight: 0 }
        }}
      />

      <FormControl sx={{ mb: 1.2, width: '100%' }}>
        <InputLabel id="file-label">File</InputLabel>
        <Select
          labelId="file-label"
          id="file-select"
          name="file"
          value={file}
          onChange={handleFileChange}
          endAdornment={<InfoTooltipAdornment tooltipText="This is the file" />}
          sx={{
            '& .MuiSelect-select': {
              paddingRight: '60px'
            }
          }}
        >
          {fileOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 1.2, width: '100%' }} disabled={!file}>
        <InputLabel id="file-group-label">File Group</InputLabel>
        <Select
          labelId="file-group-label"
          id="file-group-select"
          name="fileGroup"
          value={fileGroup}
          onChange={handleFileGroupChange}
          endAdornment={<InfoTooltipAdornment tooltipText="This is the file group" />}
          sx={{
            '& .MuiSelect-select': {
              paddingRight: '60px'
            }
          }}
        >
          {currentFileGroups.map((group, index) => (
            <MenuItem key={index} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="inputText"
        id="varLengthInput"
        name="varLength"
        label="Var Length"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.varLength || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the varLength" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="timeoutInput"
        name="timeout"
        label="Timeout"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.timeout || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the Timeout" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="loopInput"
        name="loop"
        label="Loop"
        type="number"
        variant="outlined"
        onChange={handleChange}
        value={data.loop || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the Loop" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="commentsInput"
        multiline
        rows={3}
        name="comments"
        label="comments"
        variant="outlined"
        onChange={handleChange}
        value={data.comments || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="These are the comments" />,
          sx: { paddingRight: 0 }
        }}
      />

    </Box>
  );
};

export default InputNodeEditor;
