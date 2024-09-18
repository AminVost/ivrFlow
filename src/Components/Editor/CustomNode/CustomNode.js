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
    if (id !== "start" && id !== "end") {
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
        {nodeType !== "start" && nodeType !== "end" && (
          <div
            className={`toolbar-wrapper ${nodeType === "start" ? "hidden" : ""}`}
            style={{ display: isVisible ? "flex" : "none" }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
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
          // className={`custom-node-wrapper ${selected ? "selected" : ""} ${nodeType === "start" ? "startClass" : ""
          //   }`}
          className={`custom-node-wrapper ${selected ? "selected" : ""} ${nodeType === "start" ? "startClass" : ""} ${nodeType === "end" ? "endClass" : ""}`}
          onClick={() => centerSelectedNode(id, reactFlowInstance)}
        >

          {/* <div
            className={`${nodeType === "start" ? "startNodeIcon" : ""}`}
            style={{ backgroundColor: nodeType == "start" ? "white" : color }}
          >
            {getIcons(Icon)}
          </div> */}
          {nodeType !== "end" && (
            <div
              className={`${nodeType === "start" ? "startNodeIcon" : ""}`}
              style={{ backgroundColor: nodeType === "start" ? "white" : color }}
            >
              {getIcons(Icon)}
            </div>
          )}
          <div className="nodInfo">
            <p className="nodeLabel">
              {stringReducer(title, 15)} {label ? '(' + stringReducer(label, 16) + ')' : ''}
            </p>
            {(() => {
              switch (nodeType) {
                case 'Playback':
                  return (
                    (data?.filePath || data?.fileItem || data?.comments) && (
                      <div className="nodeBrief">
                        {data.filePath && <p><b>filePath: </b> {data.filePath}</p>}
                        {data.fileItem && <p><b>fileItem: </b> {data.fileItem}.wave</p>}
                        {data.comments && <p><b>comment: </b> {stringReducer(data.comments, 35)}</p>}
                      </div>
                    )
                  );
                case 'sayNum':
                  return (
                    (data?.value || data?.step || data?.comments) && (
                      <div className="nodeBrief">
                        <p><b> {data?.value} </b> by <b>{data.step || 0}</b> Step</p>
                        {data.comments && <p><b>comment: </b> {stringReducer(data.comments, 35)}</p>}
                      </div>
                    )
                  );
                case 'sayDate':
                  return (
                    (data?.date || data?.dateType || data?.comments) && (
                      <div className="nodeBrief">
                        <p><b> {data?.date} </b> in <b>{data.dateType || 0}</b> Style</p>
                        {data.comments && <p><b>comment: </b> {stringReducer(data.comments, 35)}</p>}
                      </div>
                    )
                  );
                case 'sayTime':
                  return (
                    (data?.time || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.time && <p>{data?.time} </p>}
                        {data?.comments && <p><b>comment: </b> {stringReducer(data.comments, 35)}</p>}
                      </div>
                    )
                  );
                case 'playTone':
                  return (
                    (data?.tone || data?.comments) && (
                      <div className="nodeBrief">
                        {data?.tone && <p><b>Tone: </b> {data?.tone} </p>}
                        {data?.timeout && <p><b>Timeout: </b> {data?.timeout} Second</p>}
                        {data?.comments && <p><b>comment: </b> {stringReducer(data.comments, 35)}</p>}
                      </div>
                    )
                  );
                case 'playError':
                  return (
                    (data?.errorCode || data?.errorGroup || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.errorCode || data?.errorGroup) && (
                          <p>
                            in group <b>( {data?.errorGroup || 'unknown'} )</b>  with error code <b>( {data?.errorCode || 'unknown'} ) </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p><b>Comment: </b> {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'Input':
                  return (
                    (data?.value || data?.varName || data?.fileItem || data?.loop || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.value || data?.fileItem) && (
                          <p>
                            Playback: <b> {data?.value ? data?.value : data?.fileItem + '.wave' || 'unknown'} </b>
                          </p>
                        )}
                        {data?.varName && (
                          <p>
                            Input: <b> {data?.varName || 'unknown'} </b>
                          </p>
                        )}
                        {data?.loop && (
                          <p>
                            For <b> {data?.loop || 'unknown'} </b> times
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment:  <b>{stringReducer(data.comments, 35)}</b></p>
                        )}
                      </div>
                    )
                  );
                case 'Set':
                  return (
                    (data?.value || data?.varName || data?.comments || data?.evaluate) && (
                      <div className="nodeBrief">
                        {(data?.value || data?.varName) && (
                          <p>
                            <b> {data?.varName || 'unknown'} </b> To <b> {data?.value || 'unknown'}  </b>
                          </p>
                        )}
                        {(data?.evaluate) && (
                          <p>
                            Evaluate is <b> {data?.evaluate ? 'On' : 'OFF'} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'GoTo':
                  return (
                    (data?.advanceIvr || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.advanceIvr) && (
                          <p>
                            <b> {data?.advanceIvr || 'unknown'} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'CallFunction':
                  return (
                    (data?.advanceIvr || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.advanceIvr) && (
                          <p>
                            <b> {data?.advanceIvr || 'unknown'} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'Rpc':
                  return (
                    (data?.routine || data?.whenRoutineRun || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.advanceIvr || data?.whenRoutineRun) && (
                          <p>
                            Call: <b> {data?.routine || 'unknown'} </b>
                            {data?.whenRoutineRun && data?.whenRoutineRun !== 'NOW' && (
                              <>
                                {' on '}
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
                case 'SendFax':
                  return (
                    (data?.faxNumber || data?.fileItem || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.faxNumber) && (
                          <p>
                            faxNumber: <b> {data?.faxNumber || 'unknown'} </b>
                          </p>
                        )}
                        {(data?.fileItem) && (
                          <p>
                            fileItem: <b> {data?.fileItem || 'unknown'} </b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'Record':
                  return (
                    (data?.recordReason || data?.recordOption || data?.maxDuration || data?.silence || data?.comments) && (
                      <div className="nodeBrief">
                        <p>
                          Record Is <b> On </b>
                        </p>
                        {(data?.recordReason) && (
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
                case 'RecordSave':
                  return (
                    <div className="nodeBrief">
                      {data?.comments && (
                        <p>Comment: {stringReducer(data.comments, 35)}</p>
                      )}
                    </div>
                  );
                case 'RecordDelete':
                  return (
                    <div className="nodeBrief">
                      {data?.comments && (
                        <p>Comment: {stringReducer(data.comments, 35)}</p>
                      )}
                    </div>
                  );
                case 'AsteriskCmd':
                  return (
                    (data?.asteriskCmd || data?.asteriskCmdValue || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.asteriskCmd || data?.asteriskCmdValue) && (
                          <p>
                            {data?.asteriskCmd || 'unknown'} ( <b> {data?.asteriskCmdValue || 'unknown'}  </b> )
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'HangUp':
                  return (
                    <div className="nodeBrief">
                      {data?.comments && (
                        <p>Comment: {stringReducer(data.comments, 35)}</p>
                      )}
                    </div>
                  );
                case 'Return':
                  return (
                    <div className="nodeBrief">
                      {data?.comments && (
                        <p>Comment: {stringReducer(data.comments, 35)}</p>
                      )}
                    </div>
                  );
                case 'inputVoice':
                  return (
                    <div className="nodeBrief">
                      {data?.comments && (
                        <p>Comment: {stringReducer(data.comments, 35)}</p>
                      )}
                    </div>
                  );
                case 'GoToTag':
                  return (
                    (data?.ivrTagGroup || data?.value || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.ivrTagGroup) && (
                          <p>
                            <b>{data?.ivrTagGroup || 'unknown'}</b>
                          </p>
                        )}
                        {(data?.value) && (
                          <p>
                            base on <b> {data?.value || 'unknown'}</b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                case 'SetRecordPlan':
                  // set_record_plan  to asli
                  return (
                    (data?.setRecordPlan || data?.comments) && (
                      <div className="nodeBrief">
                        {(data?.setRecordPlan) && (
                          <p>
                            To <b>{data?.setRecordPlan || 'unknown'}</b>
                          </p>
                        )}
                        {data?.comments && (
                          <p>Comment: {stringReducer(data.comments, 35)}</p>
                        )}
                      </div>
                    )
                  );
                default:
                  return (
                    <>
                    </>
                  );
              }
            })()}
          </div>
        </div>

        {/* {(nodeType === "default" || nodeType === "input") && (
        <Handle className="edge-handle" type="target" position="bottom" />
        )} */}
        {nodeType != "end" && (
          <Handle className="edge-handle" type="target" position="bottom" />
        )}
      </div>
    </>
  );
};

export default memo(CustomNode);
