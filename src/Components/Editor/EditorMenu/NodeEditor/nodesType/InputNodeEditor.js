import React from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import InfoTooltipAdornment from '../../../../../utils/InfoTooltipAdornment';

const InputNodeEditor = ({ data, handleChange }) => {
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
        <InputLabel id="error-group-label">Error Group</InputLabel>
        <Select
          labelId="error-group-label"
          id="error-group-select"
          name="errorGroup"
          value={data.errorGroup || ''}
          onChange={handleChange}
          endAdornment={<InfoTooltipAdornment tooltipText="This is the error group" />}
          sx={{
            '& .MuiSelect-select': {
              paddingRight: '60px'
            }
          }}
        >
          <MenuItem value="group1">Group 1</MenuItem>
          <MenuItem value="group2">Group 2</MenuItem>
          <MenuItem value="group3">Group 3</MenuItem>
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
