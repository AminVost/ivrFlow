import React, { useEffect, useRef, useContext, useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Autocomplete
} from "@mui/material";
import { AppContext } from "../../../../../Context/AppContext";
import ReactFlow, { addEdge } from "reactflow";

const GoToNodeEditor = ({ data, handleChange, addNode }) => {
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes, changeChildIf, setChangeChildIf } =
    useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const [labelType, setLabelType] = useState("justLabel");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  console.log("data=>", data);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    if (reactFlowInstance) {
      const allNodes = reactFlowInstance.getNodes();
      setOptions(allNodes.map((node) => ({ id: node.id, title: node.data.title })));
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    if (changeChildIf.parentId == data.currentId) {
      // console.log('changeChildIffffff')
      handleChange({ target: { name: 'advanceIvr', value: null } })
      setChangeChildIf({});
      setLabelType('justLabel');

    }
  }, [changeChildIf]);

  useEffect(() => {
    if (createdNodes && Object.keys(createdNodes).length !== 0) {
      localStorage.setItem("createdNodes", JSON.stringify(createdNodes));
    }
  }, [createdNodes, updateNewNode]);

  const handleCheckboxChange = (event) => {
    setShowDetails(event.target.checked);

    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        name: event.target.name,
        value: event.target.checked ? "on" : "off",
      },
    };

    handleChange(modifiedEvent);
  };

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    handleChange(event);
    if (name == 'advanceIvr' && !value) {
      // console.log('nullll :>> ');
      setLabelType('justLabel');
      const goToNodeId = `${data.currentId}-goTo`;
      // Remove node and edge
      const nodeExists = reactFlowInstance.getNodes().some((node) => node.id === goToNodeId);

      if (nodeExists) {
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
    } else {
      setLabelType('ivrLabel');

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
              title: `Go To ${value}`,
              // nodeType: `goTo-${nodeId}`,
              nodeType: `gotoIvr`,
              Icon: "RiExternalLinkLine",
              color: "#33ff83",
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
            style: { stroke: "#33ff83" },
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

      const goToNodeId = `${data.currentId}-goTo`;

      if (name === "advanceIvr" && value) {
        createOrUpdateNode("goto-source-right", value, goToNodeId);
      }
    }
  };


  // const handleAutocompleteChange = (event, selectedNode) => {
  //   if (selectedNode) {
  //     handleChange({ target: { name: "labelValue", value: selectedNode.title } });

  //   } else {
  //     handleChange({ target: { name: "labelValue", value: null } });
  //   }
  // };

  const handleAutocompleteChange = (event, selectedNode) => {
    const currentNodeId = data.currentId;
    const previousNodeId = data?.labelValueId;
    const newSelectedNodeId = selectedNode?.id;

    if (selectedNode) {
      handleChange({ target: { name: "labelValue", value: selectedNode.title } });
      handleChange({ target: { name: "labelValueId", value: newSelectedNodeId } });
      
      if (previousNodeId) {
        reactFlowInstance.setEdges((edges) =>
          edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${previousNodeId}`)
        );
      }

      const newEdge = {
        id: `edge-${currentNodeId}-${newSelectedNodeId}`,
        source: currentNodeId,
        target: newSelectedNodeId,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#33ff83" },
      };

      reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
    } else {

      handleChange({ target: { name: "labelValue", value: null } });
      handleChange({ target: { name: "labelValueId", value: null } });

      reactFlowInstance.setEdges((edges) =>
        edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${previousNodeId}`)
      );
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
      <Box
        ref={reactFlowWrapper}
        component="form"
        noValidate
        autoComplete="off"
      >
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
            label="Advance IVR"
            value={data.advanceIvr || ""}
            onChange={handleSelectChange}
          >
            <MenuItem value={null}>None</MenuItem>
            {["iv1", "iv2", "iv3", "iv4"].map((ext) => (
              <MenuItem key={ext} value={ext}>
                {ext}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {labelType == 'ivrLabel' && (
          <TextField
            label="IVR Label"
            name="ivrLabelValue"
            value={data.ivrLabelValue || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 1.2 }}
          />
        )}

        {labelType == 'justLabel' && (
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title || ""}
            inputValue={inputValue}
            value={
              options.find((option) => option.title === data.labelValue) || null
            }
            onInputChange={(event, value) => setInputValue(value)}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Node by Label" variant="outlined" fullWidth sx={{ mb: 1.2 }} />
            )}
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option.title.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
          />
        )}

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
    </>
  );
};

export default GoToNodeEditor;
