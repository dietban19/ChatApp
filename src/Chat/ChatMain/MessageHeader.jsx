import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
function MessageHeader({ selectedMessage, isMobile, setSelectedMessage }) {
  //   const message = selectedMessage;
  if (selectedMessage) {
  }
  return (
    <div
      className={`relative justify-between  items-center gap-3 bg-chat-100 py-4 text-neutral-200 flex px-4`}
    >
      <IoIosArrowBack
        size={25}
        className="cursor-pointer"
        onClick={() => setSelectedMessage("")}
      />
      <div className="flex gap-2 items-center">
        <div>
          <img
            src={selectedMessage && selectedMessage.otherUsers[0].photoURL}
            className="w-12 h-12 flex justify-center items-center rounded-full object-cover"
            alt="Profile Picture"
          />
        </div>
        <div className="text-lg font-medium">
          {selectedMessage && selectedMessage.otherUsers[0].name}
        </div>
      </div>
      <div className="flex gap-4">
        {!isMobile && <HiMagnifyingGlass size={25} />}

        <BsThreeDotsVertical size={25} />
      </div>
    </div>
  );
}

export default MessageHeader;
