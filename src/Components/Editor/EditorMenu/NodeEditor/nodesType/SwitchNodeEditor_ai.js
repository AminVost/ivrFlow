import React, { useState, useEffect, useContext, useRef } from "react";
import './css/SwitchNodeEditor.css';
import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import { AppContext } from "../../../../../Context/AppContext";
import { Handle, useReactFlow, addEdge } from "reactflow";

const SwitchNodeEditor = ({ data, handleChange ,addNode }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cases, setCases] = useState(data.cases || [{ id: 1, operand: '', value: '', ivrFlow: '' }]);
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    handleChange({ target: { name: 'cases', value: cases } });
  }, [cases]);

  const createOrUpdateNode = (nodeId, ivrFlow, position) => {
    if (!createdNodes[nodeId]) {
      const newNode = {
        id: nodeId,
        type: 'custom',
        position,
        data: {
          title: `IVR ${ivrFlow}`,
          nodeType: `ivr-${ivrFlow}`,
          Icon: "RiExternalLinkLine",
          color: "#ff8333",
        },
      };

      setIsUpdated(true);
      addNode(newNode);
      setCreatedNodes((prevNodes) => ({
        ...prevNodes,
        [nodeId]: newNode,
      }));

      const newEdge = {
        id: `edge-${data.currentId}-${newNode.id}`,
        source: data.currentId,
        sourceHandle: position.x > 0 ? "right" : "left",
        target: newNode.id,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#ff8333" },
        data: { label: ivrFlow },
      };

      reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
    } else {
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === createdNodes[nodeId].id) {
            return {
              ...node,
              data: {
                ...node.data,
                title: `IVR ${ivrFlow}`,
              },
            };
          }
          return node;
        })
      );
      setCreatedNodes((prevNodes) => ({
        ...prevNodes,
        [nodeId]: {
          ...prevNodes[nodeId],
          data: {
            ...prevNodes[nodeId].data,
            title: `IVR ${ivrFlow}`,
          },
        },
      }));
    }
  };

  const handleRemoveNode = (nodeId) => {
    reactFlowInstance.setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    reactFlowInstance.setEdges((edges) => edges.filter((edge) => !edge.id.includes(nodeId)));
    setCreatedNodes((prevNodes) => {
      const updatedNodes = { ...prevNodes };
      delete updatedNodes[nodeId];
      return updatedNodes;
    });
  };

  const handleCaseChange = (index, field, value) => {
    const updatedCases = cases.map((caseItem, i) =>
      i === index ? { ...caseItem, [field]: value } : caseItem
    );
    setCases(updatedCases);

    // Create or update the node when the IvrFlow is selected
    if (field === 'ivrFlow' && value) {
      const currentNode = reactFlowInstance.getNode(data.currentId);

      const position = {
        x: currentNode.position.x + (index % 2 === 0 ? currentNode.width * 1.5 : -currentNode.width * 1.5),
        y: currentNode.position.y + (index * 100), // adjust vertical position based on index
      };
      const nodeId = `${data.currentId}-case-${index}`;
      createOrUpdateNode(nodeId, value, position);
    }
  };

  const handleAddCase = () => {
    setCases([...cases, { id: cases.length + 1, operand: '', value: '', ivrFlow: '' }]);
  };

  const handleRemoveCase = (index) => {
    console.log('handleRemoveCase')
    const nodeId = `${data.currentId}-case-${index}`;
    handleRemoveNode(nodeId); // Remove node when a case is deleted
    setCases(cases.filter((_, i) => i !== index));
  };

  const renderCaseElements = (caseItem, index) => {
    switch (caseItem.operand) {
      case 'Time Frame':
        return (
          <>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                value={caseItem.value}
                label="Time Frame"
                onChange={(e) => handleCaseChange(index, 'value', e.target.value)}
              >
                <MenuItem value="Time Frame 1">Time Frame 1</MenuItem>
                <MenuItem value="Time Frame 2">Time Frame 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>IvrFlow</InputLabel>
              <Select
                value={caseItem.ivrFlow || ''}
                label="IvrFlow"
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      case 'List':
        return (
          <>
            <TextField
              placeholder="Operand 1"
              value={caseItem.operand1 || ''}
              onChange={(e) => handleCaseChange(index, 'operand1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>List</InputLabel>
              <Select
                value={caseItem.list || ''}
                label="List"
                onChange={(e) => handleCaseChange(index, 'list', e.target.value)}
              >
                {/* Add List options here */}
                <MenuItem value="List 1">List 1</MenuItem>
                <MenuItem value="List 2">List 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>IvrFlow</InputLabel>
              <Select
                value={caseItem.ivrFlow || ''}
                label="IvrFlow"
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      case 'Pattern':
      case '>':
      case '<':
      case '=>':
      case '=':
      case '!=':
        return (
          <>
            <TextField
              placeholder="Operand 1"
              value={caseItem.operand1 || ''}
              onChange={(e) => handleCaseChange(index, 'operand1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Operand 2</InputLabel>
              <Select
                value={caseItem.operand2 || ''}
                label="Operand 2"
                onChange={(e) => handleCaseChange(index, 'operand2', e.target.value)}
              >
                {/* Add Operand 2 options here */}
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="IvrFlow"
              value={caseItem.ivrFlow || ''}
              onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <TextField
              placeholder="Textbox"
              value={caseItem.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      default:
        return null;
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
              onChange={(e) => setShowDetails(e.target.checked)}
              color="primary"
            />
          }
          label="Show Info"
        />
      </Box>
      <Box component="form" noValidate autoComplete="off"  ref={reactFlowWrapper}>
        <TextField
          label="Label"
          name="label"
          value={data.label || ''}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 1.2 }}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1.2 }}>
          <h6 className="switchCaseTitle">
            Switch Cases
          </h6>
          {cases.map((caseItem, index) => (
            <Box key={caseItem.id} sx={{ flex: '1 1 auto', minWidth: '300px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', position: 'relative', borderRadius: '4px', padding: 2 }}>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Operand</InputLabel>
                <Select
                  value={caseItem.operand}
                  label="Operand"
                  onChange={(e) => handleCaseChange(index, 'operand', e.target.value)}
                >
                  <MenuItem value="Time Frame">Time Frame</MenuItem>
                  <MenuItem value="List">List</MenuItem>
                  <MenuItem value="Pattern">Pattern</MenuItem>
                  <MenuItem value=">">Greater Than</MenuItem>
                  <MenuItem value="<">Less Than</MenuItem>
                  <MenuItem value="=>">Greater or Equal</MenuItem>
                  <MenuItem value="=">Equal</MenuItem>
                  <MenuItem value="!=">Not Equal</MenuItem>
                </Select>
              </FormControl>
              {renderCaseElements(caseItem, index)}
              <IconButton onClick={() => handleRemoveCase(index)} sx={{ alignSelf: 'flex-end' }}>
                <Delete sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button variant="outlined" onClick={handleAddCase} startIcon={<Add sx={{ color: '#1976d2' }} />}>
          Add Case
        </Button>
      </Box>
    </>
  );
};

export default SwitchNodeEditor;
