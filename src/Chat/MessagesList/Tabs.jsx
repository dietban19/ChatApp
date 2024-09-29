import React from "react";

function Tabs({ tab, setTab }) {
  const tabs = [{ name: "All" }, { name: "Unread" }, { name: "Groups" }];
  tabs.forEach((tabVal) => {
    // console.log(object);
    if (tab == tabVal.name) {
    }
  });
  return (
    <div className="flex font-medium text-stone-400 gap-2 p-2">
      {tabs.map((tabVal, index) => (
        <div
          key={index}
          className={`${tabVal.name == tab ? "bg-chat-green-500 text-chat-green-400" : "bg-chat-100"}  rounded-full text-center p-2 px-4`}
        >
          {tabVal.name}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
