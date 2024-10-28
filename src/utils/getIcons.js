import React from "react";
import { RxLightningBolt } from "react-icons/rx";
import { RiWindow2Line,RiArrowDownFill, RiCursorLine, RiParagraph,RiPlayCircleLine,RiCalendarEventFill,RiTimerLine,RiPriceTag3Line,RiPentagonLine,RiMicOffLine,RiMicLine,RiChatVoiceLine,RiStarLine,RiErrorWarningLine,RiMicFill,RiQuestionLine,RiPhoneLine,RiChatNewLine,RiFilePaper2Line,RiFunctionAddLine,RiExternalLinkLine,RiSunFill   } from "react-icons/ri";
import { TbPhoto,TbNumber123,TbSpeakerphone,TbArrowBigDownLine,TbArrowGuide,TbFunction,TbPhoneOff,TbArrowCapsule,TbMoonFilled   } from "react-icons/tb";

function getIcons(requestIcon) {
  const icons = {
    RxLightningBolt: <RxLightningBolt />,
    RiWindow2Line: <RiWindow2Line />,
    RiCursorLine: <RiCursorLine />,
    RiParagraph: <RiParagraph />,
    TbPhoto: <TbPhoto />,
    RiPlayCircleLine : <RiPlayCircleLine />,
    TbNumber123 : <TbNumber123 />,
    RiCalendarEventFill : <RiCalendarEventFill />,
    RiTimerLine : <RiTimerLine />,
    TbSpeakerphone : <TbSpeakerphone />,
    RiErrorWarningLine : <RiErrorWarningLine />, 
    TbArrowBigDownLine : <TbArrowBigDownLine />, 
    RiQuestionLine : <RiQuestionLine />, 
    RiPentagonLine : <RiPentagonLine />, 
    RiPhoneLine : <RiPhoneLine />, 
    RiChatNewLine : <RiChatNewLine />,
    TbArrowGuide : <TbArrowGuide />, 
    TbFunction : <TbFunction />, 
    RiFunctionAddLine : <RiFunctionAddLine />, 
    RiFilePaper2Line : <RiFilePaper2Line />, 
    RiMicLine : <RiMicLine />, 
    RiMicFill : <RiMicFill />, 
    RiMicOffLine : <RiMicOffLine />, 
    RiStarLine : <RiStarLine />, 
    TbPhoneOff : <TbPhoneOff />, 
    TbArrowCapsule : <TbArrowCapsule />, 
    RiChatVoiceLine : <RiChatVoiceLine />, 
    RiPriceTag3Line : <RiPriceTag3Line />,
    RiArrowDownFill : <RiArrowDownFill  />,
    RiExternalLinkLine : <RiExternalLinkLine  />,
    RiSunFill : <RiSunFill />,
    TbMoonFilled  : <TbMoonFilled   />,
  };

  return icons[requestIcon];
}

export default getIcons;
