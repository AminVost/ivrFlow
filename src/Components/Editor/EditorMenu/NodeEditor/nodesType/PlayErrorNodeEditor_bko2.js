import React from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Box } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";

const PlayErrorNodeEditor = ({ data = {}, handleChange }) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Label"
          id="outlined-label"
          placeholder="Enter label"
          size="normal"
          value={data.label || ''}
          onChange={(e) => handleChange(e.target.value, 'label')}
        />
      </div>
      <div>
        <TextField
          label="Action"
          id="outlined-action"
          placeholder="Action"
          size="normal"
          value={data.action || ''}
          onChange={(e) => handleChange(e.target.value, 'action')}
          disabled
        />
      </div>
      <div>
        <TextField
          label="Error Code"
          id="outlined-error-code"
          placeholder="Enter error code"
          size="normal"
          type="number"
          value={data.errorCode || ''}
          onChange={(e) => handleChange(e.target.value, 'errorCode')}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="error-group-label">Error Group</InputLabel>
          <Select
            labelId="error-group-label"
            id="error-group-select"
            value={data.errorGroup || ''}
            onChange={(e) => handleChange(e.target.value, 'errorGroup')}
          >
            <MenuItem value="group1">Group 1</MenuItem>
            <MenuItem value="group2">Group 2</MenuItem>
            <MenuItem value="group3">Group 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          label="Comments"
          id="outlined-comments"
          placeholder="Enter comments"
          size="normal"
          value={data.comments || ''}
          onChange={(e) => handleChange(e.target.value, 'comments')}
        />
      </div>
    </Box>
  );
};

export default PlayErrorNodeEditor;
