import React, { memo, useCallback, useContext, useState } from "react";
import "./customNode.css";
import { Handle, useReactFlow } from "reactflow";
import { BiPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import stringReducer from "../../../utils/stringReducer";
import getIcons from "../../../utils/getIcons";
import { AppContext } from "../../../Context/AppContext";

const CustomNode = ({ id }) => {
  const {
    setData,
    setShowSidebar,
    reactFlowInstance,
    setShowDrawer,
    setIsUpdated,
    setActiveEditor,
  } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const { setNodes, getNodes } = useReactFlow();

  const currentNode = getNodes()?.filter((node) => node.id === id);
  const { type, data, selected } = currentNode[0];
  const { title, nodeType, description, Icon, color, ref, label } = data;

  const centerSelectedNode = (elementId, reactFlowInstance) => {
    if (reactFlowInstance) {
      const element = reactFlowInstance?.getNode(elementId);

      if (element) {
        const { position, width, height } = element;

        // Calculate the center coordinates
        const centerX = position.x + width / 2;
        const centerY = position.y + height / 2;

        // Set the center of the graph to the element's position
        reactFlowInstance.setCenter(centerX, centerY, {
          duration: 800,
          zoom: 1,
        });
      }
    }
  };

  const deleteNode = useCallback(() => {
    if (id !== "start") {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setData((prev) => ({ ...prev, status: false }));
    }
  }, []);

  return (
    <>
      <div className="nodeItem">
        {nodeType !== "start" && (
          <Handle className="edge-handle top" type="source" position="top" />
        )}
        {nodeType !== "start" && (
          <div
            className={`toolbar-wrapper ${nodeType === "start" ? "hidden" : ""}`}
            style={{ display: isVisible ? "flex" : "none" }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            {/* <p>{id}</p> */}
            <div>
              <AiOutlineDelete
                onClick={() => {
                  deleteNode();
                  setIsUpdated(true);
                }}
              />
              <BiPencil
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    id,
                    selected,
                    type,
                    data,
                    status: true,
                  }));

                  setActiveEditor(true);
                  setShowSidebar(true);
                  setShowDrawer((state) => !state);
                }}
              />
            </div>
          </div>
        )}

        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className={`custom-node-wrapper ${selected ? "selected" : ""} ${nodeType === "start" ? "startClass" : ""
            }`}
          onClick={() => centerSelectedNode(id, reactFlowInstance)}
        >
          <div
            className={`${nodeType === "start" ? "startNodeIcon" : ""}`}
            style={{ backgroundColor: nodeType == "start" ? "white" : color }}
          >
            {getIcons(Icon)}
          </div>
          <div>
            <p className="nodeLabel">
              {stringReducer(title, 15)} {label ? '(' + stringReducer(label, 16) + ')' : ''}</p>
            <p className="nodeDesc">
              {stringReducer(label, 16)}
              </p>
          </div>
        </div>

        {/* {(nodeType === "default" || nodeType === "input") && (
        <Handle className="edge-handle" type="target" position="bottom" />
        )} */}
        {/* {nodeType === "start" && ( */}
        <Handle className="edge-handle" type="target" position="bottom" />
        {/* // )} */}
      </div>
    </>
  );
};

export default memo(CustomNode);
