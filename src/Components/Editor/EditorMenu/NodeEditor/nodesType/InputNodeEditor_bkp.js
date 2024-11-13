import React, { useState, useEffect } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import InfoTooltipAdornment from '../../../../../utils/InfoTooltipAdornment';

const InputNodeEditor = ({ data, handleChange }) => {
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
    { value: 'fileType1', label: 'File Type 1', groups: ['FileItem1A', 'FileItem1B'] },
    { value: 'fileType2', label: 'File Type 2', groups: ['FileItem2A', 'FileItem2B'] },
    { value: 'fileType3', label: 'File Type 3', groups: ['FileItem3A', 'FileItem3B'] },
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
    console.log('event ', event)
    setFileGroup(event.target.value);
    handleChange(event);
  };

  const currentFileGroups = fileOptions.find((option) => option.value === fileType)?.groups || [];

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
          <InputLabel id="fileType-label">File Type</InputLabel>
          <Select
            labelId="fileType-label"
            id="fileType-select"
            name="fileType"
            value={fileType}
            label=">File Type"
            onChange={handleFileChange}
            endAdornment={<InfoTooltipAdornment tooltipText="This is the fileType" />}
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

        <FormControl sx={{ mb: 1.2, width: '100%' }} disabled={!fileType}>
          <InputLabel id="file-group-label">File Item</InputLabel>
          <Select
            labelId="file-group-label"
            id="file-group-select"
            name="fileItem"
            value={fileItem}
            label="File Item"
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
    </>
  );
};

export default InputNodeEditor;
