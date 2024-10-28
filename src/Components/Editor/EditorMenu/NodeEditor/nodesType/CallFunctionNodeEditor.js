import React, { useState, useEffect, useContext, useRef } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AppContext } from "../../../../../Context/AppContext";
import ReactFlow, { addEdge } from "reactflow";

const CallFunctionNodeEditor = ({ data, handleChange, addNode }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes, changeChildIf } =
    useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [selectedOption, setSelectedOption] = useState("IVR");
  console.log("data=>", data);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    if (changeChildIf.parentId == data.currentId) {
      handleChange({ target: { name: 'advanceIvr', value: null } })
    }
  }, [changeChildIf]);

  useEffect(() => {
    if (createdNodes && Object.keys(createdNodes).length !== 0) {
      localStorage.setItem("createdNodes", JSON.stringify(createdNodes));
      // console.log("setttt", createdNodes);
    }
  }, [createdNodes, updateNewNode]);

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
    const { value, name } = event.target;
    handleChange(event);

    if (!reactFlowInstance || !reactFlowWrapper.current) {
      console.log("Flow instance or wrapper not available.");
      return;
    }

    const currentNode = reactFlowInstance?.getNode(data.currentId);
    console.log("currentNode", currentNode);

    const createOrUpdateNode = (sourceHandle, value, nodeId) => {
      if (!createdNodes[nodeId]) {
        const position = {
          x: currentNode.position.x - currentNode.width * 1.5,
          y: currentNode.position.y,
        };

        const newNode = {
          // id: uniqueId(7),
          id: `${nodeId}`,
          type: "custom",
          position,
          data: {
            title: `${value}`,
            nodeType: `ivrCallFunction`,
            Icon: "RiExternalLinkLine",
            color: "#ff3333",
          },
        };

        setIsUpdated(true);
        addNode(newNode);
        setCreatedNodes((prevNodes) => ({
          ...prevNodes,
          [nodeId]: newNode,
        }));

        const newEdge = {
          id: `edge-${currentNode.id}-${newNode.id}`,
          source: currentNode.id,
          sourceHandle: sourceHandle,
          target: newNode.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#ff3333" },
        };

        reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
        console.log(
          `New node and edge added:`,
          newNode,
          newEdge
        );
      } else {
        reactFlowInstance.setNodes((nds) =>
          nds.map((node) => {
            if (node.id === createdNodes[nodeId].id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  title: `${value}`,
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
              title: `${value}`,
            },
          },
        }));
        setUpdateNewNode(!updateNewNode);
        setIsUpdated(true);
      }
    };

    const goToNodeId = `${data.currentId}-callFunction`;

    if (name === "advanceIvr" && value) {
      createOrUpdateNode("callFunction-source-right", value, goToNodeId);
    }
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleChange(event);
    if (value == 'IVR') {
      handleChange({ target: { name: 'labelValue', value: null } })
    } else if (value == 'labelValue') {
      handleChange({ target: { name: 'advanceIvr', value: null } });
      const goToNodeId = `${data.currentId}-callFunction`;
      // Remove node and edge
      reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== goToNodeId));
      reactFlowInstance.setEdges((eds) => eds.filter((edge) => !edge.id.includes(goToNodeId)));
      const updatedNodes = { ...createdNodes };
      const nodeKey = Object.keys(updatedNodes).find((key) => key.includes(goToNodeId));

      if (nodeKey) {
        delete updatedNodes[nodeKey];
        console.log("Updated Nodes:", updatedNodes);
        localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
        setCreatedNodes(updatedNodes);
      }

      console.log('createdNodes', createdNodes);

      setIsUpdated(true);
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
          value="call_function"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />
        <RadioGroup
          name="ivrOptions"
          value={selectedOption}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel
            value="IVR"
            control={<Radio sx={{ color: "blue" }} />}
            label="IVR"
          />
          <FormControlLabel
            value="labelValue"
            control={<Radio sx={{ color: "green" }} />}
            label="Label Value"
          />
        </RadioGroup>
        {selectedOption === "IVR" && (
          <FormControl sx={{ mb: 1.2, width: '100%' }}>
            <InputLabel id="advanceIvr-label">Advance IVR</InputLabel>
            <Select
              labelId="advanceIvr-label"
              id="advanceIvr-select"
              name="advanceIvr"
              label="Advance IVR"
              value={data.advanceIvr || ''}
              onChange={handleSelectChange}
            >
              {['iv1', 'iv2', 'iv3', 'iv4'].map((ext) => (
                <MenuItem key={ext} value={ext}>{ext}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedOption === "labelValue" && (
          <TextField
            label="Label Value"
            name="labelValue"
            value={data.labelValue || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 1.2 }}
          />
        )}
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

export default CallFunctionNodeEditor;
