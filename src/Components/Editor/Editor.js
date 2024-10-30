import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  memo,
} from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
  useReactFlow,
} from "reactflow";
import "./editor.css";
import CustomNode from "./CustomNode/CustomNode";
import CustomEdge from "./CustomEdge/CustomEdge";
import uniqueId from "../../utils/uniqueId";
import ContextMenu from "./ContextMenu/ContextMenu";
import { RiSaveLine } from "react-icons/ri";
import getIcons from "../../utils/getIcons";
import { TbSend } from "react-icons/tb";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import { colors, IconButton } from "@mui/material";
import { PiSidebarSimpleFill } from "react-icons/pi";
import { BiFullscreen } from "react-icons/bi";
import { AppContext } from "../../Context/AppContext";
import MenuDrawer from "../Sidebar/MenuDrawer/MenuDrawer";
import { BsFillCircleFill } from "react-icons/bs";
import Swal from "sweetalert2";

// Define the default start node
const defaultStartNode = {
  id: "start",
  type: "custom", // Ensure 'custom' matches your node type if needed
  position: { x: 250, y: 100 }, // Set initial position
  color: "white",
  data: {
    title: "START",
    nodeType: "start",
    Icon: "RiArrowDownFill", // Example icon, use any appropriate icon
  },
};

const defaultEndNode = {
  id: "end",
  type: "custom", // Ensure 'custom' matches your node type if needed
  position: { x: 250, y: 400 }, // Set initial position, adjust as needed
  color: "red",
  data: {
    title: "END",
    nodeType: "end",
    Icon: "RiArrowUpFill", // Example icon, use any appropriate icon
  },
};

function Editor() {
  const reactFlowWrapper = useRef(null);
  const { getNodes, getEdges } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = useState(null);
  const [isPublish, setVisiblePublish] = useState(false);
  const ref = useRef(null);
  const [initialized, setInitialized] = useState(false);

  const {
    width,
    showSidebar,
    setShowSidebar,
    reactFlowInstance,
    setReactFlowInstance,
    showDrawer,
    setShowDrawer,
    isUpdated,
    setIsUpdated,
    setData,
    setActiveEditor,
    theme,
    setTheme,
  } = useContext(AppContext);

  useEffect(() => {
    console.log("theme:", theme);

    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      document.body.className = newTheme;
      localStorage.setItem("ivrTheme", newTheme);
      return newTheme;
    });
  };


  const onConnect = useCallback(
    (params) => {
      console.log("paramsss", params);
      params.type = "smoothstep";
      const existingEdges = getEdges();
      console.log("existingEdges :>> ", existingEdges);

      const hasSourceHandleConnection = existingEdges.some(
        (edge) =>
          edge.sourceHandle === params.sourceHandle &&
          edge.source === params.source
      );
      const hasTargetHandleConnection = existingEdges.some(
        (edge) =>
          edge.targetHandle === params.targetHandle &&
          edge.target === params.target
      );

      if (!hasSourceHandleConnection && !hasTargetHandleConnection) {
        setEdges((eds) => addEdge(params, eds));
        setIsUpdated(true);
      } else {
        console.log("This node already has a connection from its source.");
      }
    },
    [setEdges, setIsUpdated]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("application/reactflow");
      const { type, title, Icon, color } = JSON.parse(data);
      console.log('type :>> ', type);
      let uniqId = type == 'end' ? 'end' : uniqueId(7);
      if (typeof type === "undefined" || !type) {
        return;
      }
      if (type === 'end' && reactFlowInstance.getNodes().some(node => node.id === 'end')) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You cannot have more than one END node in the flowchart.",
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: "swal-popup",
            title: "swal-error-title",
            icon: "swal-icon",
          },
          background: "#27272a",
        });
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 105,
        y: event.clientY,
      });

      const newNode = {
        id: uniqId,
        type: "custom",
        position,
        data: {
          currentId: uniqId,
          title,
          nodeType: type,
          Icon,
          color,
          // ref,
        },
      };
      setIsUpdated(true);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      const pane = ref.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - (40 - 10),
        left: event.clientX < pane.width - 200 && event.clientX - (384 + 100),
        right:
          event.clientX >= pane.width - 200 &&
          pane.width - event.clientX + (384 - 100),
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY + (40 + 10),
      });
    },
    [menu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [menu]);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ "custom-edge": CustomEdge }), []);
  const nodeColor = (node) => {
    return node.data.color;
  };

  const handleWorkflowData = useCallback(() => {
    const workflowData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          // title: node.data.title,
          // nodeType: node.data.nodeType,
          // description: node.data.description,
          // Icon: node.data.Icon,
          // color: node.data.color,
          ...node.data,
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        sourceHandle: edge.sourceHandle ?? null,
        target: edge.target,
        targetHandle: edge.targetHandle ?? null,
        type: edge.type,
        animated: edge.animated ?? false,
        style: edge.style ?? {},
        label: edge.label ?? null,
        labelStyle: edge.labelStyle ?? {},
        labelBgStyle: edge.labelBgStyle ?? {},
        labelBgPadding: edge.labelBgPadding ?? [],
        labelBgBorderRadius: edge.labelBgBorderRadius ?? null,
        // Add other necessary properties here
      })),
    };
    console.log("workflowData", workflowData);
    localStorage.setItem("workflowData", stringify(workflowData));
  });

  useEffect(() => {
    if (reactFlowInstance && !initialized) {
      const { width, height } =
        reactFlowWrapper.current.getBoundingClientRect();
      const startX = width / 2;
      const startY = height / 2;

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === "start"
            ? { ...node, position: { x: startX, y: startY - 100 } } // Adjust start node position
            : node.id === "end"
              ? { ...node, position: { x: startX, y: startY + 100 } } // Adjust end node position
              : node
        )
      );

      reactFlowInstance.setCenter(startX, startY, { duration: 800, zoom: 1 });
    }
  }, [reactFlowInstance]);

  useEffect(() => {
    try {
      const workflowData = parse(localStorage.getItem("workflowData"));
      if (workflowData?.nodes?.length > 0) {
        const { nodes, edges } = workflowData;
        setNodes(nodes);
        setEdges(edges);
        setInitialized(true);
      } 
      else {
        // Add default start node if no nodes are loaded from localStorage
        setNodes([defaultStartNode]);
        // setNodes([defaultStartNode, defaultEndNode]);
      }
    } catch (error) {
      // Add default start node if an error occurs during loading from localStorage
      setNodes([defaultStartNode]);
      // setNodes([defaultStartNode, defaultEndNode]);
    }
  }, [setNodes, setEdges]);

  return (
    <section className="editor-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onPaneClick}
        onNodeContextMenu={handleContextMenu}
        onEdgeContextMenu={handleContextMenu}
        deleteKeyCode={null}
        minZoom={0.3}
        maxZoom={1.2}
      >
        <Background
          variant="dots"
          className="editor-bg"
          size={theme == "dark" ? 1 : 3}
          color={theme == "dark" ? "#8f8f98" : "#27272a69"}
        />
        {/* <Background variant="dots" className="editor-bg" gap={20} size={2} /> */}
        <LeftPanel
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          width={width}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <RightPanel
          handleWorkflowData={handleWorkflowData}
          isUpdated={isUpdated}
          isPublish={isPublish}
          setData={setData}
          setIsUpdated={setIsUpdated}
          setVisiblePublish={setVisiblePublish}
          setActiveEditor={setActiveEditor}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Controls
          className="controls"
          position="bottom-right"
          fitViewOptions={{ duration: 800 }}
        />
        <MiniMap nodeColor={nodeColor} className="mini-map" />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        {width <= "815" && <MenuDrawer />}
      </ReactFlow>
    </section>
  );
}

export default memo(Editor);

const LeftPanel = memo(
  ({ showSidebar, setShowSidebar, showDrawer, setShowDrawer, width, toggleTheme, theme }) => {
    return (
      <Panel position="top-left">
        <div className="leftPanelContainer">
          <div className="left-panel-button">
            <IconButton
              disableTouchRipple
              onClick={() => {
                setShowSidebar(!showSidebar);
                setShowDrawer(!showDrawer);
              }}
            >
              {width > 815 ? (
                !showSidebar ? (
                  <PiSidebarSimpleFill />
                ) : (
                  <BiFullscreen />
                )
              ) : showSidebar ? (
                <PiSidebarSimpleFill />
              ) : (
                <BiFullscreen />
              )}
            </IconButton>
          </div>
          <div className="left-panel-button toggleTheme">
            <IconButton
              onClick={toggleTheme}
            >
            {theme === "dark" ? getIcons("RiSunFill") : getIcons("TbMoonFilled")}
            </IconButton>
          </div>
        </div>
      </Panel>
    );
  }
);

const RightPanel = memo(
  ({
    handleWorkflowData,
    isUpdated,
    setIsUpdated,
    setData,
    isPublish,
    setVisiblePublish,
    setActiveEditor,
    toggleTheme,
    theme,
  }) => {
    return (
      <Panel position="top-right">
        {isPublish && (
          <div
            className="right-panel-button"
            onClick={() => {
              setVisiblePublish(!isPublish);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Publish was successful",
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: "swal-popup",
                  title: "swal-title",
                  icon: "swal-icon",
                },
                background: "#27272a",
              });
            }}
          >
            <TbSend />
            <p>Publish</p>
          </div>
        )}

        <div
          className="right-panel-button"
          onClick={() => {
            if (isUpdated) {
              handleWorkflowData();
              setVisiblePublish(true);
              setIsUpdated(false);
              setData((prev) => ({ ...prev, status: false }));
              setActiveEditor(false);
            }
          }}
        >
          {isUpdated && <UpdateBadge />}
          <RiSaveLine />
          <p>Save</p>
        </div>

        {/* <div className="right-panel-button toggleTheme" onClick={toggleTheme}>
          {theme === "dark" ? getIcons("RiSunFill") : getIcons("TbMoonFilled")}
        </div> */}
      </Panel>
    );
  }
);

const UpdateBadge = () => {
  return (
    <div
      style={{ position: "absolute", left: "-6px", top: "-6px", zIndex: "10" }}
    >
      <BsFillCircleFill color="cornflowerblue" />
    </div>
  );
};
