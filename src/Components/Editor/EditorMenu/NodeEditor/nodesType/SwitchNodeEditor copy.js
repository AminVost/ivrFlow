import React, { useState, useEffect, useContext, useRef } from "react";
import './css/SwitchNodeEditor.css';
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import { AppContext } from "../../../../../Context/AppContext";
import { Handle, useReactFlow, addEdge } from "reactflow";

const SwitchNodeEditor = ({ data, handleChange, addNode }) => {
  console.log("data=>", data);
  // const { setNodes, getNodes,getNode ,setEdges } = useReactFlow();
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes, setData } =
    useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const [cases, setCases] = useState(data.cases || [{ id: 1, operand: '', timeFrame: '', ivrFlow: '' }]);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    if (createdNodes && Object.keys(createdNodes).length !== 0) {
      localStorage.setItem("createdNodes", JSON.stringify(createdNodes));
    }
  }, [createdNodes, updateNewNode]);

  const handleSelectChange = (index, value) => {
    // const { value, name } = event.target;

    if (!reactFlowInstance || !reactFlowWrapper.current) {
      console.log("Flow instance or wrapper not available.");
      return;
    }

    const currentNode = reactFlowInstance?.getNode(data.currentId);
    console.log("currentNode", currentNode);

    const createOrUpdateNode = (
      index,
      value,
      nodeId
    ) => {
      if (!createdNodes[nodeId]) {
        const position = {
          // x: currentNode.position.x + currentNode.width * 1.5 ,
          x: currentNode.position.x + (index % 2 === 0
            ? + currentNode.width * 1.5
            : - currentNode.width * 1.5),
          y: currentNode.position.y,
        };

        const newNode = {
          id: `${nodeId}`,
          type: "custom",
          position,
          data: {
            title: `Go To IVR ${value}`,
            nodeType: `switchIvr`,
            Icon: "RiExternalLinkLine",
            color: "#3383ff",
          },
        };

        console.log("Creating new node:", newNode);

        setIsUpdated(true);
        addNode(newNode);
        setCreatedNodes((prevNodes) => ({
          ...prevNodes,
          [nodeId]: newNode,
        }));

        const newEdge = {
          id: `edge-${currentNode.id}-${newNode.id}`,
          source: currentNode.id,
          sourceHandle: index % 2 === 0 ? 'switch-source-right' : 'switch-source-left',
          target: newNode.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#3383ff" },
        };

        console.log("Creating new edge:", newEdge);

        reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
        console.log(
          `New node and edge added:`,
          newNode,
          newEdge
        );
      } else {
        // reactFlowInstance.setNodes((nds) => 
        //   nds.map((node) => {
        //     if (node.id === createdNodes[nodeId].id) {
        //       return {
        //         ...node,
        //         data: {
        //           ...node.data,
        //           title: `Go To IVR ${value}`,
        //         },
        //       };
        //     }
        //     return node;
        //   })
        // );
        reactFlowInstance.setNodes((nds) => {
          console.log("Nodes before update:", nds);
          return nds.map((node) => {
            if (node.id === createdNodes[nodeId].id) {
              console.log(`Updating node ${node.id} with new title: Go To IVR ${value}`);
              return {
                ...node,
                data: {
                  ...node.data,
                  title: `Go To IVR ${value}`,
                },
              };
            }
            return node;
          });
        });
        setCreatedNodes((prevNodes) => ({
          ...prevNodes,
          [nodeId]: {
            ...prevNodes[nodeId],
            data: {
              ...prevNodes[nodeId].data,
              title: `Go To IVR ${value}`,
            },
          },
        }));
        setUpdateNewNode(!updateNewNode);
        setIsUpdated(true);
      }
    };

    const switchNodeId = `${data.currentId}-${index}`;

    createOrUpdateNode(
      index,
      value,
      switchNodeId
    );

  };

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

  useEffect(() => {
    handleChange({ target: { name: 'cases', value: cases } });
    console.log('cases useEffect');
  }, [cases]);

  const handleAddCase = () => {
    setCases([...cases, { id: cases.length + 1, operand: '', value: '' }]);
  };

  const handleRemoveCase = (index) => {
    // return;
    setCases(cases.filter((_, i) => i !== index));
    console.log('casess', cases);
    console.log('data after remove', data)
    let nodeIdToDelete = data.currentId + '-' + index;
    console.log('Removing node with id:', nodeIdToDelete);
    let nodeToDelete = reactFlowInstance.getNode(nodeIdToDelete);

    if (nodeToDelete != undefined && nodeToDelete.hasOwnProperty('id')) {
      console.log('Node found for deletion:', nodeToDelete);
      reactFlowInstance.setNodes((nodes) => nodes.filter((node) => node.id !== nodeToDelete.id));
      console.log('Nodes after deletion:', updatedNodes);
      reactFlowInstance.setEdges((edges) =>
        edges.filter(
          (edge) => edge.id !== `edge-${data.currentId}-${nodeToDelete.id}`
        )
      );
      const updatedNodes = { ...createdNodes };
      const nodeKey = Object.keys(updatedNodes).find((key) => key == nodeToDelete.id);

      if (nodeKey) {
        delete updatedNodes[nodeKey];
        console.log('Updated Nodes:', updatedNodes);
        localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
        setCreatedNodes(updatedNodes);
      }
      setData((prev) => ({ ...prev, status: false }));
    }
  };

  const handleCaseChange = (index, field, value) => {
    console.log(`Changing case at index ${index}, field ${field}, to value: ${value}`);
    const updatedCases = cases.map((caseItem, i) =>
      i === index ? { ...caseItem, [field]: value } : caseItem
    );
    if (field == 'ivrFlow') {
      handleSelectChange(index, value)
    }
    setCases(updatedCases);
  };

  const renderCaseElements = (caseItem, index) => {
    console.log('caseItem', caseItem);
    switch (caseItem.operand) {
      case 'Time Frame':
        return (
          <>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                name='timeFrame'
                value={caseItem?.timeFrame}
                onChange={(e) => handleCaseChange(index, 'timeFrame', e.target.value)}
              >
                <MenuItem value="Time Frame 1">Time Frame 1</MenuItem>
                <MenuItem value="Time Frame 2">Time Frame 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel id={'switchIvrLabel-' + index}>IvrFlow</InputLabel>
              <Select
                labelId={'switchIvrLabel-' + index}
                id={'switchIvr-' + index}
                name={'switchIvr-' + index}
                label='ivrItem'
                variant="outlined"
                value={caseItem?.ivrFlow || ''}
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              // onChange={(e) => handleSelectChange(index, e)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem?.textbox || ''}
              onChange={(e) => handleCaseChange(index, 'textbox', e.target.value)}
              fullWidth
            />
          </>
        );
      case 'List':
        return (
          <>
            <TextField
              placeholder="Operator 1"
              name='operator1'
              value={caseItem?.operator1 || ''}
              onChange={(e) => handleCaseChange(index, 'operator1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>List</InputLabel>
              <Select
                name='list'
                value={caseItem?.list}
                onChange={(e) => handleCaseChange(index, 'list', e.target.value)}
              >
                <MenuItem value="list 1">List 1</MenuItem>
                <MenuItem value="list 2">List 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>IvrFlow</InputLabel>
              <Select
                labelId={'switchIvrLabel-' + index}
                id={'switchIvr-' + index}
                name={'switchIvr-' + index}
                label='ivrItem'
                variant="outlined"
                value={caseItem?.ivrFlow || ''}
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              // onChange={(e) => handleSelectChange(index, e)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem?.textbox || ''}
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
              placeholder="Operator 1"
              name='operator1'
              value={caseItem?.operator1 || ''}
              onChange={(e) => handleCaseChange(index, 'operator1', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <TextField
              placeholder="Operator 2"
              name="operator2"
              value={caseItem?.operator2 || ''}
              onChange={(e) => handleCaseChange(index, 'operator2', e.target.value)}
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel id={'switchIvrLabel-' + index}>IvrFlow</InputLabel>
              <Select
                labelId={'switchIvrLabel-' + index}
                id={'switchIvr-' + index}
                name={'switchIvr-' + index}
                label='ivrItem'
                variant="outlined"
                value={caseItem?.ivrFlow || ''}
                onChange={(e) => handleCaseChange(index, 'ivrFlow', e.target.value)}
              // onChange={(e) => handleSelectChange(index, e)}
              >
                {/* Add IvrFlow options here */}
                <MenuItem value="Flow 1">Flow 1</MenuItem>
                <MenuItem value="Flow 2">Flow 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Textbox"
              value={caseItem?.textbox || ''}
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
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Show Info"
        />
      </Box>
      <Box component="form" noValidate autoComplete="off" ref={reactFlowWrapper}>
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
          value="switch"
          InputProps={{ readOnly: true }}
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
                  name='operand'
                  value={caseItem?.operand || null}
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
              <IconButton onClick={() => handleRemoveCase(index)} sx={removeButtonStyle}>
                <Delete sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button variant="outlined" onClick={handleAddCase} startIcon={<Add sx={{ color: '#1976d2' }} />}>
          Add Case
        </Button>

        <TextField
          label="Comments"
          name="comments"
          multiline
          rows={3}
          value={data.comments || ''}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        />
      </Box>
    </>
  );
};

export default SwitchNodeEditor;

const removeButtonStyle = {
  width: '1.5rem',
  height: '1.5rem',
  border: '1px solid #1976d2',
  padding: '1rem',
  margin: '0 auto',
  marginTop: '.5rem',
  '&:hover': {
    backgroundColor: '#c0392b',
    border: '1px solid white',
    '& svg': {
      color: 'white',
    },
  },
};
