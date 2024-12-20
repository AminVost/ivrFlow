import React, { useState, useEffect, useContext, useRef } from "react";
import "./css/SwitchNodeEditor.css";
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
  FormControlLabel,
  Autocomplete
} from "@mui/material";
import { Add, Delete, PriorityHigh } from "@mui/icons-material";
import { AppContext } from "../../../../../Context/AppContext";
import { Handle, useReactFlow, addEdge } from "reactflow";

const SwitchNodeEditor = ({ data, handleChange, addNode }) => {
  console.log("data=>", data);
  const {
    reactFlowInstance,
    setIsUpdated,
    createdNodes,
    setCreatedNodes,
    setData,
  } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updateNewNode, setUpdateNewNode] = useState(false);
  const [cases, setCases] = useState(
    data.cases || [{ id: 1, operand: "", timeFrame: "", ivrFlow: "" }]
  );
  const ivrLabels = ["Label 1", "Label 2", "Label 3"];


  console.log("cases=>", cases.length);

  useEffect(() => {
    data.showInfo = showDetails;
  }, [showDetails, data]);

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

  useEffect(() => {
    handleChange({ target: { name: "cases", value: cases } });
  }, [cases]);

  const handleAddCase = () => {
    let lastCaseObj = cases[cases.length - 1];
    console.log("lastCaseIndex", lastCaseObj);
    // return;
    let lastCaseId = lastCaseObj.id;
    setCases([...cases, { id: lastCaseId + 1, operand: "", value: "" }]);
  };
  const doesNodeExist = (nodeId) => {
    if (!reactFlowInstance) {
      console.warn("React Flow instance is not available.");
      return false;
    }
    const allNodes = reactFlowInstance.getNodes();
    return allNodes.some((node) => node.id === nodeId);
  };
  const handleRemoveCase = (caseId, caseItem) => {

    // setCases((cases) => cases.filter((item) => item.id !== caseItem.id));

    setCases((prevCases) => {
      const updatedCases = prevCases.filter((item) => item.id !== caseItem.id);

      setTimeout(() => {
        reactFlowInstance.setEdges((prevEdges) => {
          const filteredEdges = prevEdges.filter(
            (edge) => edge.data?.caseId !== caseItem.id && edge?.source == data.currentId
          );
          console.log('filteredEdges', filteredEdges)

          const updatedEdges = filteredEdges.map((edge) => {
            const caseIndex = updatedCases.findIndex(
              (c) => c.id === edge.data?.caseId
            );
            if (caseIndex !== -1) {
              return {
                ...edge,
                label: `Priority: ` + (caseIndex + 1),
              };
            }
            return edge;
          });
          // console.log('updatedEdges' , updatedEdges)
          return updatedEdges;
        });
      }, 100);

      return updatedCases;
    });

    const currentNode = reactFlowInstance.getNode(data.currentId);
    let nodeIdToDelete = data.currentId + "-" + caseId;
    console.log("handleRemoveCase | Removing node with id:", nodeIdToDelete);
    let nodeToDelete = reactFlowInstance.getNode(nodeIdToDelete);
    console.log('nodeToDelete :>> ', nodeToDelete);
    if (nodeToDelete != undefined && nodeToDelete?.data?.nodeType == "switchIvr") {
      console.log("Node found for deletion:", nodeToDelete);
      reactFlowInstance.setNodes((nodes) =>
        nodes.filter((node) => node.id !== nodeToDelete.id)
      );

      const edgesToRemove = reactFlowInstance.getEdges().filter(
        (edge) => edge.source === currentNode.id && edge.data?.caseId === caseItem.id
      );
      edgesToRemove.forEach((edge) => {
        console.log("Removing edge due to cleared selection:", edge);
        reactFlowInstance.setEdges((edges) => edges.filter((e) => e.id !== edge.id));
      });

      const updatedNodes = { ...createdNodes };
      const nodeKey = Object.keys(updatedNodes).find(
        (key) => key == nodeToDelete.id
      );

      if (nodeKey) {
        delete updatedNodes[nodeKey];
        console.log("Updated Nodes:", updatedNodes);
        localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
        setCreatedNodes(updatedNodes);
      }
    } else {
      const edgesToRemove = reactFlowInstance.getEdges().filter(
        (edge) => edge.source === currentNode.id && edge.data?.caseId === caseItem.id
      );
      edgesToRemove.forEach((edge) => {
        console.log("Removing edge due to cleared selection:", edge);
        reactFlowInstance.setEdges((edges) => edges.filter((e) => e.id !== edge.id));
      });
    }
  };

  const handleCaseChange = (index, field, value, caseElm) => {
    console.log(
      `Changing case at index ${index}, field ${field}, to value: ${value}`
    );
    // console.log('caseElm', caseElm);
    setTimeout(() => {
      const updatedCases = cases.map((caseItem, i) =>
        caseItem.id === caseElm.id ? { ...caseItem, [field]: value } : caseItem
      );
      setCases(updatedCases);
      // console.log('casessss', cases);
    }, 100);
    // if (field == "ivrFlow") {
    //   handleSelectChange(caseElm.id, value);
    // }
    if (field == "ivrLabel") {
      const ivrNodeId = `${data.currentId}-${caseElm.id}`;
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === ivrNodeId) {
            console.log('find Nodeee', node)
            return {
              ...node,
              data: {
                ...node.data,
                label: value,
              },
            };
          }
          return node;
        })
      );
    }
  };


  const renderCaseElements = (caseItem, index) => {
    const nodeTitles = reactFlowInstance
      ? reactFlowInstance.getNodes().map((node) => node.data.title)
      : [];

    const handleSelectIvrFlowChange = (index, value, caseItem) => {
      handleCaseChange(index, "ivrFlow", value, caseItem);

      if (value && value !== null) {

        const currentNode = reactFlowInstance.getNode(data.currentId);
        // Remove edge LABEL


        if (currentNode) {
          const newNodeId = `${data.currentId}-${caseItem.id}`;
          // if (!createdNodes[newNodeId]) {
          if (!doesNodeExist(newNodeId)) {
            const verticalSpacing = currentNode.height + 50;
            const isFirstNodeInSide = index < 2;
            const position = {
              x:
                currentNode.position.x +
                (index % 2 === 0
                  ? +currentNode.width * 1.5
                  : -currentNode.width * 1.5),
              y: isFirstNodeInSide
                ? currentNode.position.y
                : currentNode.position.y + Math.floor(index / 2) * verticalSpacing,
            };
            const newNode = {
              id: newNodeId,
              type: "custom",
              position,
              data: {
                title: `IVR: ${value}`,
                nodeType: "switchIvr",
                Icon: "RiExternalLinkLine",
                color: "#3383ff",
                // indexPriority : index + 1
              },
            };

            console.log("Creating new node:", newNode);
            setIsUpdated(true);
            reactFlowInstance.setNodes((nds) => [...nds, newNode]);
            setCreatedNodes((prevNodes) => ({ ...prevNodes, [newNodeId]: newNode }));

            const newEdge = {
              id: `edge-${currentNode.id}-${newNodeId}`,
              source: currentNode.id,
              data: { caseId: caseItem.id },
              sourceHandle: index % 2 === 0 ? "switch-source-right" : "switch-source-left",
              target: newNodeId,
              type: "smoothstep",
              animated: true,
              style: {
                stroke: "#3383ff",
                strokeWidth: 2
              },
              label: 'Priority: ' + (index + 1),
              labelStyle: { fill: "black", fontWeight: 600, fontSize: 13 },
              labelBgStyle: { fill: "white" },
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 4,
            };

            console.log("Creating new edge:", newEdge);
            reactFlowInstance.setEdges((eds) => addEdge(newEdge, eds));
          } else {
            // Update existing node's title if necessary
            reactFlowInstance.setNodes((nds) =>
              nds.map((node) => {
                if (node.id === newNodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      title: `IVR: ${value}`,
                    },
                  };
                }
                return node;
              })
            );
          }
        }
      } else {
        const nodeIdToRemove = `${data.currentId}-${caseItem.id}`;
        const nodeToRemove = reactFlowInstance.getNode(nodeIdToRemove);
        if (nodeToRemove) {
          console.log("handleSelectIvrFlowChange | Removing node with id:", nodeIdToRemove);
          reactFlowInstance.setNodes((nodes) => nodes.filter((node) => node.id !== nodeIdToRemove));
          reactFlowInstance.setEdges((edges) => edges.filter((edge) => edge.target !== nodeIdToRemove));
          const updatedNodes = { ...createdNodes };
          delete updatedNodes[nodeIdToRemove];
          setCreatedNodes(updatedNodes);
        }
      }
    };

    const handleSelectNodeTitleChange = (index, value, caseItem) => {
      handleCaseChange(index, "nodeLabel", value, caseItem);

      const currentNode = reactFlowInstance.getNode(data.currentId);
      if (value && value !== "") {
        const targetNode = reactFlowInstance.getNodes().find((node) => node.data.title === value);
        if (currentNode && targetNode) {
          // Remove any existing edge connected to this caseItem
          const existingEdges = reactFlowInstance.getEdges().filter(
            (edge) => edge.source === currentNode.id && edge.data?.caseId === caseItem.id
          );
          setTimeout(() => {
            existingEdges.forEach((edge) => {
              console.log("Removing existing edge:", edge);
              reactFlowInstance.setEdges((edges) => edges.filter((e) => e.id !== edge.id));

              let nodeIdToDelete = data.currentId + "-" + caseItem.id;
              let nodeToDelete = reactFlowInstance.getNode(nodeIdToDelete);
              if (nodeToDelete) {

                const updatedNodes = { ...createdNodes };
                const nodeKey = Object.keys(updatedNodes).find(
                  (key) => key == nodeToDelete.id
                );

                if (nodeKey) {
                  delete updatedNodes[nodeKey];
                  console.log("Updated Nodes:", updatedNodes);
                  localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
                  setCreatedNodes(updatedNodes);
                }
              }

            });
          }, 50);

          // Create a new edge to the newly selected node
          const newEdgeId = `edge-${currentNode.id}-${targetNode.id}`;
          const newEdge = {
            id: newEdgeId,
            source: currentNode.id,
            sourceHandle: index % 2 === 0 ? "switch-source-right" : "switch-source-left",
            target: targetNode.id,
            type: "smoothstep",
            animated: true,
            data: { caseId: caseItem.id },
            style: {
              stroke: "#3383ff",
              strokeWidth: 2
            },
            label: 'Priority: ' + (index + 1),
            labelStyle: { fill: "black", fontWeight: 600, fontSize: 13 },
            labelBgStyle: { fill: "white" },
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 4,
          };

          console.log("Creating new edge to selected node:", newEdge);
          reactFlowInstance.setEdges((eds) => addEdge(newEdge, eds));
          setTimeout(() => {
            console.log('getNodes', reactFlowInstance.getEdges())
          }, 200);
        }
      } else if (value === "" || !value) {
        // Remove edge if the selection is cleared
        const edgesToRemove = reactFlowInstance.getEdges().filter(
          (edge) => edge.source === currentNode.id && edge.data?.caseId === caseItem.id
        );
        edgesToRemove.forEach((edge) => {
          console.log("Removing edge due to cleared selection:", edge);
          reactFlowInstance.setEdges((edges) => edges.filter((e) => e.id !== edge.id));
        });
      }
    };

    switch (caseItem.operand) {
      case "Time Frame":
        return (
          <>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                name="timeFrame"
                value={caseItem?.timeFrame}
                label="Time Frame"
                onChange={(e) =>
                  handleCaseChange(index, "timeFrame", e.target.value, caseItem)
                }
              >
                <MenuItem value="Time Frame 1">Time Frame 1</MenuItem>
                <MenuItem value="Time Frame 2">Time Frame 2</MenuItem>
              </Select>
            </FormControl>

            {!caseItem?.nodeLabel && (
              <FormControl fullWidth sx={{ mr: 1 }}>
                <InputLabel id={"switchIvrLabel-" + index}>IvrFlow</InputLabel>
                <Select
                  labelId={"switchIvrLabel-" + index}
                  id={"switchIvr-" + index}
                  name={"switchIvr-" + index}
                  label="ivrItem"
                  variant="outlined"
                  value={caseItem?.ivrFlow || ""}
                  onChange={(e) => handleSelectIvrFlowChange(index, e.target.value, caseItem)}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value="Flow 1">Flow 1</MenuItem>
                  <MenuItem value="Flow 2">Flow 2</MenuItem>
                </Select>
              </FormControl>
            )}

            {caseItem?.ivrFlow && caseItem.ivrFlow !== null ? (
              <Autocomplete
                options={ivrLabels}
                value={caseItem?.ivrLabel || ""}
                // onChange={(event, newValue) =>
                //   handleCaseChange(index, "ivrLabel", newValue, caseItem)
                // }
                onChange={(e, newValue) =>
                  handleCaseChange(index, "ivrLabel", newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select IVR Label" fullWidth />
                )}
              />
            ) : (
              <Autocomplete
                options={nodeTitles}
                value={caseItem?.nodeLabel || ""}
                onChange={(event, newValue) =>
                  handleSelectNodeTitleChange(index, newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Node by Label" fullWidth />
                )}
              />
            )}
          </>
        );
      case "List":
        return (
          <>
            <TextField
              placeholder="Operator 1"
              name="operator1"
              value={caseItem?.operator1 || ""}
              onChange={(e) =>
                handleCaseChange(index, "operator1", e.target.value, caseItem)
              }
              fullWidth
              sx={{ mr: 1 }}
            />
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>List</InputLabel>
              <Select
                name="list"
                value={caseItem?.list}
                label="List"
                onChange={(e) =>
                  handleCaseChange(index, "list", e.target.value, caseItem)
                }
              >
                <MenuItem value="list 1">List 1</MenuItem>
                <MenuItem value="list 2">List 2</MenuItem>
              </Select>
            </FormControl>
            {!caseItem?.nodeLabel && (
              <FormControl fullWidth sx={{ mr: 1 }}>
                <InputLabel>IvrFlow</InputLabel>
                <Select
                  labelId={"switchIvrLabel-" + index}
                  id={"switchIvr-" + index}
                  name={"switchIvr-" + index}
                  label="ivrItem"
                  variant="outlined"
                  value={caseItem?.ivrFlow || ""}
                  onChange={(e) => handleSelectIvrFlowChange(index, e.target.value, caseItem)}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value="Flow 1">Flow 1</MenuItem>
                  <MenuItem value="Flow 2">Flow 2</MenuItem>
                </Select>
              </FormControl>
            )}

            {caseItem?.ivrFlow && caseItem.ivrFlow !== null ? (
              <Autocomplete
                options={ivrLabels}
                value={caseItem?.ivrLabel || ""}
                onChange={(e, newValue) =>
                  handleCaseChange(index, "ivrLabel", newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select IVR Label" fullWidth />
                )}
              />
            ) : (
              <Autocomplete
                options={nodeTitles}
                value={caseItem?.nodeLabel || ""}
                onChange={(event, newValue) =>
                  handleSelectNodeTitleChange(index, newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Node by Label" fullWidth />
                )}
              />
            )}
          </>
        );
      case "Pattern":
      case ">":
      case "<":
      case "=>":
      case "=":
      case "!=":
        return (
          <>
            <TextField
              placeholder="Operator 1"
              name="operator1"
              value={caseItem?.operator1 || ""}
              onChange={(e) =>
                handleCaseChange(index, "operator1", e.target.value, caseItem)
              }
              fullWidth
              sx={{ mr: 1 }}
            />
            <TextField
              placeholder="Operator 2"
              name="operator2"
              value={caseItem?.operator2 || ""}
              onChange={(e) =>
                handleCaseChange(index, "operator2", e.target.value, caseItem)
              }
              fullWidth
              sx={{ mr: 1 }}
            />

            {!caseItem?.nodeLabel && (
              <FormControl fullWidth sx={{ mr: 1 }}>
                <InputLabel>IvrFlow</InputLabel>
                <Select
                  labelId={"switchIvrLabel-" + index}
                  id={"switchIvr-" + index}
                  name={"switchIvr-" + index}
                  label="ivrItem"
                  variant="outlined"
                  value={caseItem?.ivrFlow || ""}
                  onChange={(e) => handleSelectIvrFlowChange(index, e.target.value, caseItem)}
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value="Flow 1">Flow 1</MenuItem>
                  <MenuItem value="Flow 2">Flow 2</MenuItem>
                </Select>
              </FormControl>
            )}

            {caseItem?.ivrFlow && caseItem.ivrFlow !== null ? (
              <Autocomplete
                options={ivrLabels}
                value={caseItem?.ivrLabel || ""}
                onChange={(e, newValue) =>
                  handleCaseChange(index, "ivrLabel", newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select IVR Label" fullWidth />
                )}
              />
            ) : (
              <Autocomplete
                options={nodeTitles}
                value={caseItem?.nodeLabel || ""}
                onChange={(event, newValue) =>
                  handleSelectNodeTitleChange(index, newValue, caseItem)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Node by Label" fullWidth />
                )}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  const handleHoverNode = (caseId) => {
    const nodeId = `${data.currentId}-${caseId}`;
    const element = document.querySelector(`[data-nodeid='${nodeId}']`);
    if (element) {
      console.log("findddd");
      element.classList.add("highlighted-node");
    }
  };

  const handleRemoveHoverNode = (caseId) => {
    const nodeId = `${data.currentId}-${caseId}`;
    const element = document.querySelector(`[data-nodeid='${nodeId}']`);

    if (element) {
      element.classList.remove("highlighted-node");
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
        component="form"
        noValidate
        autoComplete="off"
        ref={reactFlowWrapper}
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
          value="switch"
          InputProps={{ readOnly: true }}
          fullWidth
          sx={{ mb: 1.2 }}
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 1.2 }}>
          <h6 className="switchCaseTitle">Switch Cases</h6>
          {cases.map((caseItem, index) => (
            <Box
              key={caseItem.id}
              sx={{
                flex: "1 1 auto",
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #ccc",
                position: "relative",
                borderRadius: "4px",
                padding: 2,
              }}
              onMouseEnter={() => handleHoverNode(caseItem.id)}
              onMouseLeave={() => handleRemoveHoverNode(caseItem.id)}
            >
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Operand</InputLabel>
                <Select
                  name="operand"
                  value={caseItem?.operand || null}
                  label="Operand"
                  onChange={(e) =>
                    handleCaseChange(index, "operand", e.target.value, caseItem)
                  }
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
              {cases.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveCase(caseItem.id, caseItem)}
                  sx={removeButtonStyle}
                >
                  <Delete sx={{ color: "#1976d2", fontSize: "1.2rem" }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>

        <Button
          variant="outlined"
          onClick={handleAddCase}
          startIcon={<Add sx={{ color: "#1976d2" }} />}
        >
          Add Case
        </Button>

        <TextField
          label="Comments"
          name="comments"
          multiline
          rows={3}
          value={data.comments || ""}
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
  width: "1.5rem",
  height: "1.5rem",
  border: "1px solid #1976d2",
  padding: "1rem",
  margin: "0 auto",
  marginTop: ".5rem",
  "&:hover": {
    backgroundColor: "#c0392b",
    border: "1px solid white",
    "& svg": {
      color: "white",
    },
  },
};
