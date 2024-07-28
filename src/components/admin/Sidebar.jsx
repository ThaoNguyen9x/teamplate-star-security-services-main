import React, { useState } from "react";
import UserProfile from "./sidebar/UserProfile";
import SidebarData from "./sidebar/SidebarData";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={`sticky flex ${
        toggle ? "w-64" : "w-20"
      }  min-h-[100vh] px-3 bg-blue-950 text-white transition-all duration-200`}
    >
      <div
        onClick={() => setToggle(!toggle)}
        className="absolute top-[7rem] -right-4 w-7 h-7 flex items-center justify-center bg-gray-200 text-blue-950 rounded-full cursor-pointer"
      >
        <i
          className={`${
            toggle ? "rotate-180" : ""
          } bi bi-chevron-right text-lg transition-all duration-300`}
        ></i>
      </div>
      <div className="flex flex-col w-full my-5">
        <UserProfile toggle={toggle} />
        <SidebarData toggle={toggle} />
      </div>
    </div>
  );
};

export default Sidebar;
