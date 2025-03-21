import React, { useState, useEffect, useContext, useRef } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Autocomplete } from "@mui/material";
import { AppContext } from "../../../../../Context/AppContext";
import ReactFlow, { addEdge } from "reactflow";

const CallFunctionNodeEditor = ({ data, handleChange, addNode, handleChangeAwait }) => {
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes, changeChildIf, setChangeChildIf,setData,excludedNodeTypes  } =
    useContext(AppContext);
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const [labelType, setLabelType] = useState(data?.advanceIvr ? 'ivrLabel' : "justLabel");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const reactFlowWrapper = useRef(null);
  const ivrLabels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"];

  console.log("data=>", data);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    if (reactFlowInstance) {
      const allNodes = reactFlowInstance.getNodes();
      setOptions(
        allNodes
          .filter((node) => node.data?.label && !excludedNodeTypes.includes(node.data.nodeType))
          .map((node) => ({
            id: node.id,
            label: node.data.label,
          }))
      );
    }
  }, [reactFlowInstance]);
  

  useEffect(() => {
    if (labelType == 'ivrLabel') {
      deleteLabelValue();
    }
  }, [labelType]);

  useEffect(() => {
    if (changeChildIf.parentId == data.currentId) {
      // handleChange({ target: { name: 'advanceIvr', value: null } })
      handleChange2({ target: { name: 'advanceIvr', value: null } });
      setTimeout(() => {
        reactFlowInstance.setNodes((nodes) => nodes.filter((node) => node.id !== changeChildIf.id));
      }, 200);
      setChangeChildIf({});
      setLabelType('justLabel');
    }
  }, [changeChildIf]);

  const handleChange2 = (e) => {
    const { name: key, value } = e.target;
    const updatedData = { ...data, [key]: value };
    setData((prevData) => ({ ...prevData, data: updatedData }));
    setTimeout(() => {
      reactFlowInstance.setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === data.currentId) {
            const updatedData = { ...node.data, [key]: value };
            return { ...node, data: updatedData };
          }
          return node;
        })
      );
    }, 50);
  };

  useEffect(() => {
    if (createdNodes && Object.keys(createdNodes).length !== 0) {
      localStorage.setItem("createdNodes", JSON.stringify(createdNodes));
      // console.log("setttt", createdNodes);
    }
  }, [createdNodes, updateNewNode]);

  const doesNodeExist = (nodeId) => {
    if (!reactFlowInstance) {
      console.warn("React Flow instance is not available.");
      return false;
    }
    const allNodes = reactFlowInstance.getNodes();
    return allNodes.some((node) => node.id === nodeId);
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

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    handleChange(event);
    if (name == 'advanceIvr' && !value) {
      setLabelType('justLabel');
      const goToNodeId = `${data.currentId}-callFunction`;
      const nodeExists = reactFlowInstance.getNodes().some((node) => node.id === goToNodeId);

      if (nodeExists) {
        reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== goToNodeId));
        reactFlowInstance.setEdges((eds) => eds.filter((edge) => !edge.id.includes(goToNodeId)));
        const updatedNodes = { ...createdNodes };
        const nodeKey = Object.keys(updatedNodes).find((key) => key.includes(goToNodeId));

        if (nodeKey) {
          delete updatedNodes[nodeKey];
          // console.log("Updated Nodes:", updatedNodes);
          localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
          setCreatedNodes(updatedNodes);
        }
        // console.log('createdNodes', createdNodes);
        setIsUpdated(true);
      }
    } else {
      setLabelType('ivrLabel');

      if (!reactFlowInstance || !reactFlowWrapper.current) {
        console.log("Flow instance or wrapper not available.");
        return;
      }

      const currentNode = reactFlowInstance?.getNode(data.currentId);
      // console.log("currentNode", currentNode);

      const createOrUpdateNode = (sourceHandle, value, nodeId) => {
        // if (!createdNodes[nodeId]) {
        if (!doesNodeExist(nodeId)) {
          const position = {
            x: currentNode.position.x - currentNode.width * 1.5,
            y: currentNode.position.y,
          };

          const newNode = {
            id: `${nodeId}`,
            type: "custom",
            position,
            data: {
              title: `Go To ${value}`,
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
            style: { stroke: "#ff3333",
              strokeWidth: 2 },
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
                    title: `Go To ${value}`,
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
                title: `Go To ${value}`,
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
    }
  };

  const deleteLabelValue = async () => {
    const currentNodeId = data.currentId;
    const previousNodeId = data?.labelValueId;
    if (previousNodeId) {
      await reactFlowInstance.setEdges((edges) =>
        edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${previousNodeId}`)
      );
      await handleChangeAwait({
        labelValue: null,
        labelValueId: null,
      });
    }
  };

  const handleAutocompleteChange = async (event, selectedNode) => {
    const currentNodeId = data.currentId;
    const previousNodeId = data?.labelValueId;
    const newSelectedNodeId = selectedNode?.id;

    if (selectedNode) {
      if (previousNodeId) {
        console.log('previousNodeId', previousNodeId)
        await reactFlowInstance.setEdges((edges) =>
          edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${previousNodeId}`)
        );
      }
      await handleChangeAwait({
        labelValue: selectedNode.label,
        labelValueId: newSelectedNodeId,
      });

      const newEdge = {
        id: `edge-${currentNodeId}-${newSelectedNodeId}`,
        source: currentNodeId,
        target: newSelectedNodeId,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#ff3333",
          strokeWidth: 2 },
      };

      reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
    } else {
      await handleChangeAwait({
        labelValue: null,
        labelValueId: null,
        advanceIvrLabel: null
      });

      reactFlowInstance.setEdges((edges) =>
        edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${previousNodeId}`)
      );
    }
  };

  useEffect(() => {
    if (data?.advanceIvrLabel || data?.advanceIvrLabel == null) {
      const goToNodeId = `${data.currentId}-callFunction`;
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === goToNodeId) {
            // console.log('newNode', node)
            return {
              ...node,
              data: {
                ...node.data,
                label: data.advanceIvrLabel,
              },
            };
          }
          return node;
        })
      );
      setIsUpdated(true);
    }
  }, [data?.advanceIvrLabel, reactFlowInstance]);

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
            <MenuItem value={null}>None</MenuItem>
            {['iv1', 'iv2', 'iv3', 'iv4'].map((ext) => (
              <MenuItem key={ext} value={ext}>{ext}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {labelType == 'ivrLabel' && (
          // <TextField
          //   label="IVR Label"
          //   name="advanceIvrLabel"
          //   value={data.advanceIvrLabel || ""}
          //   onChange={handleChange}
          //   fullWidth
          //   sx={{ mb: 1.2 }}
          // />
          <Autocomplete
            options={ivrLabels}
            value={data?.advanceIvrLabel || ""}
            onChange={(e, newValue) => handleChange({ target: { name: 'advanceIvrLabel', value: newValue } })}
            renderInput={(params) => (
              <TextField {...params} label="Select IVR Label" fullWidth />
            )}
          />
        )}

        {labelType == 'justLabel' && (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label || ""}
            inputValue={inputValue}
            value={
              options.find((option) => option.label === data.labelValue) || null
            }
            onInputChange={(event, value) => setInputValue(value)}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Node by Label" variant="outlined" fullWidth sx={{ mb: 1.2 }} />
            )}
            filterOptions={(options, { inputValue }) =>
              options.filter(
                (option) =>
                  option.label &&
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            noOptionsText="No label found"
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
