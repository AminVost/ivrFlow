import React, { useEffect } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useReactFlow, addEdge } from "reactflow";
import uniqueId from "./../../../../../utils/uniqueId"; 


const GoToNodeEditor = ({ data, handleChange }) => {
  const { setNodes, setEdges, getNode } = useReactFlow();

  useEffect(() => {
    const currentNodeId = data.id;
    if (currentNodeId) {
      console.log("GoToNodeEditor node added with ID:", currentNodeId); // Debugging log to check when this runs

      const newNodePosition = {
        x: data.position.x + 200,
        y: data.position.y,
      };

      // Create the new node
      const newNode = {
        id: uniqueId(7), 
        type: "custom", 
        position: newNodePosition,
        data: {
          id: uniqueId(7),  // Provide a unique id in data
          title: "Sample Node", 
          nodeType: "sample", 
        },
      };

      console.log("New node to be added:", newNode); 

      // Add the new node to the chart
      setNodes((nodes) => {
        const updatedNodes = nodes.concat(newNode);
        console.log("Updated nodes list:", updatedNodes); 
        return updatedNodes;
      });

      // Create an edge to connect the current node to the new node
      const newEdge = {
        id: uniqueId(7),
        source: currentNodeId,
        target: newNode.id,
        type: "smoothstep", 
      };

      console.log("New edge to be added:", newEdge); 

      // Add the new edge
      setEdges((edges) => {
        const updatedEdges = addEdge(newEdge, edges);
        console.log("Updated edges list:", updatedEdges); 
        return updatedEdges;
      });
    } else {
      console.error("Current node ID is undefined. Cannot add new node.");
    }
  }, [data.id, data.position, setNodes, setEdges]);

  return (
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
        value="Go_to"
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 1.2 }}
      />
      <FormControl sx={{ mb: 1.2, width: "100%" }}>
        <InputLabel id="advanceIvr-label">Advance IVR</InputLabel>
        <Select
          labelId="advanceIvr-label"
          id="advanceIvr-select"
          name="advanceIvr"
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
  );
};

export default GoToNodeEditor;
