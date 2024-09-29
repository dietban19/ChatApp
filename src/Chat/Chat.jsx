import React, { useEffect, useState } from "react";
import MessagesList from "./MessagesList/MessagesList";
import MainChat from "./ChatMain/MainChat";
import AddUser from "./MessagesList/AddUser";
import Sidebar from "./MessagesList/Sidebar";
import Settings from "./Sidebar/Settings";

function Chat() {
  const [tab, setTab] = useState("All");
  const [selectedMessageId, setSelectedMessageId] = useState();
  const [selectedMessage, setSelectedMessage] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [addUser, setAddUser] = useState(false);
  const [view, setView] = useState("messages");
  // Update the isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(addUser);
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* MessagesList (visible unless selectedMessage is true on mobile) */}
      {addUser && <AddUser setAddUser={setAddUser} />}

      {/* MainChat (only visible when selectedMessage is true, slides in on mobile) */}
      {isMobile ? (
        <>
          <div
            className={`${isMobile ? "w-full" : "w-[25.25rem]"} bg-chat-800  h-full flex flex-col absolute left-0 top-0 transform transition-transform duration-700 ${
              selectedMessage && isMobile
                ? "-translate-x-full"
                : "translate-x-0"
            } `}
          >
            <MessagesList
              tab={tab}
              setTab={setTab}
              selectedMessageId={selectedMessageId}
              setSelectedMessageId={setSelectedMessageId}
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
              setAddUser={setAddUser}
            />
          </div>
          <div
            className={`bg-chat-800 h-full flex flex-col absolute right-0 top-0 transform transition-transform duration-700 ${
              selectedMessage && isMobile ? "translate-x-0" : "translate-x-full"
            }  w-full sm:w-auto`}
          >
            {selectedMessage && (
              <MainChat
                tab={tab}
                setTab={setTab}
                selectedMessageId={selectedMessageId}
                setSelectedMessageId={setSelectedMessageId}
                selectedMessage={selectedMessage}
                setSelectedMessage={setSelectedMessage}
                isMobile={isMobile}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {!isMobile && <Sidebar setView={setView} />}
          <div
            className={`${isMobile ? "w-full" : "w-[25.25rem]"} bg-chat-800  h-full flex flex-col  transform transition-transform duration-700  `}
          >
            {view == "messages" && (
              <MessagesList
                tab={tab}
                setTab={setTab}
                selectedMessageId={selectedMessageId}
                setSelectedMessageId={setSelectedMessageId}
                selectedMessage={selectedMessage}
                setSelectedMessage={setSelectedMessage}
                setAddUser={setAddUser}
                isMobile={isMobile}
              />
            )}
            {view == "settings" && <Settings />}
          </div>
          <div
            className={`grow bg-chat-100 h-full flex flex-col transform    w-full sm:w-auto`}
          >
            {selectedMessage && (
              <MainChat
                tab={tab}
                setTab={setTab}
                selectedMessageId={selectedMessageId}
                setSelectedMessageId={setSelectedMessageId}
                selectedMessage={selectedMessage}
                setSelectedMessage={setSelectedMessage}
                isMobile={isMobile}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
