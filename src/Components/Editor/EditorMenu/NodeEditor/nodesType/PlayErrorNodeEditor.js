import React from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import InfoTooltipAdornment from '../../../../../utils/InfoTooltipAdornment';

const PlayErrorNodeEditor = ({ data, handleChange }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        className="inputText"
        id="labelPlayError"
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
        id="priorityPlayError"
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
        id="actionPlayError"
        name="action"
        label="action"
        variant="outlined"
        onChange={handleChange}
        value={'play_error'}
        InputProps={{
          readOnly: true,
          endAdornment: <InfoTooltipAdornment tooltipText="This is the action" />,
          sx: { paddingRight: 0 }
        }}
      />

      <TextField
        className="inputText"
        id="errorCodePlayError"
        name="errorCode"
        label="Error Code"
        variant="outlined"
        onChange={handleChange}
        value={data.errorCode || ''}
        InputProps={{
          endAdornment: <InfoTooltipAdornment tooltipText="This is the error code" />,
          sx: { paddingRight: 0 }
        }}
      />


      <FormControl>
        <InputLabel id="error-group-label">Error Group</InputLabel>
        <Select
          labelId="error-group-label"
          id="error-group-select"
          name="errorGroup"
          value={data.errorGroup || ''}
          onChange={handleChange}
          endAdornment={<InfoTooltipAdornment tooltipText="This is the error group" />}
        >
          <MenuItem value="group1">Group 1</MenuItem>
          <MenuItem value="group2">Group 2</MenuItem>
          <MenuItem value="group3">Group 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        className="inputText"
        id="commentsPlayError"
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

export default PlayErrorNodeEditor;
