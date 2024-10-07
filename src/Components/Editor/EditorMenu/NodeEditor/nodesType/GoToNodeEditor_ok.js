import React, { useEffect, useRef, useContext, useState } from "react";
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AppContext } from "../../../../../Context/AppContext";
import uniqueId from "../../../../../utils/uniqueId";
import ReactFlow, {
  addEdge,
} from "reactflow";

const GoToNodeEditor = ({ data, handleChange, addNode }) => {
  const { reactFlowInstance, setIsUpdated } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [createdNode, setCreatedNode] = useState(null); // ذخیره گره‌ای که قبلاً ایجاد شده

  const handleSelectChange = (event) => {
    const { value } = event.target;
    handleChange(event); // به‌روزرسانی مقدار انتخاب‌شده

    if (!reactFlowInstance || !reactFlowWrapper.current) {
      console.log('Flow instance or wrapper not available.');
      return;
    }

    const nodes = reactFlowInstance?.getNodes();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const currentNode = nodes.find((node) => node.id === data.currentId);

    if (!createdNode) {
      // اگر گره جدیدی ایجاد نشده بود، یک گره جدید بساز
      const position = reactFlowInstance.screenToFlowPosition({
        x: currentNode.position.x + 100, // مقدار جابجایی در راستای x
        y: currentNode.position.y, // مقدار جابجایی در راستای y
      });

      const newNode = {
        id: uniqueId(7),
        type: "custom",
        position,
        data: {
          title: `Node for ${value}`, // بر اساس انتخاب دراپ‌داون
          nodeType: "custom",
          Icon: null,
          color: "#33ff83",
        },
      };

      // اضافه کردن گره جدید
      setIsUpdated(true);
      addNode(newNode);
      setCreatedNode(newNode); // گره جدید را در state ذخیره کن

      // ایجاد یک edge جدید بین گره فعلی و گره جدید
      const newEdge = {
        id: `edge-${currentNode.id}-${newNode.id}`,
        source: currentNode.id,
        target: newNode.id,
        type: "smoothstep",
        animated: true,
        style: { stroke: "#33ff83" },
      };

      reactFlowInstance.setEdges((edges) => addEdge(newEdge, edges));

      console.log("New node and edge added:", newNode, newEdge);
    } else {
      // اگر گره قبلاً ایجاد شده بود، فقط عنوان آن را به‌روزرسانی کن
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => {
          if (node.id === createdNode.id) {
            // تغییر مقدار title گره
            return {
              ...node,
              data: {
                ...node.data,
                title: `Node for ${value}`, // به‌روزرسانی عنوان
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
            onChange={handleSelectChange} // به‌روزرسانی تابع onChange
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
