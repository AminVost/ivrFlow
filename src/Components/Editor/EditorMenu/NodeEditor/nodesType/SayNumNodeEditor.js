import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import InfoTooltipAdornment from "../../../../../utils/InfoTooltipAdornment";

const SayNumNodeEditor = ({ data, handleChange }) => {
  const [showDetails, setShowDetails] = useState(false);
   console.log('data=>'  ,data)

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
          className="inputText"
          id="labelSayNum"
          name="label"
          label="Label"
          variant="outlined"
          onChange={handleChange}
          value={data.label || ""}
          InputProps={{
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the label" />
            ),
            sx: { paddingRight: 0 },
          }}
        />



        <TextField
          className="inputText"
          id="actionSayNum"
          name="action"
          label="Action"
          variant="outlined"
          onChange={handleChange}
          value="say_num"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the action" />
            ),
            sx: { paddingRight: 0 },
          }}
        />

        <TextField
          className="inputText"
          id="valueSayNum"
          name="value"
          label="Value"
          variant="outlined"
          onChange={handleChange}
          value={data.value || ""}
          InputProps={{
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the Value Component" />
            ),
            sx: { paddingRight: 0 },
          }}
        />

        <TextField
          className="inputText"
          id="stepSayNum"
          name="step"
          label="Step"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={data?.step}
          InputProps={{
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the step" />
            ),
            sx: { paddingRight: 0 },
          }}
        />

        <TextField
          className="inputText"
          id="commentsSayNum"
          multiline
          rows={3}
          name="comments"
          label="Comments"
          variant="outlined"
          onChange={handleChange}
          value={data.comments || ""}
          InputProps={{
            endAdornment: (
              <InfoTooltipAdornment tooltipText="These are the comments" />
            ),
            sx: { paddingRight: 0 },
          }}
        />
      </Box>
    </>
  );
};

export default SayNumNodeEditor;
