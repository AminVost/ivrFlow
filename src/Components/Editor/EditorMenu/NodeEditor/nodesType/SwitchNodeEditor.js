import React, { useState, useEffect } from "react";
import './css/SwitchNodeEditor.css';
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, IconButton } from "@mui/material";
import { Add, Delete } from '@mui/icons-material';

const SwitchNodeEditor = ({ data, handleChange }) => {
  // Initialize cases from data or create a default case
  const [cases, setCases] = useState(data.cases || [{ id: 1, operand: '', value: '' }]);

  useEffect(() => {
    // Update the parent component with the new cases array whenever it changes
    handleChange({ target: { name: 'cases', value: cases } });
  }, [cases]);

  const handleAddCase = () => {
    setCases([...cases, { id: cases.length + 1, operand: '', value: '' }]);
  };

  const handleRemoveCase = (index) => {
    setCases(cases.filter((_, i) => i !== index));
  };

  const handleCaseChange = (index, field, value) => {
    const updatedCases = cases.map((caseItem, i) =>
      i === index ? { ...caseItem, [field]: value } : caseItem
    );
    setCases(updatedCases);
  };

  const renderCaseElements = (caseItem, index) => {
    switch (caseItem.operand) {
      case 'Time Frame':
        return (
          <>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                value={caseItem.value}
                onChange={(e) => handleCaseChange(index, 'value', e.target.value)}
              >
                <MenuItem value="Time Frame 1">Time Frame 1</MenuItem>
                <MenuItem value="Time Frame 2">Time Frame 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>IvrFlow</InputLabel>
              <Select
                value={caseItem.ivrFlow || ''}
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      case 'List':
        return (
          <>
            <TextField
              placeholder="Operand 1"
              value={caseItem.operand1 || ''}
              onChange={(e) => handleCaseChange(index, 'operand1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>List</InputLabel>
              <Select
                value={caseItem.list || ''}
                onChange={(e) => handleCaseChange(index, 'list', e.target.value)}
              >
                {/* Add List options here */}
                <MenuItem value="List 1">List 1</MenuItem>
                <MenuItem value="List 2">List 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>IvrFlow</InputLabel>
              <Select
                value={caseItem.ivrFlow || ''}
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      case 'Pattern':
      case '>':
      case '<':
      case '=>':
      case '=':
      case '!=':
        return (
          <>
            <TextField
              placeholder="Operand 1"
              value={caseItem.operand1 || ''}
              onChange={(e) => handleCaseChange(index, 'operand1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Operand 2</InputLabel>
              <Select
                value={caseItem.operand2 || ''}
                onChange={(e) => handleCaseChange(index, 'operand2', e.target.value)}
              >
                {/* Add Operand 2 options here */}
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="IvrFlow"
              value={caseItem.ivrFlow || ''}
              onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      default:
        return null;
    }
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
        label="Action"
        name="action"
        value="switch"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1.2 }}>
        <h6 className="switchCaseTitle">
          Switch Cases
        </h6>
        {cases.map((caseItem, index) => (
          <Box key={caseItem.id} sx={{ flex: '1 1 auto', minWidth: '300px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', position: 'relative', borderRadius: '4px', padding: 2 }}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel>Operand</InputLabel>
              <Select
                value={caseItem.operand}
                onChange={(e) => handleCaseChange(index, 'operand', e.target.value)}
              >
                <MenuItem value="Time Frame">Time Frame</MenuItem>
                <MenuItem value="List">List</MenuItem>
                <MenuItem value="Pattern">Pattern</MenuItem>
                <MenuItem value=">">Greater Than</MenuItem>
                <MenuItem value="<">Less Than</MenuItem>
                <MenuItem value="=>">Greater or Equal</MenuItem>
                <MenuItem value="=">Equal</MenuItem>
                <MenuItem value="!=">Not Equal</MenuItem>
              </Select>
            </FormControl>
            {renderCaseElements(caseItem, index)}
            <IconButton onClick={() => handleRemoveCase(index)} sx={removeButtonStyle}>
              <Delete sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button variant="outlined" onClick={handleAddCase} startIcon={<Add sx={{ color: '#1976d2' }} />}>
        Add Case
      </Button>

      <TextField
        label="Comments"
        name="comments"
        multiline
        rows={3}
        value={data.comments || ''}
        onChange={handleChange}
        fullWidth
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default SwitchNodeEditor;

const removeButtonStyle = {
  width: '1.5rem',
  height: '1.5rem',
  border: '1px solid #1976d2',
  padding: '1rem',
  margin: '0 auto',
  marginTop: '.5rem',
  '&:hover': {
    backgroundColor: '#c0392b',
    border: '1px solid white',
    '& svg': {
      color: 'white',
    },
  },
};
