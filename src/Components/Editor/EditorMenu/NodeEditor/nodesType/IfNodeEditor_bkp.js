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
  Autocomplete
} from "@mui/material";
import InfoTooltipAdornment from "../../../../../utils/InfoTooltipAdornment";
import { AppContext } from "../../../../../Context/AppContext";
import { addEdge } from "reactflow";

const IfNodeEditor = ({ data, handleChange, addNode, handleChangeAwait }) => {
  console.log("data=>", data);
  const {
    reactFlowInstance,
    setIsUpdated,
    createdNodes,
    setCreatedNodes,
    changeChildIf,
    setChangeChildIf,
  } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [operand, setOperand] = useState(data.operand || "timeFrame");
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const [trueLabelType, setTrueLabelType] = useState(data?.advanceIvrTrueIf ? 'ivrLabel' : "justLabel");
  const [falseLabelType, setFalseLabelType] = useState(data?.advanceIvrFalseIf ? 'ivrLabel' : "justLabel");
  
  const [inputValueTrue, setInputValueTrue] = useState("");
  const [inputValueFalse, setInputValueFalse] = useState("");
  const [optionsTrue, setOptionsTrue] = useState([]);
  const [optionsFalse, setOptionsFalse] = useState([]);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

  useEffect(() => {
    if (reactFlowInstance) {
      const allNodes = reactFlowInstance.getNodes();
      setOptionsTrue(allNodes.map((node) => ({ id: node.id, title: node.data.title })));
    }
  }, [reactFlowInstance]);
  useEffect(() => {
    if (reactFlowInstance) {
      const allNodes = reactFlowInstance.getNodes();
      setOptionsFalse(allNodes.map((node) => ({ id: node.id, title: node.data.title })));
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    if (trueLabelType == 'ivrLabel') {
      trueDeleteLabelValue();
    }
  }, [trueLabelType]);

  useEffect(() => {
    if (falseLabelType == 'ivrLabel') {
      falseDeleteLabelValue();
    }
  }, [falseLabelType]);

  useEffect(() => {
    if (changeChildIf.parentId == data.currentId) {
      if (changeChildIf.conditionType == 'advanceIvrTrueIf') {
        handleChange({
          target: { name: changeChildIf.conditionType, value: null },
        });
        setChangeChildIf({});
        setTrueLabelType('justLabel');
      } else {
        handleChange({
          target: { name: changeChildIf.conditionType, value: null },
        });
        setChangeChildIf({});
        setFalseLabelType('justLabel');
      }
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
        value: event.target.checked ? "on" : "off",
      },
    };

    handleChange(modifiedEvent);
  };

  // const handleSelectChange = (event) => {
  //   const { value, name } = event.target;
  //   handleChange(event);

  //   if (!reactFlowInstance || !reactFlowWrapper.current) {
  //     console.log("Flow instance or wrapper not available.");
  //     return;
  //   }

  //   const currentNode = reactFlowInstance?.getNode(data.currentId);
  //   console.log("currentNode", currentNode);

  //   const createOrUpdateNode = (
  //     nodeType,
  //     direction,
  //     sourceHandle,
  //     value,
  //     nodeId
  //   ) => {
  //     if (!createdNodes[nodeId]) {
  //       const position = {
  //         x:
  //           currentNode.position.x +
  //           (direction === "right"
  //             ? currentNode.width * 1.5
  //             : -currentNode.width * 1.5),
  //         y: currentNode.position.y,
  //       };

  //       const newNode = {
  //         // id: uniqueId(7),
  //         id: `${nodeId}`,
  //         type: "custom",
  //         position,
  //         data: {
  //           title: `${nodeType} Go To ${value}`,
  //           nodeType: `ifIvr-${nodeType}`,
  //           Icon: "RiExternalLinkLine",
  //           color: "#ff8333",
  //         },
  //       };

  //       setIsUpdated(true);
  //       addNode(newNode);
  //       setCreatedNodes((prevNodes) => ({
  //         ...prevNodes,
  //         [nodeId]: newNode,
  //       }));

  //       const newEdge = {
  //         id: `edge-${currentNode.id}-${newNode.id}`,
  //         source: currentNode.id,
  //         sourceHandle: sourceHandle,
  //         target: newNode.id,
  //         type: "smoothstep",
  //         animated: true,
  //         style: { stroke: "#ff8333" },
  //         label: nodeType,
  //         labelStyle: { fill: "black", fontWeight: 600, fontSize: 13 },
  //         labelBgStyle: { fill: "white" },
  //         labelBgPadding: [8, 4],
  //         labelBgBorderRadius: 4,
  //       };

  //       reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));
  //       console.log(
  //         `New ${nodeType.toLowerCase()} node and edge added:`,
  //         newNode,
  //         newEdge
  //       );
  //     } else {
  //       reactFlowInstance.setNodes((nds) =>
  //         nds.map((node) => {
  //           if (node.id === createdNodes[nodeId].id) {
  //             return {
  //               ...node,
  //               data: {
  //                 ...node.data,
  //                 title: `${nodeType} Go To ${value}`,
  //               },
  //             };
  //           }
  //           return node;
  //         })
  //       );
  //       setCreatedNodes((prevNodes) => ({
  //         ...prevNodes,
  //         [nodeId]: {
  //           ...prevNodes[nodeId],
  //           data: {
  //             ...prevNodes[nodeId].data,
  //             title: `${nodeType} Go To ${value}`,
  //           },
  //         },
  //       }));
  //       setUpdateNewNode(!updateNewNode);
  //       setIsUpdated(true);
  //     }
  //   };
  //   const trueNodeId = `${data.currentId}-advanceIvrTrueIf`;
  //   const falseNodeId = `${data.currentId}-advanceIvrFalseIf`;

  //   if (name === "trueIf" && value) {
  //     createOrUpdateNode(
  //       "True",
  //       "right",
  //       "if-true-source-right",
  //       value,
  //       trueNodeId
  //     );
  //   }

  //   if (name === "falseIf" && value) {
  //     createOrUpdateNode(
  //       "False",
  //       "left",
  //       "if-false-source-left",
  //       value,
  //       falseNodeId
  //     );
  //   }
  // };

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    handleChange(event);
    if (name == 'advanceIvrTrueIf') {

      if (!value) {
        setTrueLabelType('justLabel');
        const goToNodeId = `${data.currentId}-advanceIvrTrueIf`;
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
        setTrueLabelType('ivrLabel');

        if (!reactFlowInstance || !reactFlowWrapper.current) {
          console.log("Flow instance or wrapper not available.");
          return;
        }

        const currentNode = reactFlowInstance?.getNode(data.currentId);
        // console.log("currentNode", currentNode);

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
              label: nodeType,
              labelStyle: { fill: "black", fontWeight: 600, fontSize: 13 },
              labelBgStyle: { fill: "white" },
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 4,
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
            setIsUpdated(true);
          }
        };

        const trueNodeId = `${data.currentId}-advanceIvrTrueIf`;

        createOrUpdateNode(
          "True",
          "right",
          "if-true-source-right",
          value,
          trueNodeId
        );
      }

    } else if (name == 'advanceIvrFalseIf') {

      if (!value) {
        setFalseLabelType('justLabel');
        const goToNodeId = `${data.currentId}-advanceIvrFalseIf`;
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
        setFalseLabelType('ivrLabel');

        if (!reactFlowInstance || !reactFlowWrapper.current) {
          console.log("Flow instance or wrapper not available.");
          return;
        }

        const currentNode = reactFlowInstance?.getNode(data.currentId);
        // console.log("currentNode", currentNode);

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
              label: nodeType,
              labelStyle: { fill: "black", fontWeight: 600, fontSize: 13 },
              labelBgStyle: { fill: "white" },
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 4,
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
            setIsUpdated(true);
          }
        };

        const falseNodeId = `${data.currentId}-advanceIvrFalseIf`;

        createOrUpdateNode(
          "False",
          "left",
          "if-false-source-left",
          value,
          falseNodeId
        );
      }
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

  const trueDeleteLabelValue = async () => {
    const currentNodeId = data.currentId;
    const truePreviousNodeId = data?.trueLabelValueId;
    if (truePreviousNodeId) {
      await reactFlowInstance.setEdges((edges) =>
        edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${truePreviousNodeId}`)
      );
      await handleChangeAwait({
        trueLabelValue: null,
        trueLabelValueId: null,
      });
    }
  };

  const falseDeleteLabelValue = async () => {
    const currentNodeId = data.currentId;
    const falsePreviousNodeId = data?.falseLabelValueId;
    if (falsePreviousNodeId) {
      await reactFlowInstance.setEdges((edges) =>
        edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${falsePreviousNodeId}`)
      );
      await handleChangeAwait({
        falseLabelValue: null,
        falseLabelValueId: null,
      });
    }
  };

  const handleAutocompleteChange = async (event, selectedNode) => {
    const { name } = event.target;
    if (name == 'trueAutoComplete') {
      const currentNodeId = data.currentId;
      const truePreviousNodeId = data?.trueLabelValueId;
      const newSelectedNodeId = selectedNode?.id;

      if (selectedNode) {
        if (truePreviousNodeId) {
          console.log('previousNodeId', truePreviousNodeId)
          await reactFlowInstance.setEdges((edges) =>
            edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${truePreviousNodeId}`)
          );
        }
        await handleChangeAwait({
          trueLabelValue: selectedNode.title,
          trueLabelValueId: newSelectedNodeId,
        });

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
        await handleChangeAwait({
          trueLabelValue: null,
          trueLabelValueId: null,
          trueAdvanceIvrLabel: null
        });

        reactFlowInstance.setEdges((edges) =>
          edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${truePreviousNodeId}`)
        );
      }
    } else {

      const currentNodeId = data.currentId;
      const falsePreviousNodeId = data?.falseLabelValueId;
      const newSelectedNodeId = selectedNode?.id;

      if (selectedNode) {
        if (falsePreviousNodeId) {
          console.log('previousNodeId', falsePreviousNodeId)
          await reactFlowInstance.setEdges((edges) =>
            edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${falsePreviousNodeId}`)
          );
        }
        await handleChangeAwait({
          falseLabelValue: selectedNode.title,
          falseLabelValueId: newSelectedNodeId,
        });

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
        await handleChangeAwait({
          falseLabelValue: null,
          falseLabelValueId: null,
          falseAdvanceIvrLabel: null
        });

        reactFlowInstance.setEdges((edges) =>
          edges.filter((edge) => edge.id !== `edge-${currentNodeId}-${falsePreviousNodeId}`)
        );
      }

    }
  };

  useEffect(() => {
    if (data?.trueAdvanceIvrLabel) {
      const goToNodeId = `${data.currentId}-advanceIvrTrueIf`;
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === goToNodeId) {
            // console.log('newNode', node)
            return {
              ...node,
              data: {
                ...node.data,
                label: data.trueAdvanceIvrLabel,
              },
            };
          }
          return node;
        })
      );
      setIsUpdated(true);
    }
    if (data?.falseAdvanceIvrLabel) {
      const goToNodeId = `${data.currentId}-advanceIvrFalseIf`;
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === goToNodeId) {
            // console.log('newNode', node)
            return {
              ...node,
              data: {
                ...node.data,
                label: data.falseAdvanceIvrLabel,
              },
            };
          }
          return node;
        })
      );
      setIsUpdated(true);
    }
  }, [data?.falseAdvanceIvrLabel, data?.trueAdvanceIvrLabel, reactFlowInstance]);

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
            name="varName"
            label="VarName"
            variant="outlined"
            onChange={handleChange}
            value={data.varName || ""}
            InputProps={{
              endAdornment: (
                <InfoTooltipAdornment tooltipText="This is the varName Component" />
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

        {/* {operand === "pattern" && ( */}
        {operand !== "list" && operand !== "timeFrame" && (
          <TextField
            className="inputText"
            id="secondValueIf"
            name="value"
            label="Value"
            variant="outlined"
            onChange={handleChange}
            value={data.value || ""}
            InputProps={{
              endAdornment: (
                <InfoTooltipAdornment tooltipText="This is the secondValue Component" />
              ),
              sx: { paddingRight: 0 },
            }}
          />
        )}

        <InputLabel sx={{ mb: 1.2 }}>When True</InputLabel>

        <FormControl fullWidth>
          <InputLabel id="true-go-to-label">True Go To IVR</InputLabel>
          <Select
            labelId="true-go-to-label"
            id="advanceIvrTrueIf"
            name="advanceIvrTrueIf"
            label="True Go To"
            variant="outlined"
            value={data.advanceIvrTrueIf || ""}
            onChange={handleSelectChange}
            endAdornment={
              <InfoTooltipAdornment tooltipText="This is the True Go To" />
            }
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="IVR1">IVR 1</MenuItem>
            <MenuItem value="IVR2">IVR 2</MenuItem>
            <MenuItem value="IVR3">IVR 3</MenuItem>
            <MenuItem value="IVR4">IVR 4</MenuItem>
          </Select>
        </FormControl>

        {trueLabelType == 'ivrLabel' && (
          <TextField
            label="IVR Label"
            name="trueAdvanceIvrLabel"
            value={data.trueAdvanceIvrLabel || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 1.2 }}
          />
        )}

        {trueLabelType == 'justLabel' && (
          <Autocomplete
            id={`labelAutocompleteTrue-${data.currentId}`}
            options={optionsTrue}
            getOptionLabel={(option) => option.title || ""}
            inputValue={inputValueTrue}
            value={
              optionsTrue.find((option) => option.title === data.trueLabelValue) || null
            }
            name='trueAutoComplete'
            onInputChange={(event, value) => setInputValueTrue(value)}
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

        <InputLabel sx={{ mb: 1.2 }}>When False</InputLabel>

        <FormControl fullWidth>
          <InputLabel id="false-go-to-label">False Go To IVR</InputLabel>
          <Select
            labelId="false-go-to-label"
            id="advanceIvrFalseIf"
            name="advanceIvrFalseIf"
            label="False Go To"
            variant="outlined"
            value={data.advanceIvrFalseIf || ""}
            onChange={handleSelectChange}
            endAdornment={
              <InfoTooltipAdornment tooltipText="This is the False Go To" />
            }
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="IVR 5">IVR 5</MenuItem>
            <MenuItem value="IVR 6">IVR 6</MenuItem>
            <MenuItem value="IVR 7">IVR 7</MenuItem>
            <MenuItem value="IVR 8">IVR 8</MenuItem>
          </Select>
        </FormControl>

        {falseLabelType == 'ivrLabel' && (
          <TextField
            label="IVR Label"
            name="falseAdvanceIvrLabel"
            value={data.falseAdvanceIvrLabel || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 1.2 }}
          />
        )}

        {falseLabelType == 'justLabel' && (
          <Autocomplete
            id={`labelAutocompleteFalse-${data.currentId}`}
            options={optionsFalse}
            getOptionLabel={(option) => option.title || ""}
            inputValue={inputValueFalse}
            value={
              optionsFalse.find((option) => option.title === data.falseLabelValue) || null
            }
            name='falseAutoComplete'
            onInputChange={(event, value) => setInputValueFalse(value)}
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
      </Box>
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
    </>
  );
};

export default IfNodeEditor;
