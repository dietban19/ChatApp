import React from "react";
import MessageHeader from "./MessageHeader";
import MainChatContainer from "./MainChatContainer";
import TextInput from "./TextInput";

function MainChat({
  tab,
  setTab,
  selectedMessage,
  setSelectedMessage,
  selectedMessageId,
  setSelectedMessageId,
  isMobile,
}) {
  return (
    <>
      <MessageHeader
        selectedMessage={selectedMessage}
        isMobile={isMobile}
        setSelectedMessage={setSelectedMessage}
      />
      <MainChatContainer selectedMessage={selectedMessage} />
      <TextInput
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
      />
    </>
  );
}

export default MainChat;
