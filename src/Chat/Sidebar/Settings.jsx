import React from "react";
import { useAuth } from "../../context/UserContext";
import { MdLogout } from "react-icons/md";
function Settings() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const { logout } = useAuth();
  const nav = [
    {
      name: "Log Out",
      icon: <MdLogout size={25} className="text-red-400" />,
      style: "text-red-400",
      function: () => {
        logout();
      },
    },
  ];
  return (
    <div className="flex flex-col p-4">
      <div className="text-neutral-200 font-bold text-xl">Settings</div>
      <div className="mt-4 flex gap-3 ">
        <div>
          <img
            src={currentUser?.photoURL}
            className="w-12 h-12 flex justify-center items-center rounded-full object-cover"
            alt="Profile Picture"
          />
        </div>
        <div className="text-neutral-200 flex items-end">
          My Name is{" "}
          <span className="font-medium ml-1"> {currentUser?.displayName}</span>
        </div>
      </div>
      <div className="mt-4">
        {nav.map((item, index) => (
          <div
            key={index}
            onClick={item.function}
            className={`${item.style ? item.style : "text-neutral-300"} flex p-2 gap-2 cursor-pointer`}
          >
            {item.icon}
            <div className="text-base">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;
