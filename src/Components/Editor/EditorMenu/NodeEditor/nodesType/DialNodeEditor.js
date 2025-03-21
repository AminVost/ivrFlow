import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const DialNodeEditor = ({ data, handleChange }) => {
  console.log("data :>> ", data);
  const [showDetails, setShowDetails] = useState(data?.showInfo || false);

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
        // value: event.target.checked ? "on" : "off"
        value: event.target.checked,
      },
    };

    handleChange(modifiedEvent);
  };
  const [extensionType, setExtensionType] = useState(data?.extensionType || "");

  const handleExtensionTypeChange = (event) => {
    setExtensionType(event.target.value);
    handleChange(event);
  };

  const renderExtensionTypeFields = () => {
    switch (extensionType) {
      case "Dial Out":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="dial-plan-label">Dial Plan</InputLabel>
              <Select
                labelId="dial-plan-label"
                id="dial-plan-select"
                name="dialPlan"
                label="Dial Plan"
                value={data.dialPlan || ""}
                onChange={handleChange}
              >
                <MenuItem value="main">Main Call Plan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.useTransfer || false}
                  onChange={handleChange}
                  name="useTransfer"
                />
              }
              label="Use Transfer"
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
          </>
        );
      case "Direct":
        return (
          <>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <TextField
              label="Dial Options"
              name="dialOptions"
              value={data.dialOptions || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.useTransfer || false}
                  onChange={handleChange}
                  name="useTransfer"
                />
              }
              label="Use Transfer"
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
          </>
        );
      case "Extension":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="extension-label">Extension</InputLabel>
              <Select
                labelId="extension-label"
                id="extension-select"
                name="extension"
                label="Extension"
                value={data.extension || ""}
                onChange={handleChange}
              >
                {[101, 121, 123, 144, 148, 184, 188, 201, 301].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <TextField
              label="Dial Options"
              name="dialOptions"
              value={data.dialOptions || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.useTransfer || false}
                  onChange={handleChange}
                  name="useTransfer"
                />
              }
              label="Use Transfer"
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
          </>
        );
      case "Advance IVR":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="advanceIvr-label">Advance IVR</InputLabel>
              <Select
                labelId="advanceIvr-label"
                id="advanceIvr-select"
                name="advanceIvr"
                label="Advance IVR"
                value={data.advanceIvr || ""}
                onChange={handleChange}
              >
                {["iv1", "iv2", "iv3", "iv4"].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
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
          </>
        );
      case "Queue":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="queue-label">Queue</InputLabel>
              <Select
                labelId="queue-label"
                id="queue-select"
                name="queue"
                label="Queue"
                value={data.queue || ""}
                onChange={handleChange}
              >
                {["queue1", "queue2", "queue3", "queue4"].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Queue Priority"
              name="queuePriority"
              type="number"
              value={data.queuePriority || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
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
          </>
        );
      case "Simple IVR":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="simpleIvr-label">Simple IVR</InputLabel>
              <Select
                labelId="simpleIvr-label"
                id="simpleIvr-select"
                name="simpleIvr"
                label="Simple IVR"
                value={data.simpleIvr || ""}
                onChange={handleChange}
              >
                {["iv1", "iv2", "iv3", "iv4"].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
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
          </>
        );
      case "Agent Login":
        return (
          <>
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
          </>
        );
      case "Agent Logout":
        return (
          <>
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
          </>
        );
      case "Agent Pause":
        return (
          <>
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
          </>
        );
      case "Agent Unpause":
        return (
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
        );
      case "Fax":
        return (
          <>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
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
          </>
        );
      case "Voicemail":
        return (
          <>
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="extension-label">Extension</InputLabel>
              <Select
                labelId="extension-label"
                id="extension-select"
                name="voiceMaileExtension"
                label="Extension"
                value={data.voiceMaileExtension || ""}
                onChange={handleChange}
              >
                {[101, 121, 123, 144, 148, 184, 188, 201, 301].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
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
          </>
        );
      case "Conference":
        return (
          <>
            <TextField
              label="Number"
              name="number"
              type="text"
              value={data.number || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1.2 }}
            />
            <FormControl sx={{ mb: 1.2, width: "100%" }}>
              <InputLabel id="conference-label">Conference</InputLabel>
              <Select
                labelId="conference-label"
                id="conference-select"
                name="conference"
                label="Conference"
                value={data.conference || ""}
                onChange={handleChange}
              >
                {[101, 121, 123, 144, 148, 184, 188, 201, 301].map((ext) => (
                  <MenuItem key={ext} value={ext}>
                    {ext}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
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
          value="dial"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="extension-type-label">Extension Type</InputLabel>
          <Select
            labelId="extension-type-label"
            id="extension-type-select"
            name="extensionType"
            label="Extension Type"
            value={data?.extensionType || ""}
            onChange={handleExtensionTypeChange}
          >
            {[
              "",
              "Dial Out",
              "Direct",
              "Extension",
              "Advance IVR",
              "Simple IVR",
              "Queue",
              "Agent Login",
              "Agent Logout",
              "Agent Pause",
              "Agent Unpause",
              "Fax",
              "Voicemail",
              "Conference",
            ].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderExtensionTypeFields()}
      </Box>
    </>
  );
};

export default DialNodeEditor;
