import React from "react";
import { RxLightningBolt } from "react-icons/rx";
import { RiWindow2Line,RiArrowDownFill, RiCursorLine, RiParagraph,RiPlayCircleLine,RiCalendarEventFill,RiCloseFill ,RiEdit2Line ,RiTimerLine,RiAddBoxLine ,RiPriceTag3Line,RiPentagonLine,RiMicOffLine,RiMicLine,RiChatVoiceLine,RiStarLine,RiErrorWarningLine,RiMicFill,RiQuestionLine,RiPhoneLine,RiChatNewLine,RiFilePaper2Line,RiFunctionAddLine,RiExternalLinkLine,RiSunFill,RiArrowUpFill,RiDeleteBin6Line  } from "react-icons/ri";
import { TbPhoto,TbNumber123,TbSpeakerphone,TbArrowBigDownLine,TbArrowGuide,TbFunction,TbPhoneOff,TbArrowCapsule,TbMoonFilled } from "react-icons/tb";

function getIcons(requestIcon , props = {}) {
  const icons = {
    RxLightningBolt: <RxLightningBolt {...props} />,
    RiWindow2Line: <RiWindow2Line {...props} />,
    RiCursorLine: <RiCursorLine {...props} />,
    RiParagraph: <RiParagraph {...props} />,
    TbPhoto: <TbPhoto {...props} />,
    RiPlayCircleLine : <RiPlayCircleLine {...props} />,
    TbNumber123 : <TbNumber123 {...props} />,
    RiCalendarEventFill : <RiCalendarEventFill {...props} />,
    RiTimerLine : <RiTimerLine {...props} />,
    TbSpeakerphone : <TbSpeakerphone {...props} />,
    RiErrorWarningLine : <RiErrorWarningLine {...props} />, 
    TbArrowBigDownLine : <TbArrowBigDownLine {...props} />, 
    RiQuestionLine : <RiQuestionLine {...props} />, 
    RiPentagonLine : <RiPentagonLine {...props} />, 
    RiPhoneLine : <RiPhoneLine {...props} />, 
    RiChatNewLine : <RiChatNewLine {...props} />,
    TbArrowGuide : <TbArrowGuide {...props} />, 
    TbFunction : <TbFunction {...props} />, 
    RiFunctionAddLine : <RiFunctionAddLine {...props} />, 
    RiFilePaper2Line : <RiFilePaper2Line {...props} />, 
    RiMicLine : <RiMicLine {...props} />, 
    RiMicFill : <RiMicFill {...props} />, 
    RiMicOffLine : <RiMicOffLine {...props} />, 
    RiStarLine : <RiStarLine {...props} />, 
    TbPhoneOff : <TbPhoneOff {...props} />, 
    TbArrowCapsule : <TbArrowCapsule {...props} />, 
    RiChatVoiceLine : <RiChatVoiceLine {...props} />, 
    RiPriceTag3Line : <RiPriceTag3Line {...props} />,
    RiArrowDownFill : <RiArrowDownFill  {...props} />,
    RiExternalLinkLine : <RiExternalLinkLine  {...props} />,
    RiSunFill : <RiSunFill {...props} />,
    TbMoonFilled  : <TbMoonFilled {...props} />,
    RiArrowUpFill  : <RiArrowUpFill {...props} />,
    RiDeleteBin6Line  : <RiDeleteBin6Line  {...props} />,
    RiAddBoxLine   : <RiAddBoxLine {...props} />,
    RiEdit2Line    : <RiEdit2Line {...props} />,
    RiCloseFill     : <RiCloseFill  {...props} />,
  };

  return icons[requestIcon];
}

export default getIcons;
