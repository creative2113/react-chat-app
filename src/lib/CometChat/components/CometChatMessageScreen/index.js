import React from "react";
import "./style.scss";
import ChatHeader from "../ChatHeader";
import MessageComposer from "../MessageComposer";
import ChatWindow from "../ChatWindow";
import UserProfile from "../UserProfile"


class CometChatMessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
      onItemClick: null,
      messages: undefined,
      actionGenerated: () => {
        return null;
      }
    }

  }

  static getDerivedStateFromProps(props, state) {
    return props;

  }
  render() {
    return (
      <div className="cp-chatview-container-wrapper" >
        <div className="cp-chatview-container" >
          <ChatHeader item={this.state.item} type={this.state.type} onActionGenerated={(action, payload) => {
            this.state.actionGenerated(action, payload);
            switch (action) {
              case 'audioCallInitiated':
                console.log("AUDIO calll started", payload);

                this.setState({ messages: [payload.call] });
                break;
              case 'videoCallInitiated':
                console.log("VIDEOP calll started", payload);
                this.setState({ messages: [payload.call] });

                break;
              case 'toggelProfile':
                this.setState({
                  ...payload
                })
                break;
            }

          }}></ChatHeader>
          <div className="cp-chatwindow-conatiner" >
            <ChatWindow inputMessageList={(this.state.messages !== undefined ? this.state.messages : "")} item={this.state.item} type={this.state.type}></ChatWindow>
          </div>

          <MessageComposer onMessageSent={(message) => {
            this.setState({ messages: [message] });
          }} item={this.state.item} type={this.state.type}></MessageComposer>
        </div>
        {this.state.toggleUserProfile ? <div className="cp-profile-container">
          <UserProfile item={this.state.item} type={this.state.type} ></UserProfile>

        </div> : ""}


      </div>

    );
  }
}



export default CometChatMessageScreen;
export const cometChatMessageScreen = CometChatMessageScreen;

CometChatMessageScreen.defaultProps = {
  CometChatMessageScreen: {}
};
