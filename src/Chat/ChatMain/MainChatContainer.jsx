import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase"; // Assuming firebase config is correctly set up
import { useAuth } from "../../context/UserContext";

function MainChatContainer({ selectedMessage }) {
  const { currentUser } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const bottomRef = useRef(null); // Create a ref to scroll to bottom

  useEffect(() => {
    let unsubscribe;

    if (selectedMessage?.chatId) {
      // Query the msgList subcollection and order by timestamp in ascending order
      const msgListSubCollectionRef = collection(
        db,
        "messages",
        selectedMessage.chatId,
        "msgList"
      );
      const q = query(msgListSubCollectionRef, orderBy("createdAt", "asc"));

      // Use onSnapshot to listen for real-time updates
      unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id, // id of the document
          ...doc.data(), // message data
        }));
        console.log(messages);
        setMessageList(messages);
      });
    }

    // Cleanup the listener when the component unmounts or when chatId changes
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedMessage]);

  // Scroll to bottom whenever the messageList changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);
  console.log(messageList);
  return (
    <div className="bg-chat-900 h-full p-4 overflow-y-auto">
      {messageList?.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.id === currentUser.uid ? "justify-end" : "justify-start"
          } mb-4`}
        >
          <div
            className={`p-2 rounded-lg ${
              message.id === currentUser.uid
                ? "bg-chat-green-600 text-white"
                : "bg-chat-100 text-neutral-200"
            } max-w-xs`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {/* This div will be used as the scroll target to scroll to the bottom */}
      <div ref={bottomRef} />
    </div>
  );
}

export default MainChatContainer;
