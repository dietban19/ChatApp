import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore"; // Firestore functions
import { db } from "../../config/firebase";

function List({
  selectedMessageId,
  setSelectedMessageId,
  selectedMessage,
  setSelectedMessage,
}) {
  const { currentUser } = useAuth();
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = () => {
      if (currentUser && currentUser.uid) {
        try {
          // Reference to the messages collection
          const messagesRef = collection(db, "messages");

          // Set up a real-time listener on the messages collection
          const unsubscribe = onSnapshot(messagesRef, async (snapshot) => {
            let matchingMessages = [];

            // Loop through each message document
            for (const messageDoc of snapshot.docs) {
              const messageData = messageDoc.data();

              // Reference to the 'users' subcollection of the current message document
              const usersSubCollectionRef = collection(messageDoc.ref, "users");
              const msgListSubCollectionRef = collection(
                messageDoc.ref,
                "msgList"
              );

              // Try to get the document in the 'users' subcollection where the documentId matches currentUser.uid
              const userDocRef = doc(usersSubCollectionRef, currentUser.uid);
              const userDocSnap = await getDoc(userDocRef);

              if (userDocSnap.exists()) {
                // If the document exists in the users subcollection, proceed

                // Get all users in the 'users' subcollection
                const usersSnapshot = await getDocs(usersSubCollectionRef);
                const allUsers = usersSnapshot.docs.map((userDoc) =>
                  userDoc.data()
                );

                // Filter out the current user
                const otherUsers = allUsers.filter(
                  (user) => user.userId !== currentUser.uid
                );

                // Get all messages in the 'msgList' subcollection
                const msgListSnapshot = await getDocs(msgListSubCollectionRef);
                const msgList = msgListSnapshot.docs.map((msgDoc) =>
                  msgDoc.data()
                );

                // Add the message, all users, other users, and msgList to the result
                matchingMessages.push({
                  ...messageData,
                  allUsers, // Add the entire subcollection of users
                  otherUsers, // Add the filtered users who are not the current user
                  msgList, // Add the entire subcollection of msgList
                });
              }
            }

            // Set the state with the matching messages, users subcollection, and msgList subcollection
            setMyMessages(matchingMessages);
          });

          // Clean up the subscription on unmount
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching messages or subcollections:", error);
        }
      }
    };

    fetchMessages();
  }, [currentUser]);

  console.log(myMessages);

  return (
    <div className="border-t-2 border-chat-100">
      {/* Render the matching messages */}
      {myMessages.map((message, index) => (
        <div
          onClick={() => {
            setSelectedMessageId(index);
            setSelectedMessage(message);
          }}
          className={`gap-2 cursor-pointer px-4 py-2 flex ${selectedMessageId == index ? "bg-chat-50" : ""}`}
          key={index}
        >
          <div>
            <img
              src={message.otherUsers[0].photoURL}
              className="w-12 h-12 flex justify-center items-center rounded-full object-cover"
              alt="Profile Picture"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-neutral-200">
              {message.otherUsers[0].fullName}
            </div>
            <div className="text-neutral-200">{message.last_message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
