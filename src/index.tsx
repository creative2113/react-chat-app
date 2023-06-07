import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
import { CometChatConstants } from "./constants"; 
import { CometChat } from "@cometchat-pro/chat";
import "@cometchat/uikit-elements";
import { ChatConfigurator } from "@cometchat/chat-uikit-react";

(async () => {
  const appSettings = new CometChat.AppSettingsBuilder()
                                   .subscribePresenceForAllUsers()
                                   .setRegion(CometChatConstants.region)
                                   .autoEstablishSocketConnection(true)
                                   .build();
  try {
    await CometChat.init(CometChatConstants.appId, appSettings);
    console.log("Initialization completed successfully");
    ChatConfigurator.init();
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    root.render(<App />);
  }
  catch(error) {
    console.log("Initialization failed with error:", error);
  }
})();
