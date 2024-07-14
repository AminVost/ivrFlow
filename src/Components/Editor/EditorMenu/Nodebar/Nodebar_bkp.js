import React, { useContext, useState } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import NodeComp from "./NodeComp";
import { RiSearch2Line } from "react-icons/ri";
import { BsFillCircleFill } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { BiFullscreen, BiMinus, BiPlus } from "react-icons/bi";
import { AppContext } from "../../../../Context/AppContext";
import { PiSidebarSimpleFill } from "react-icons/pi";

const nodes = [
  // Define your nodes here
  { title: "Playback", type: "default", icon: "RiPlayCircleLine", color: "#ff5733" },
  { title: "say_num", type: "default", icon: "TbNumber123", color: "#33ff57" },
  { title: "say_date", type: "default", icon: "RiCalendarEventFill", color: "#3357ff" },
  { title: "say_time", type: "default", icon: "RiTimerLine", color: "#f033ff" },
  { title: "playTone", type: "default", icon: "TbSpeakerphone", color: "#33fff0" },
  { title: "play_error", type: "default", icon: "RiErrorWarningLine", color: "#ff33a1" },
  { title: "Input", type: "default", icon: "TbArrowBigDownLine", color: "#a1ff33" },
  { title: "If", type: "default", icon: "RiQuestionLine", color: "#ff8333" },
  { title: "Switch", type: "default", icon: "RiPentagonLine", color: "#3383ff" },
  { title: "Dial", type: "default", icon: "RiPhoneLine", color: "#f0ff33" },
  { title: "Set", type: "default", icon: "RiChatNewLine", color: "#ff33f0" },
  { title: "GoTo", type: "default", icon: "TbArrowGuide", color: "#33ff83" },
  { title: "CallFunction", type: "default", icon: "TbFunction", color: "#ff3333" },
  { title: "rpc", type: "default", icon: "RiFunctionAddLine", color: "#3383ff" },
  { title: "Send Fax", type: "default", icon: "RiFilePaper2Line", color: "#ff5733" },
  { title: "Record", type: "default", icon: "RiMicLine", color: "#78f096" },
  { title: "Record Save", type: "default", icon: "RiMicFill", color: "#57ff33" },
  { title: "Record Delete", type: "default", icon: "RiMicOffLine", color: "#3357ff" },
  { title: "Asterisk CMD", type: "default", icon: "RiStarLine", color: "#ff33a1" },
  { title: "HangUp", type: "default", icon: "TbPhoneOff", color: "#a1ff33" },
  { title: "Return", type: "default", icon: "TbArrowCapsule", color: "#ff8333" },
  { title: "Input Voice", type: "default", icon: "RiChatVoiceLine", color: "#3383ff" },
  { title: "GoTo Tag", type: "default", icon: "RiPriceTag3Line", color: "#f0ff33" },
];

function Nodebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { setShowSidebar, setShowDrawer, showSidebar, showDrawer, width } =
    useContext(AppContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNodes = nodes.filter((node) =>
    node.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="nodes-header">
        <div>
          {width <= 815 && (
            <ScreenToggleButton
              setShowSidebar={setShowSidebar}
              setShowDrawer={setShowDrawer}
              showSidebar={showSidebar}
              showDrawer={showDrawer}
            />
          )}
        </div>

        <div>
          <RiSearch2Line />
          <input
            type="text"
            placeholder="Search... (ctrl+f)"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="nodes-content">
        <div className={`nodes-wrapper ${!isVisible ? "hidden" : ""}`}>
          {filteredNodes.map((node, idx) => (
            <NodeComp key={idx} {...node} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Nodebar;

const ScreenToggleButton = ({
  setShowSidebar,
  setShowDrawer,
  showSidebar,
  showDrawer,
}) => {
  return (
    <div className="screen-toggle-button">
      <IconButton
        disableTouchRipple
        onClick={() => {
          setShowSidebar(!showSidebar);
          setShowDrawer(!showDrawer);
        }}
      >
        {showSidebar ? <PiSidebarSimpleFill /> : <BiFullscreen />}
      </IconButton>
    </div>
  );
};
