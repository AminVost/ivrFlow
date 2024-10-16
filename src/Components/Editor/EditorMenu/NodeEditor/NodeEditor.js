import React, { memo, useCallback, useContext, useEffect } from "react";
import "./nodeEditor.css";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AppContext } from "../../../../Context/AppContext";
import { useReactFlow } from "reactflow";
import { parse } from "flatted";

import SayNumNodeEditor from "./nodesType/SayNumNodeEditor";
import PlaybackNodeEditor from "./nodesType/PlaybackNodeEditor";
import PlayErrorNodeEditor from "./nodesType/PlayErrorNodeEditor";
import SayDateNodeEditor from "./nodesType/SayDateNodeEditor";
import SayTimeNodeEditor from "./nodesType/SayTimeNodeEditor";
import PlayToneNodeEditor from "./nodesType/PlayToneNodeEditor";
import InputNodeEditor from "./nodesType/InputNodeEditor";
import IfNodeEditor from "./nodesType/IfNodeEditor";
import SwitchNodeEditor from "./nodesType/SwitchNodeEditor";
import DialNodeEditor from "./nodesType/DialNodeEditor";
import SetNodeEditor from "./nodesType/SetNodeEditor";
import GoToNodeEditor from "./nodesType/GoToNodeEditor";
import CallFunctionNodeEditor from "./nodesType/CallFunctionNodeEditor";
import RpcNodeEditor from "./nodesType/RpcNodeEditor";
import SendFaxNodeEditor from "./nodesType/SendFaxNodeEditor";
import RecordNodeEditor from "./nodesType/RecordNodeEditor";
import RecordSaveNodeEditor from "./nodesType/RecordSaveNodeEditor";
import RecordDeleteNodeEditor from "./nodesType/RecordDeleteNodeEditor";
import AsteriskCmdNodeEditor from "./nodesType/AsteriskCmdNodeEditor";
import HangUpNodeEditor from "./nodesType/HangUpNodeEditor";
import ReturnNodeEditor from "./nodesType/ReturnNodeEditor";
import InputVoiceNodeEditor from "./nodesType/InputVoiceNodeEditor";
import GoToTagNodeEditor from "./nodesType/GoToTagNodeEditor";
import SetRecordPlanNodeEditor from "./nodesType/SetRecordPlanNodeEditor";

const NodeEditor = () => {
  const { setNodes, getNodes, getEdges } = useReactFlow();
  const {
    data: currentNode,
    setData,
    width,
    setIsUpdated,
    isUpdated,
    setActiveEditor,
  } = useContext(AppContext);
  const { data } = currentNode;
  const {
    title,
    nodeType,
  } = data;
  // console.log('data=>', data)

  const addNode = (newNode) => {
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const updateEditorNode = (key, value, id) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const updatedData = { ...node.data, [key]: value };
          return { ...node, data: updatedData };
        }
        return node;
      })
    );
  };

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    console.log('key, value =>', key, value);
    const { id, data } = currentNode;
    const updatedData = { ...data, [key]: value };
    setData((prevData) => ({ ...prevData, data: updatedData }));
    updateEditorNode(key, value, id);
  };

  useEffect(() => {
    try {
      const workflowData = parse(localStorage.getItem("workflowData"));
      if (workflowData?.nodes?.length > 0) {
        const { nodes, edges } = workflowData;
        const storedNode = nodes?.filter((node) => node.id === currentNode.id);
        const allNodes = getNodes();
        const allEdges = getEdges();

        if (
          nodes.length !== allNodes.length ||
          edges.length !== allEdges.length ||
          storedNode[0]?.data !== data
        ) {
          setIsUpdated(true);
        } else {
          // setIsUpdated(false);
        }
      }
    } catch (error) {
      // console.log({ error });
    }
  }, [data, isUpdated, setIsUpdated, currentNode.id, getNodes, getEdges]);

  const renderNodeEditor = () => {
    // console.log('nodeType ' , nodeType)
    switch (nodeType) {
      case "Playback":
        return <PlaybackNodeEditor data={data} handleChange={handleChange} />;
      case "sayNum":
        return <SayNumNodeEditor data={data} handleChange={handleChange} />;
      case "playError":
        return <PlayErrorNodeEditor data={data} handleChange={handleChange} />;
      case "sayDate":
        return <SayDateNodeEditor data={data} handleChange={handleChange} />;
      case "sayTime":
        return <SayTimeNodeEditor data={data} handleChange={handleChange} />;
      case "playTone":
        return <PlayToneNodeEditor data={data} handleChange={handleChange} />;
      case "Input":
        return <InputNodeEditor data={data} handleChange={handleChange} />;
      case "If":
        return <IfNodeEditor data={data} handleChange={handleChange} addNode={addNode} />;
      case "Switch":
        return <SwitchNodeEditor data={data} handleChange={handleChange} addNode={addNode} />;
      case "Dial":
        return <DialNodeEditor data={data} handleChange={handleChange} />;
      case "Set":
        return <SetNodeEditor data={data} handleChange={handleChange} />;
      case "GoTo":
        return <GoToNodeEditor data={data} handleChange={handleChange} addNode={addNode} />;
      case "CallFunction":
        return <CallFunctionNodeEditor data={data} handleChange={handleChange} addNode={addNode} />;
      case "Rpc":
        return <RpcNodeEditor data={data} handleChange={handleChange} />;
      case "SendFax":
        return <SendFaxNodeEditor data={data} handleChange={handleChange} />;
      case "Record":
        return <RecordNodeEditor data={data} handleChange={handleChange} />;
      case "RecordSave":
        return <RecordSaveNodeEditor data={data} handleChange={handleChange} />;
      case "RecordDelete":
        return <RecordDeleteNodeEditor data={data} handleChange={handleChange} />;
      case "AsteriskCmd":
        return <AsteriskCmdNodeEditor data={data} handleChange={handleChange} />;
      case "HangUp":
        return <HangUpNodeEditor data={data} handleChange={handleChange} />;
      case "Return":
        return <ReturnNodeEditor data={data} handleChange={handleChange} />;
      case "inputVoice":
        return <InputVoiceNodeEditor data={data} handleChange={handleChange} />;
      case "GoToTag":
        return <GoToTagNodeEditor data={data} handleChange={handleChange} />;
      case "SetRecordPlan":
        return <SetRecordPlanNodeEditor data={data} handleChange={handleChange} />;
      default:
        return <div>Select a node to edit</div>;
    }
  };

  return (
    <>
      <div className="node-navigate" style={{ width: width <= 815 && "250px" }}>
        {/* <div onClick={() => setData((prev) => ({ ...prev, status: false }))}> */}
        <div
          onClick={() => {
            setData((prev) => ({
              ...prev,
              status: false,
            }));

            setActiveEditor(false)
          }}
        >
          <IoArrowBack />
          <p>{title}</p>
        </div>
        <AiOutlineInfoCircle />
      </div>
      <div className="node-editor">{renderNodeEditor()}</div>
    </>
  );
};

export default memo(NodeEditor);
