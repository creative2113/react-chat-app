import { componentDetailModalCloseIconStyle, componentDetailsModalCloseIconWrapperStyle, componentDetailsModalDescriptionStyle, componentDetailsModalHeaderStyle, componentDetailsModalStyle, componentDetailsModalTitleStyle, loadingComponentModalStyle } from "../../style";

import CloseIcon from "../assets/close2x.png";
import {CometChatThemeContext} from "@cometchat/chat-uikit-react"
import SamplePDF from "./sample.pdf"
import { fontHelper } from "@cometchat/uikit-resources";
import { useContext } from "react";

const FileBubble = (props:any) => {
    const {
        activeComponent,
        handleCloseComponentModal,
        showComponentModal,
    } = props;
    let showModal = false;
    const bubbleSlug = "file-bubble"
    if(showComponentModal && activeComponent === bubbleSlug)
        showModal = true
    const { theme } = useContext(CometChatThemeContext);
    const fileStyle = {
        borderRadius:"8px",
        height:"fit-content",
        width:"220px",
        background:theme.palette.getAccent200(),
        titleFont: fontHelper(theme.typography.subtitle1),
        titleColor: theme.palette.getAccent(),
        subtitleFont: fontHelper(theme.typography.subtitle2),
        subtitleColor: theme.palette.getAccent600(),
        iconTint: "rgb(51, 153, 255)",
      }
    const themeMode = theme.palette.mode
    return (
       
        <div
              style = {loadingComponentModalStyle(showModal)}
            >
              <div
              style={componentDetailsModalStyle(themeMode)}
              >
                <div style={componentDetailsModalHeaderStyle}>
                    <div style={componentDetailsModalTitleStyle}>File Bubble</div>
                    <div onClick={handleCloseComponentModal} style={componentDetailsModalCloseIconWrapperStyle}><img style={componentDetailModalCloseIconStyle} alt="closeIcon" src={CloseIcon} /></div>
                </div>
                <div style={componentDetailsModalDescriptionStyle}>
                CometChatFileBubble displays a media message containing a file.
                </div>
                <div className="audiobubbleWrapper" style={{margin: "0 auto",marginTop: "15px", marginBottom: "15px",}}>
                  <cometchat-file-bubble fileStyle={JSON.stringify(fileStyle)} fileURL={SamplePDF} title="File Bubble" subtitle="Shared file" />
                </div>
              </div>
             </div>)

}
export { FileBubble };