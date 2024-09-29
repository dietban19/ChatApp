import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
function TopHeader({ setAddUser }) {
  return (
    <div className="fixed h-[4rem] w-full pt-4 flex justify-between p-1 px-4 text-neutral-200">
      <div className="text-lg font-semibold">Chats</div>
      <BsThreeDotsVertical
        onClick={() => setAddUser(true)}
        size={25}
        className="cursor-pointer"
      />
    </div>
  );
}

export default TopHeader;
