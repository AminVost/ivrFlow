import React, { useEffect, useRef, useContext, useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem,Checkbox, FormControlLabel } from "@mui/material";
import { AppContext } from "../../../../../Context/AppContext";
import uniqueId from "../../../../../utils/uniqueId";
import ReactFlow, {
  addEdge,
} from "reactflow";

const GoToNodeEditor = ({ data, handleChange, addNode }) => {
  const { reactFlowInstance, setIsUpdated } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [createdNode, setCreatedNode] = useState(null); 
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

  const handleSelectChange = (event) => {
    const { value } = event.target;
    handleChange(event); 

    console.log('reactFlowInstance' , reactFlowInstance)
    if (!reactFlowInstance || !reactFlowWrapper.current) {
      console.log('Flow instance or wrapper not available.');
      return;
    }

    const nodes = reactFlowInstance?.getNodes();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const currentNode = nodes.find((node) => node.id === data.currentId);

    if (!createdNode) {
      
      const position = reactFlowInstance.screenToFlowPosition({
        x: currentNode.position.x, 
        y: currentNode.position.y, 
      });

      const newNode = {
        id: uniqueId(7),
        type: "custom",
        position,
        data: {
          title: `GoTo ${value} new tab`,
          nodeType: "gotoIvr",
          Icon: "RiExternalLinkLine",
          color: "#33ff83",
        },
      };


      setIsUpdated(true);
      addNode(newNode);
      setCreatedNode(newNode); 


      const newEdge = {
        id: `edge-${currentNode.id}-${newNode.id}`,
        source: currentNode.id,
        sourceHandle: 'source-right',
        target: newNode.id,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#33ff83" },
      };

      reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));

      console.log("New node and edge added:", newNode, newEdge);
    } else {
      
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === createdNode.id) {
        
            return {
              ...node,
              data: {
                ...node.data,
                title: `Node for ${value}`,
              },
            };
          }
          return node;
        })
      );

      console.log(`Node updated with new title: Node for ${value}`);
    }
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
      <Box ref={reactFlowWrapper} component="form" noValidate autoComplete="off">
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
          value="Go_to"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <FormControl sx={{ mb: 1.2, width: '100%' }}>
          <InputLabel id="advanceIvr-label">Advance IVR</InputLabel>
          <Select
            labelId="advanceIvr-label"
            id="advanceIvr-select"
            name="advanceIvr"
            value={data.advanceIvr || ''}
            onChange={handleSelectChange} 
          >
            {['iv1', 'iv2', 'iv3', 'iv4'].map((ext) => (
              <MenuItem key={ext} value={ext}>{ext}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Comments"
          name="comments"
          multiline
          rows={3}
          value={data.comments || ''}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />
      </Box>
    </>
  );
};

export default GoToNodeEditor;
