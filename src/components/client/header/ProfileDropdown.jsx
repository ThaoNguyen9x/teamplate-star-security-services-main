import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { CiGrid41 } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { no_avatar } from "../../../assets/index";

const ProfileDropdown = ({
  isOpen,
  toggleDropdown,
  onClose,
}) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        <img
          src={no_avatar}
          alt="Profile"
          className="w-10 h-10 object-cover rounded-full"
        />
      </button>
      {isOpen && (
        <ul className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-md overflow-hidden">
          <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-700 hover:text-white"
                onClick={onClose}
              >
                <CiGrid41 className="text-xl" />
                Dashboard
              </Link>
            </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-700 hover:text-white"
              onClick={onClose}
            >
              <IoSettingsOutline className="text-xl" />
              My Profile
            </Link>
          </li>
          <li>
            <div
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-700 hover:text-white cursor-pointer"
              onClick={onClose}
            >
              <IoIosLogOut className="text-xl" />
              Logout
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
