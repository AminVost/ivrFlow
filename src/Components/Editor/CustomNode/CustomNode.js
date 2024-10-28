import React, {
  memo,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
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
    createdNodes,
    setCreatedNodes,
    changeChildIf,
    setChangeChildIf,
  } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);
  const { setNodes, getNodes } = useReactFlow();

  const currentNode = getNodes()?.filter((node) => node.id === id);
  const { type, data, selected } = currentNode[0];
  const { title, nodeType, Icon, color, label } = data;

  useEffect(() => {
    const storedNodes = localStorage.getItem("createdNodes");
    if (storedNodes) {
      console.log("read localStorage CustomNode", JSON.parse(storedNodes));
      setCreatedNodes(JSON.parse(storedNodes));
    }
  }, []);

  const centerSelectedNode = (elementId, reactFlowInstance) => {
    if (reactFlowInstance) {
      const element = reactFlowInstance?.getNode(elementId);

      if (element) {
        const { position, width, height } = element;
        const centerX = position.x + width / 2;
        const centerY = position.y + height / 2;

        reactFlowInstance.setCenter(centerX, centerY, {
          duration: 800,
          zoom: 1,
        });
      }
    }
  };

  const deleteNode = useCallback(() => {
    if (id !== "start" && id !== "end") {
      if (
        nodeType == "If" ||
        nodeType == "Switch" ||
        nodeType == "GoTo" ||
        nodeType == "CallFunction"
      ) {
        const edges = reactFlowInstance.getEdges();

        const connectedEdges = edges.filter((edge) => edge.source === id);

        const connectedNodeIds = connectedEdges.map((edge) =>
          edge.source === id ? edge.target : ""
        );

        reactFlowInstance.setNodes((nodes) =>
          nodes.filter(
            (node) => node.id !== id && !connectedNodeIds.includes(node.id)
          )
        );

        reactFlowInstance.setEdges((edges) =>
          edges.filter((edge) => edge.source !== id && edge.target !== id)
        );
      } else {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setData((prev) => ({ ...prev, status: false }));
      }

      const updatedNodes = { ...createdNodes };
      const nodeKey = Object.keys(updatedNodes).find((key) => key.includes(id));

      if (nodeKey) {
        delete updatedNodes[nodeKey];
        console.log("Updated Nodes:", updatedNodes);
        localStorage.setItem("createdNodes", JSON.stringify(updatedNodes));
        setCreatedNodes(updatedNodes);
      }
      setIsUpdated(true);

      const currentNode = reactFlowInstance.getNode(id);
      if (currentNode?.data?.nodeType?.includes("ifIvr")) {
        const regex = /^(.*?)-(trueIf|falseIf)$/;
        const match = id.match(regex);

        if (match) {
          const parentId = match[1]; // ID parent
          const conditionType = match[2]; // trueIf or falseIf
          const parentNode = reactFlowInstance.getNode(parentId);
          setData((prevData) => ({
            ...prevData, // Copy the previous state
            parentId, // Update parentId
            selected: true, // Update selected
            type: parentNode?.type || prevData?.type, // Update type if parentNode exists, otherwise keep previous
            data: parentNode?.data || prevData?.data, // Update data if parentNode exists, otherwise keep previous
            status: true, // Update status
          }));

          // setData((prevData) => ({ ...prevData, data: parentNode.data }));

          setActiveEditor(true);
          setShowSidebar(true);
          setShowDrawer(true);
          setTimeout(() => {
            setChangeChildIf({
              id: currentNode.id,
              parentId: parentId,
              conditionType: conditionType,
            });
          }, 100);
        }
      } else if (currentNode?.data?.nodeType == "gotoIvr") {
        const regex = /^([a-zA-Z0-9]+)-([a-zA-Z]+)$/;
        const match = id.match(regex);
        if (match) {
          const parentId = match[1]; // ID parent
          const parentNode = reactFlowInstance.getNode(parentId);
          setData({
            parentId,
            selected: true,
            type: parentNode.type,
            data: parentNode.data,
            status: true,
          });
          // setData((prevData) => ({ ...prevData, data: parentNode.data }));

          setActiveEditor(true);
          setShowSidebar(true);
          setShowDrawer(true);
          setTimeout(() => {
            setChangeChildIf({
              parentId: parentId,
            });
          }, 100);
        }
      } else if (currentNode?.data?.nodeType == "ivrCallFunction") {
        const regex = /^([a-zA-Z0-9]+)-([a-zA-Z]+)$/;
        const match = id.match(regex);
        if (match) {
          const parentId = match[1]; // ID parent
          const parentNode = reactFlowInstance.getNode(parentId);
          setData({
            parentId,
            selected: true,
            type: parentNode.type,
            data: parentNode.data,
            status: true,
          });
          // setData((prevData) => ({ ...prevData, data: parentNode.data }));

          setActiveEditor(true);
          setShowSidebar(true);
          setShowDrawer(true);
          setTimeout(() => {
            setChangeChildIf({
              parentId: parentId,
            });
          }, 100);
        }
      }
    }
  }, [
    id,
    createdNodes,
    setNodes,
    setCreatedNodes,
    setData,
    reactFlowInstance,
    setIsUpdated,
  ]);
  // const deleteNode = useCallback(() => {
  //   if (id !== "start" && id !== "end") {
  //     setNodes((nodes) => nodes.filter((node) => node.id !== id));
  //     setData((prev) => ({ ...prev, status: false }));
  //   }
  // }, []);

  const updateParent = (id) => {
    const currentNode = reactFlowInstance.getNode(id);
    if (currentNode?.data?.nodeType?.includes("ifIvr")) {
      const regex = /^(.*?)-(trueIf|falseIf)$/;
      const match = id.match(regex);

      if (match) {
        const parentId = match[1];
        const conditionType = match[2];

        const parentNode = reactFlowInstance.getNode(parentId);

        if (parentNode) {
          reactFlowInstance.setNodes((nodes) =>
            nodes.map((node) => {
              if (node.id === parentNode.id) {
                const updatedData = { ...node.data };
                if (conditionType === "trueIf") {
                  delete updatedData.trueIf;
                } else if (conditionType === "falseIf") {
                  delete updatedData.falseIf;
                }

                return { ...node, data: updatedData };
              }
              return node;
            })
          );
        }
      }
    }
  };

  const isValidSingleConnection = (connection) => {
    const targetNodeEdges = reactFlowInstance
      .getEdges()
      .filter((edge) => edge.target === connection.target);
    return targetNodeEdges.length === 0;
  };

  return (
    <>
      <div className={`nodeItem  ${nodeType}`} data-nodeid={`${id}`}>
        {nodeType !== "start" &&
          nodeType !== "gotoIvr" &&
          nodeType !== "switchIvr" &&
          !nodeType.includes("ifIvr") &&
          nodeType !== "ivrCallFunction" && (
            <Handle className="edge-handle top" type="target" position="top" />
          )}

        {nodeType == "GoTo" && (
          <Handle
            className="edge-handle left"
            type="source"
            position="left"
            id="goto-source-right"
          />
        )}

        {nodeType == "CallFunction" && (
          <Handle
            className="edge-handle left"
            type="source"
            position="left"
            id="callFunction-source-right"
          />
        )}

        {nodeType == "If" && (
          <>
            <Handle
              className="edge-handle left"
              type="source"
              position="left"
              id="if-false-source-left"
            />
            <Handle
              className="edge-handle right"
              type="source"
              position="right"
              id="if-true-source-right"
            />
          </>
        )}

        {nodeType == "Switch" && (
          <>
            <Handle
              className="edge-handle left"
              type="source"
              position="left"
              id="switch-source-left"
            />
            <Handle
              className="edge-handle right"
              type="source"
              position="right"
              id="switch-source-right"
            />
          </>
        )}

        {nodeType !== "start" &&
          nodeType !== "end" &&
          nodeType !== "switchIvr" && (
            <div
              className={`toolbar-wrapper ${
                nodeType === "start" ? "hidden" : ""
              }`}
              style={{ display: isVisible ? "flex" : "none" }}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              <>
                {nodeType !== "switchIvr" && (
                  <AiOutlineDelete
                    onClick={() => {
                      deleteNode();
                      setIsUpdated(true);
                    }}
                  />
                )}
                {nodeType !== "gotoIvr" &&
                  nodeType !== "switchIvr" &&
                  !nodeType.includes("ifIvr") && (
                    <BiPencil
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,                          
                          status: false,
                        }));
                        setTimeout(() => {                         
                          setData((prev) => ({
                            ...prev,
                            id,
                            selected,
                            type,
                            data,
                            status: true,
                          }));
                        }, 50);

                        setActiveEditor(true);
                        setShowSidebar(true);
                        setShowDrawer((state) => !state);
                      }}
                    />
                  )}
              </>
            </div>
          )}

        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className={`custom-node-wrapper ${selected ? "selected" : ""} ${
            nodeType === "start" ? "startClass" : ""
          } ${nodeType === "end" ? "endClass" : ""} ${
            nodeType.includes("ifIvr") ? "ifIvr" : ""
          } ${nodeType === "gotoIvr" ? "gotoIvr" : ""} ${
            nodeType === "ivrCallFunction" ? "ivrCallFunction" : ""
          } ${nodeType === "switchIvr" ? "switchIvr" : ""}`}
          onClick={() => centerSelectedNode(id, reactFlowInstance)}
        >
          {nodeType !== "end" && (
            <div
              className={`${nodeType === "start" ? "startNodeIcon" : ""}`}
              style={{
                backgroundColor: nodeType === "start" ? "white" : color,
              }}
            >
              {nodeType == "gotoIvr" ||
              nodeType.includes("ifIvr") ||
              nodeType == "ivrCallFunction" ||
              nodeType == "switchIvr" ? (
                <a className="nodeLabel" href="#!" target="_blank">
                  {getIcons(Icon)}
                </a>
              ) : (
                getIcons(Icon)
              )}
            </div>
          )}
          <div className="nodInfo">
            {nodeType == "gotoIvr" ||
            nodeType.includes("ifIvr") ||
            nodeType == "ivrCallFunction" ||
            nodeType == "switchIvr" ? (
              <a className="nodeLabel" href="#!" target="_blank">
                {stringReducer(title, 30)}
              </a>
            ) : (
              <p className="nodeLabel">
                {stringReducer(title, 20)}{" "}
                {label ? "(" + stringReducer(label, 16) + ")" : ""}
              </p>
            )}

            {(() => {
              switch (nodeType) {
                case "Playback":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.filePath || data?.fileItem || data?.comments) && (
                      <div className="nodeBrief">
                        {data.filePath && (
                          <p>
                            <b>filePath: </b> {data.filePath}
                          </p>
                        )}
                        {data.fileItem && (
                          <p>
                            <b>fileItem: </b> {data.fileItem}.wave
                          </p>
                        )}
                        {data.comments && (
                          <p>
                            <b>comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "sayNum":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.value || data?.step || data?.comments) && (
                      <div className="nodeBrief">
                        <p>
                          <b> {data?.value} </b> by <b>{data.step || 0}</b> Step
                        </p>
                        {data.comments && (
                          <p>
                            <b>comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "sayDate":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.date || data?.dateType || data?.comments) && (
                      <div className="nodeBrief">
                        <p>
                          <b> {data?.date} </b> in <b>{data.dateType || 0}</b>{" "}
                          Style
                        </p>
                        {data.comments && (
                          <p>
                            <b>comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "sayTime":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.time || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.time && <p>{data?.time} </p>}
                        {data?.comments && (
                          <p>
                            <b>comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "playTone":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.tone || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.tone && (
                          <p>
                            <b>Tone: </b> {data?.tone}{" "}
                          </p>
                        )}
                        {data?.timeout && (
                          <p>
                            <b>Timeout: </b> {data?.timeout} Second
                          </p>
                        )}
                        {data?.comments && (
                          <p>
                            <b>comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "playError":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.errorCode || data?.errorGroup || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.errorCode || data?.errorGroup) && (
                          <p>
                            in group <b>( {data?.errorGroup || "unknown"} )</b>{" "}
                            with error code{" "}
                            <b>( {data?.errorCode || "unknown"} ) </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>
                            <b>Comment: </b> {stringReducer(data.comments, 35)}
                          </p>
                        )}
                      </div>
                    )
                  );
                case "Input":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.value ||
                      data?.varName ||
                      data?.fileItem ||
                      data?.loop ||
                      data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.value || data?.fileItem) && (
                          <p>
                            Playback:{" "}
                            <b>
                              {" "}
                              {data?.value
                                ? data?.value
                                : data?.fileItem + ".wave" || "unknown"}{" "}
                            </b>
                          </p>
                        )}
                        {data?.varName && (
                          <p>
                            Input: <b> {data?.varName || "unknown"} </b>
                          </p>
                        )}
                        {data?.loop && (
                          <p>
                            For <b> {data?.loop || "unknown"} </b> times
                          </p>
                        )}
                        {data?.comments && (
                          <p>
                            Comment: <b>{stringReducer(data.comments, 35)}</b>
                          </p>
                        )}
                      </div>
                    )
                  );
                case "Set":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.value ||
                      data?.varName ||
                      data?.comments ||
                      data?.evaluate) && (
                      <div className="nodeBrief">
                        {(data?.value || data?.varName) && (
                          <p>
                            <b> {data?.varName || "unknown"} </b> To{" "}
                            <b> {data?.value || "unknown"} </b>
                          </p>
                        )}
                        {data?.evaluate && (
                          <p>
                            Evaluate is <b> {data?.evaluate ? "On" : "OFF"} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "GoTo":
                  return (
                    data?.showInfo &&
                      data.showInfo == "on" &&
                      (data?.advanceIvr || data?.comments) && (
                        <div className="nodeBrief">
                          {data?.advanceIvr && (
                            <p>
                              <b> {data?.advanceIvr || "unknown"} </b>
                            </p>
                          )}
                          {data?.comments && (
                            <p>Comment: {stringReducer(data.comments, 35)}</p>
                          )}
                        </div>
                      ),
                    data?.labelValue && data?.labelValue !== undefined && (
                      <div className="nodeBrief">
                        <p>
                          Label:{" "}
                          <b style={{ color: "#69ffa4", fontWeight: 400 }}>
                            {" "}
                            {stringReducer(data?.labelValue, 25)}{" "}
                          </b>
                        </p>
                      </div>
                    )
                  );
                case "CallFunction":
                  return (
                    data?.showInfo &&
                      data.showInfo == "on" &&
                      (data?.advanceIvr || data?.comments) && (
                        <div className="nodeBrief">
                          {data?.advanceIvr && (
                            <p>
                              <b> {data?.advanceIvr || "unknown"} </b>
                            </p>
                          )}
                          {data?.comments && (
                            <p>Comment: {stringReducer(data.comments, 35)}</p>
                          )}
                        </div>
                      ),
                    data?.labelValue && data?.labelValue !== undefined && (
                      <div className="nodeBrief">
                        <p>
                          Label:{" "}
                          <b style={{ color: "#ff3333", fontWeight: 400 }}>
                            {" "}
                            {stringReducer(data?.labelValue, 25)}{" "}
                          </b>
                        </p>
                      </div>
                    )
                  );
                case "Rpc":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.routine ||
                      data?.whenRoutineRun ||
                      data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.advanceIvr || data?.whenRoutineRun) && (
                          <p>
                            Call: <b> {data?.routine || "unknown"} </b>
                            {data?.whenRoutineRun &&
                              data?.whenRoutineRun !== "NOW" && (
                                <>
                                  {" on "}
                                  <b>{data?.whenRoutineRun}</b>
                                </>
                              )}
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "SendFax":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.faxNumber || data?.fileItem || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.faxNumber && (
                          <p>
                            faxNumber: <b> {data?.faxNumber || "unknown"} </b>
                          </p>
                        )}
                        {data?.fileItem && (
                          <p>
                            fileItem: <b> {data?.fileItem || "unknown"} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "Record":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.recordReason ||
                      data?.recordOption ||
                      data?.maxDuration ||
                      data?.silence ||
                      data?.comments) && (
                      <div className="nodeBrief">
                        <p>
                          Record Is <b> On </b>
                        </p>
                        {data?.recordReason && (
                          <p>
                            Reason: <b> {data?.recordReason} </b>
                          </p>
                        )}
                        {/* {(data?.maxDuration) && (
                          <p>
                            maxDuration: <b> {data?.maxDuration + 'sec' || 'unknown'} </b> 
                          </p>
                        )}
                        {(data?.silence) && (
                          <p>
                            silence: <b> {data?.silence + 'sec' || 'unknown'} </b> 
                          </p>
                        )} */}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "RecordSave":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "RecordDelete":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "AsteriskCmd":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.asteriskCmd ||
                      data?.asteriskCmdValue ||
                      data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.asteriskCmd || data?.asteriskCmdValue) && (
                          <p>
                            {data?.asteriskCmd || "unknown"} ({" "}
                            <b> {data?.asteriskCmdValue || "unknown"} </b> )
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "HangUp":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "Return":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "inputVoice":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "GoToTag":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.ivrTagGroup || data?.value || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.ivrTagGroup && (
                          <p>
                            <b>{data?.ivrTagGroup || "unknown"}</b>
                          </p>
                        )}
                        {data?.value && (
                          <p>
                            base on <b> {data?.value || "unknown"}</b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "SetRecordPlan":
                  // set_record_plan  to asli
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" &&
                    (data?.setRecordPlan || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.setRecordPlan && (
                          <p>
                            To <b>{data?.setRecordPlan || "unknown"}</b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "customNodeType":
                  return (
                    data?.showInfo &&
                    data.showInfo == "on" && (
                      <div className="nodeBrief">
                        <p>
                          <b>hey hey</b>
                        </p>

                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case "If":
                  return (
                    (data?.trueLabelValue || data?.falseLabelValue) !==
                      undefined && (
                      <div className="nodeBrief">
                        {data?.trueLabelValue && (
                          <p>
                            When{" "}
                            <b style={{ color: "#4CAF50", fontWeight: 400 }}>
                              {" "}
                              True{" "}
                            </b>{" "}
                            Label:{" "}
                            <b style={{ color: "#ff8333", fontWeight: 400 }}>
                              {data.trueLabelValue}
                            </b>
                          </p>
                        )}
                        {data?.falseLabelValue && (
                          <p>
                            When{" "}
                            <b style={{ color: "#F44336", fontWeight: 400 }}>
                              {" "}
                              False{" "}
                            </b>{" "}
                            Label:{" "}
                            <b style={{ color: "#ff8333", fontWeight: 400 }}>
                              {data.falseLabelValue}
                            </b>
                          </p>
                        )}
                      </div>
                    )
                  );
                case "Dial":
                  return (
                    data?.showInfo && (
                      <>
                        {data?.number && (
                          <div className="nodeBrief">
                            <p>Number: <b>{data?.number}</b></p>
                          </div>
                        )}
                        {data?.extensionType && data?.extensionType !== "Dial Out" && (
                          <div className="nodeBrief">
                            <p>Default is: <b>{data?.extensionType}</b></p>
                          </div>
                        )}
                        {data?.extension && data?.extensionType == "Extension" && (
                          <div className="nodeBrief">
                            <p>Extension: <b>{data?.extension}</b></p>
                          </div>
                        )}
                        {data?.advanceIvr && data?.extensionType == "Advance IVR" && (
                          <div className="nodeBrief">
                            <p>Advance Ivr: <b>{data?.advanceIvr}</b></p>
                          </div>
                        )}
                        {data?.simpleIvr && data?.extensionType == "Simple IVR" && (
                          <div className="nodeBrief">
                            <p>Simple Ivr: <b>{data?.simpleIvr}</b></p>
                          </div>
                        )}
                        {data?.queue && data?.extensionType == "Queue" && (
                          <div className="nodeBrief">
                            <p>Queue: <b>{data?.queue}</b></p>
                          </div>
                        )}
                        {data?.voiceMaileExtension && data?.extensionType == "Voicemail" && (
                          <div className="nodeBrief">
                            <p>Extension: <b>{data?.voiceMaileExtension}</b></p>
                          </div>
                        )}
                        {data?.conference && data?.extensionType == "Conference" && (
                          <div className="nodeBrief">
                            <p>Conference: <b>{data?.conference}</b></p>
                          </div>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data?.comments, 35)}</p>
                        )}
                      </>
                    )
                  );
                default:
                  return <></>;
              }
            })()}
          </div>
        </div>
        {nodeType != "end" &&
          nodeType !== "gotoIvr" &&
          nodeType !== "switchIvr" &&
          !nodeType.includes("ifIvr") &&
          nodeType !== "ivrCallFunction" &&
          nodeType !== "goTo" && (
            <Handle
              className="edge-handle bottom"
              type="source"
              position="bottom"
              id={`handle-${id}`}
            />
          )}

        {/* {(nodeType === "gotoIvr" ||
          nodeType === "switchIvr" ||
          nodeType.includes("ifIvr") ||
          nodeType === "ivrCallFunction") && (
            <Handle className="edge-handle" type="source" position="bottom" />
          )} */}

        {nodeType === "gotoIvr" && (
          <Handle
            className="edge-handle"
            type="target"
            position="top"
            isValidConnection={isValidSingleConnection}
          />
        )}

        {nodeType === "switchIvr" && (
          <Handle
            className="edge-handle"
            type="target"
            position="top"
            isValidConnection={isValidSingleConnection}
          />
        )}

        {nodeType.includes("ifIvr") && (
          <Handle
            className="edge-handle"
            type="target"
            position="top"
            isValidConnection={isValidSingleConnection}
          />
        )}

        {nodeType === "ivrCallFunction" && (
          <Handle
            className="edge-handle"
            type="target"
            position="top"
            isValidConnection={isValidSingleConnection}
          />
        )}
      </div>
    </>
  );
};

export default memo(CustomNode);
