import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useResizeDetector } from "react-resize-detector";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState({ status: false });
  const [receivedData, setReceivedData] = useState({ status: false, dropdownOptions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const { width, ref } = useResizeDetector();
  const [nodesUpdated, setNodesUpdated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [activeEditor, setActiveEditor] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [createdNodes, setCreatedNodes] = useState({});
  const [changeChildIf, setChangeChildIf] = useState({});
  const [theme, setTheme] = useState(() => localStorage.getItem("ivrTheme") || "dark");
  const excludedNodeTypes = ["ifIvr-True", "ifIvr-False", "switchIvr", "gotoIvr", "ivrCallFunction"];

  const fetchOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost/testapi/api.php", { someParam: "value" });
      if (response.status === 200 && response.data) {
        setReceivedData((prevData) => ({
          ...prevData,
          dropdownOptions: response.data.data || [],
          status: true,
        }));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching dropdown options:", err.message);
      setError("Failed to load options.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    console.log("Updated receivedData:", receivedData);
  }, [receivedData]);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        receivedData,
        setReceivedData,
        loading,
        setLoading,
        error,
        setError,
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
        excludedNodeTypes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
