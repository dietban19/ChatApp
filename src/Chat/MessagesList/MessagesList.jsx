import React, { useState } from "react";
import TopHeader from "./TopHeader";
import Searchbar from "./Searchbar";
import Tabs from "./Tabs";
import List from "./List";

function MessagesList({
  tab,
  setTab,
  selectedMessage,
  setSelectedMessage,
  selectedMessageId,
  setSelectedMessageId,
  setAddUser,
}) {
  return (
    <>
      <TopHeader setAddUser={setAddUser} />
      <Searchbar />
      <Tabs tab={tab} setTab={setTab} />
      <List
        selectedMessageId={selectedMessageId}
        setSelectedMessageId={setSelectedMessageId}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
      />
    </>
  );
}

export default MessagesList;
