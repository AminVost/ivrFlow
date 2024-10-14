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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
