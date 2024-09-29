import React, { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/UserContext"; // Assuming you already have the useAuth hook for current user context
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

function TextInput({ selectedMessage }) {
  const { currentUser } = useAuth(); // Accessing the current user
  const [inputValue, setInputValue] = useState(""); // Managing the input state

  // Function to handle sending the message
  const handleSendMessage = async () => {
    console.log(selectedMessage);
    if (!selectedMessage?.chatId) {
      console.error("No chat selected or chat ID is missing");
      return; // Ensure a chat is selected
    }

    if (inputValue.trim() === "") return; // Prevent sending empty messages

    // Create new message object
    const newMessage = {
      id: currentUser.uid, // User ID
      content: inputValue, // The input value
      createdAt: serverTimestamp(), // Add server timestamp
      type: "text",
    };

    try {
      // Add the new message to the Firestore subcollection 'msgList'
      const msgListSubCollectionRef = collection(
        db,
        "messages",
        selectedMessage.chatId,
        "msgList"
      );
      await addDoc(msgListSubCollectionRef, newMessage);

      // Clear the input after sending
      setInputValue("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  // Function to handle key press events
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(); // Send the message if Enter is pressed
    }
  };

  return (
    <div className="bg-chat-100 px-4 py-5 flex items-center">
      <CiFaceSmile size={30} className="font-bold text-neutral-200" />
      <IoMdAdd size={30} className="mx-4 font-bold text-neutral-200" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update the input state
        onKeyPress={handleKeyPress} // Trigger on key press
        className="bg-chat-50 outline-none text-neutral-200 border-none p-3 rounded-xl w-full"
        placeholder="Type a message"
      />
      <IoMdSend
        size={30}
        className="mx-4 font-bold text-neutral-200 cursor-pointer"
        onClick={handleSendMessage} // Send the message on click
      />
    </div>
  );
}

export default TextInput;
