import React,{ createContext, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState({ status: false });
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const { width, ref } = useResizeDetector();
  const [nodesUpdated, setNodesUpdated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [activeEditor, setActiveEditor] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [createdNodes, setCreatedNodes] = useState({});
  const [changeChildIf, setChangeChildIf] = useState({});
  const [theme, setTheme] = useState(() => {
    // Check local storage for theme value
    return localStorage.getItem("ivrTheme") || "dark"; // Default to light if no value found
  });
  const excludedNodeTypes = [
    "ifIvr-True",
    "ifIvr-False",
    "switchIvr",
    "gotoIvr",
    "ivrCallFunction"
  ];


  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        showSidebar,
        setShowSidebar,
        width,
        ref,
        reactFlowInstance,
        setReactFlowInstance,
        showDrawer,
        setShowDrawer,
        nodesUpdated,
        setNodesUpdated,
        isUpdated,
        setIsUpdated,
        setActiveEditor,
        activeEditor,
        createdNodes,
        setCreatedNodes,
        changeChildIf,
        setChangeChildIf,
        theme,
        setTheme,
        excludedNodeTypes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
