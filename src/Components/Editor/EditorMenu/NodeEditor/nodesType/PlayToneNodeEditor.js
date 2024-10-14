import React, { useState, useEffect } from "react";
import { TextField, Box, Checkbox, FormControlLabel } from "@mui/material";

const PlayToneNodeEditor = ({ data, handleChange }) => {
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
          value={data.label || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Action"
          name="action"
          value="playtone"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Tone"
          name="tone"
          value={data.tone || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Timeout"
          name="timeout"
          type="number"
          value={data.timeout || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <TextField
          label="Comments"
          name="comments"
          multiline
          rows={3}
          value={data.comments || ""}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
      </Box>
    </>
  );
};

export default PlayToneNodeEditor;
