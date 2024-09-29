import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
function Bottombar({ setView, isMobile }) {
  console.log(isMobile, "bbomt");
  return (
    <div
      className={`text-neutral-200 flex absolute bottom-0 z-[999]  bg-chat-100 w-full items-center justify-evenly p-1 py-2`}
    >
      <IoChatbubbleOutline
        size={25}
        className="cursor-pointer"
        onClick={() => setView("messages")}
      />
      <FaGear
        size={25}
        className="cursor-pointer"
        onClick={() => setView("settings")}
      />
      <BsPersonCircle
        size={25}
        className="cursor-pointer"
        onClick={() => setView("profile")}
      />
    </div>
  );
}

export default Bottombar;
