import React, { useContext, useState,useRef,useEffect } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import NodeComp from "./NodeComp";
import { RiSearch2Line } from "react-icons/ri";
import { BsFillCircleFill } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { BiFullscreen, BiMinus, BiPlus } from "react-icons/bi";
import { AppContext } from "../../../../Context/AppContext";
import { PiSidebarSimpleFill } from "react-icons/pi";

const nodes = [
  {
    title: "Playback",
    type: "Playback",
    icon: "RiPlayCircleLine",
    color: "#ff5733",
  },
  {
    title: "say_num",
    type: "sayNum",
    icon: "TbNumber123",
    color: "#33ff57",
  },
  {
    title: "say_date",
    type: "sayDate",
    icon: "RiCalendarEventFill",
    color: "#3357ff",
  },
  {
    title: "say_time",
    type: "sayTime",
    icon: "RiTimerLine",
    color: "#f033ff",
  },
  {
    title: "playTone",
    type: "playTone",
    icon: "TbSpeakerphone",
    color: "#33fff0",
  },
  {
    title: "play_error",
    type: "playError",
    icon: "RiErrorWarningLine",
    color: "#ff33a1",
  },
  {
    title: "Input",
    type: "Input",
    icon: "TbArrowBigDownLine",
    color: "#a1ff33",
  },
  {
    title: "If",
    type: "If",
    icon: "RiQuestionLine",
    color: "#ff8333",
  },
  {
    title: "Switch",
    type: "Switch",
    icon: "RiPentagonLine",
    color: "#3383ff",
  },
  {
    title: "Dial",
    type: "Dial",
    icon: "RiPhoneLine",
    color: "#f0ff33",
  },
  {
    title: "Set",
    type: "Set",
    icon: "RiChatNewLine",
    color: "#ff33f0",
  },
  {
    title: "GoTo",
    type: "GoTo",
    icon: "TbArrowGuide",
    color: "#33ff83",
  },
  {
    title: "CallFunction",
    type: "CallFunction",
    icon: "TbFunction",
    color: "#ff3333",
  },
  {
    title: "rpc",
    type: "Rpc",
    icon: "RiFunctionAddLine",
    color: "#3383ff",
  },
  {
    title: "Send Fax",
    type: "SendFax",
    icon: "RiFilePaper2Line",
    color: "#ff5733",
  },
  {
    title: "Record",
    type: "Record",
    icon: "RiMicLine",
    color: "#78f096",
  },
  {
    title: "Record Save",
    type: "RecordSave",
    icon: "RiMicFill",
    color: "#57ff33",
  },
  {
    title: "Record Delete",
    type: "RecordDelete",
    icon: "RiMicOffLine",
    color: "#3357ff",
  },
  {
    title: "Asterisk CMD",
    type: "AsteriskCmd",
    icon: "RiStarLine",
    color: "#ff33a1",
  },
  {
    title: "HangUp",
    type: "HangUp",
    icon: "TbPhoneOff",
    color: "#a1ff33",
  },
  {
    title: "Return",
    type: "Return",
    icon: "TbArrowCapsule",
    color: "#ff8333",
  },
  {
    title: "Input Voice",
    type: "inputVoice",
    icon: "RiChatVoiceLine",
    color: "#3383ff",
  },
  {
    title: "GoTo Tag",
    type: "GoToTag",
    icon: "RiPriceTag3Line",
    color: "#f0ff33",
  },
];

function Nodebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null); // Ref for the search input
  const { setShowSidebar, setShowDrawer, showSidebar, showDrawer, width } =
    useContext(AppContext);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNodes = nodes.filter((node) =>
    node.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'f' || event.ctrlKey && event.key === 'F') {
        event.preventDefault(); // Prevent the default browser search
        searchInputRef.current.focus(); // Focus on the search input
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="nodes-header">
        <div>
          {/* <GiEarthAmerica />
          <p>Testing</p> */}
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
            onChange={handleSearch}
            value={searchTerm}
            ref={searchInputRef}
          />
        </div>
      </div>
      <div className="nodes-content">
        {/* <div className="nodes-type">
          <div>
            <BsFillCircleFill />
            <p>General</p>
          </div>
          <IconButton disableRipple onClick={() => setIsVisible(!isVisible)}>
            {!isVisible ? <BiPlus /> : <BiMinus />}
          </IconButton>
        </div> */}
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
