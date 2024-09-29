import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
function Sidebar({ setView, isMobile }) {
  return (
    <div
      className={`bg-chat-100 w-[4rem] flex flex-col text-neutral-300 items-center py-4 justify-between ${isMobile ? "absolute bottom-0 z-[99999] w-full" : ""}`}
    >
      <div className="flex flex-col">
        <IoChatbubbleOutline
          size={25}
          className="cursor-pointer"
          onClick={() => setView("messages")}
        />
      </div>
      <div className="flex flex-col gap-8">
        <FaGear
          size={35}
          className="cursor-pointer"
          onClick={() => setView("settings")}
        />
        <BsPersonCircle
          size={35}
          className="cursor-pointer"
          onClick={() => setView("profile")}
        />
      </div>
    </div>
  );
}

export default Sidebar;
