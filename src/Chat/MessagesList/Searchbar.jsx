import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
function Searchbar() {
  return (
    <div className="mt-[4rem] p-2">
      <div className="rounded-xl gap-2 bg-chat-100 p-1 px-3 text-neutral-200 flex items-center">
        <HiMagnifyingGlass />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent p-2 w-full outline-0 border-0"
        ></input>
      </div>
    </div>
  );
}

export default Searchbar;
