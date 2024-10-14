import React, { useEffect, useRef, useContext, useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import InfoTooltipAdornment from "../../../../../utils/InfoTooltipAdornment";
import { AppContext } from "../../../../../Context/AppContext";
import uniqueId from "../../../../../utils/uniqueId";
import { Handle, useReactFlow, addEdge } from "reactflow";

const IfNodeEditor = ({ data, handleChange, addNode }) => {
  console.log("data=>", data);
  const { reactFlowInstance, setIsUpdated, createdNodes, setCreatedNodes } =
    useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [operand, setOperand] = useState(data.operand || "timeFrame");
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    const storedNodes = localStorage.getItem("createdNodes");
    if (storedNodes) {
      // console.log("readdddd", JSON.parse(storedNodes));
      setCreatedNodes(JSON.parse(storedNodes));
    }
  }, []);

  useEffect(() => {
    if (createdNodes && Object.keys(createdNodes).length != 0) {
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
        value: event.target.checked ? "on" : "off",
      },
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

    const createOrUpdateNode = (
      nodeType,
      direction,
      sourceHandle,
      value,
      nodeId
    ) => {
      if (!createdNodes[nodeId]) {
        const position = {
          x:
            currentNode.position.x +
            (direction === "right"
              ? currentNode.width * 1.5
              : -currentNode.width * 1.5),
          y: currentNode.position.y,
        };

        const newNode = {
          // id: uniqueId(7),
          id: `${nodeId}`,
          type: "custom",
          position,
          data: {
            title: `${nodeType} Go To ${value}`,
            nodeType: `ifIvr-${nodeType}`,
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
          id: `edge-${currentNode.id}-${newNode.id}`,
          source: currentNode.id,
          sourceHandle: sourceHandle,
          target: newNode.id,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#ff8333" },
          data: { label: nodeType },
        };

        reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
        console.log(
          `New ${nodeType.toLowerCase()} node and edge added:`,
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
                  title: `${nodeType} Go To ${value}`,
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
              title: `${nodeType} Go To ${value}`,
            },
          },
        }));
        setUpdateNewNode(!updateNewNode);
      }
    };

    const trueNodeId = `${data.currentId}-trueIf`;
    const falseNodeId = `${data.currentId}-falseIf`;

    if (name === "trueIf" && value) {
      createOrUpdateNode(
        "True",
        "right",
        "if-true-source-right",
        value,
        trueNodeId
      );
    }

    if (name === "falseIf" && value) {
      createOrUpdateNode(
        "False",
        "left",
        "if-false-source-left",
        value,
        falseNodeId
      );
    }
  };

  useEffect(() => {
    if (operand) {
      handleChange({ target: { name: "operand", value: operand } });
    }
  }, []);

  const handleOperandChange = (event) => {
    const newOperand = event.target.value;
    setOperand(newOperand);

    const cleanedData = { ...data, operand: newOperand };
    if (newOperand !== "timeFrame") {
      delete cleanedData.timeFrame;
    } else {
      delete cleanedData.firstValue;
      delete cleanedData.secoundValue;
      delete cleanedData.list;
    }

    if (newOperand !== "list") {
      delete cleanedData.list;
    } else {
      delete cleanedData.secoundValue;
    }

    if (newOperand === "pattern") {
      delete cleanedData.list;
    }

    handleChange({ target: { name: "data", value: cleanedData } });
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
          className="inputText"
          id="labelIf"
          name="label"
          label="Label"
          variant="outlined"
          onChange={handleChange}
          value={data.label || ""}
          InputProps={{
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the label" />
            ),
            sx: { paddingRight: 0 },
          }}
        />

        <TextField
          className="inputText"
          id="actionIf"
          name="action"
          label="Action"
          variant="outlined"
          onChange={handleChange}
          value="if"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InfoTooltipAdornment tooltipText="This is the action" />
            ),
            sx: { paddingRight: 0 },
          }}
        />

        {operand !== "timeFrame" && (
          <TextField
            className="inputText"
            id="firstValueIf"
            name="firstValue"
            label="Value"
            variant="outlined"
            onChange={handleChange}
            value={data.firstValue || ""}
            InputProps={{
              endAdornment: (
                <InfoTooltipAdornment tooltipText="This is the firstValue Component" />
              ),
              sx: { paddingRight: 0 },
            }}
          />
        )}

        <FormControl fullWidth>
          <InputLabel id="operand-if-label">Operand</InputLabel>
          <Select
            labelId="operand-if-label"
            id="operand-if"
            name="operand"
            label="Operand"
            variant="outlined"
            value={operand}
            onChange={handleOperandChange}
            endAdornment={
              <InfoTooltipAdornment tooltipText="This is the Operand" />
            }
          >
            <MenuItem value="timeFrame">Time Frame</MenuItem>
            <MenuItem value="list">List</MenuItem>
            <MenuItem value="pattern">Pattern</MenuItem>
            <MenuItem value="bigger">&lt;</MenuItem>
            <MenuItem value="lessThanOrEqual">&le;</MenuItem>
            <MenuItem value="greaterThan">&gt;</MenuItem>
            <MenuItem value="greaterThanOrEqual">&ge;</MenuItem>
            <MenuItem value="equal">=</MenuItem>
            <MenuItem value="notEqual">&ne;</MenuItem>
          </Select>
        </FormControl>

        {operand === "timeFrame" && (
          <FormControl fullWidth>
            <InputLabel id="timeFrame-if-label">Time Frame</InputLabel>
            <Select
              labelId="timeFrame-if-label"
              id="timeFrame-if"
              name="timeFrame"
              label="Time Frame"
              variant="outlined"
              value={data.timeFrame || ""}
              onChange={handleChange}
              endAdornment={
                <InfoTooltipAdornment tooltipText="This is the Time Frame" />
              }
            >
              <MenuItem value="timeFrame1">Time Frame1</MenuItem>
              <MenuItem value="timeFrame2">Time Frame2</MenuItem>
              <MenuItem value="timeFrame3">Time Frame3</MenuItem>
              <MenuItem value="timeFrame4">Time Frame4</MenuItem>
            </Select>
          </FormControl>
        )}

        {operand === "list" && (
          <FormControl fullWidth>
            <InputLabel id="list-if-label">List</InputLabel>
            <Select
              labelId="list-if-label"
              id="list-if"
              name="list"
              label="List"
              variant="outlined"
              value={data.list || ""}
              onChange={handleChange}
              endAdornment={
                <InfoTooltipAdornment tooltipText="This is the List" />
              }
            >
              <MenuItem value="list1">List1</MenuItem>
              <MenuItem value="list2">List2</MenuItem>
              <MenuItem value="list3">List3</MenuItem>
              <MenuItem value="list4">List4</MenuItem>
            </Select>
          </FormControl>
        )}

        {operand === "pattern" && (
          <TextField
            className="inputText"
            id="secondValueIf"
            name="secoundValue"
            label="Second Value"
            variant="outlined"
            onChange={handleChange}
            value={data.secoundValue || ""}
            InputProps={{
              endAdornment: (
                <InfoTooltipAdornment tooltipText="This is the secondValue Component" />
              ),
              sx: { paddingRight: 0 },
            }}
          />
        )}

        <FormControl fullWidth>
          <InputLabel id="true-go-to-label">True Go To</InputLabel>
          <Select
            labelId="true-go-to-label"
            id="trueIf"
            name="trueIf"
            label="True Go To"
            variant="outlined"
            value={data.trueIf || ""}
            onChange={handleSelectChange}
            endAdornment={
              <InfoTooltipAdornment tooltipText="This is the True Go To" />
            }
          >
            <MenuItem value="IVR1">IVR 1</MenuItem>
            <MenuItem value="IVR2">IVR 2</MenuItem>
            <MenuItem value="IVR3">IVR 3</MenuItem>
            <MenuItem value="IVR4">IVR 4</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="false-go-to-label">False Go To</InputLabel>
          <Select
            labelId="false-go-to-label"
            id="falseIf"
            name="falseIf"
            label="False Go To"
            variant="outlined"
            value={data.falseIf || ""}
            onChange={handleSelectChange}
            endAdornment={
              <InfoTooltipAdornment tooltipText="This is the False Go To" />
            }
          >
            <MenuItem value="IVR 5">IVR 5</MenuItem>
            <MenuItem value="IVR 6">IVR 6</MenuItem>
            <MenuItem value="IVR 7">IVR 7</MenuItem>
            <MenuItem value="IVR 8">IVR 8</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default IfNodeEditor;
