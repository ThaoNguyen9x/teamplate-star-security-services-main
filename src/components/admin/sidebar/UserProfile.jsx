import React from "react";
import { Link } from "react-router-dom";

const UserProfile = ({ toggle }) => {
  const account = [
    {
      id: "1",
      name: "Phúc Bảo",
      role: "Supper Admin",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdSy3dACp1ORaJy7wJUPlKpp8cQbMbmjPIQ&s",
    },
  ];

  return (
    <>
      {account.map((item) => (
        <Link to="/" key={item.id} className="flex items-center gap-5">
          <img
            src={item.image}
            alt=""
            className="h-14 w-h-14 object-cover rounded-full"
          />
          <div
            className={`flex flex-col ${
              toggle ? "" : "hidden"
            } transition-all duration-300`}
          >
            <span className="font-semibold text-xl text-nowrap">
              {item.name}
            </span>
            <span className="text-sm text-nowrap text-gray-400">
              {item.role}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default UserProfile;
