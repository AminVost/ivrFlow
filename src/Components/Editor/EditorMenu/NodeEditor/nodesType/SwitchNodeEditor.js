import React from "react";
import { TextField } from "@mui/material";

const SwitchNodeEditor = ({ data, handleChange }) => {
  return (
    <>
      <TextField
        className="description"
        name="description"
        placeholder="Description"
        multiline
        rows={2}
        value={data.description}
        onChange={handleChange}
      />
      <TextField
        className="interval"
        name="interval"
        placeholder="Interval (in minutes)"
        value={data.interval}
        onChange={handleChange}
      />
    </>
  );
};

export default SwitchNodeEditor;
