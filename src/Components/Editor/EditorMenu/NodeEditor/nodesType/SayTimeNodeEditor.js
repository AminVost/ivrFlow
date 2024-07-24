import React from "react";
import { TextField } from "@mui/material";

const SayTimeNodeEditor = ({ data, handleChange }) => {
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
        className="url"
        name="url"
        placeholder="URL"
        value={data.url}
        onChange={handleChange}
      />
    </>
  );
};

export default SayTimeNodeEditor;
