import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);

  let data = [
    {
      id: 1,
      userName: "Cha Eun-woo",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-lSV66tnWBlVONljSpiwPVVEXmM975lm8g&s",
      message: "start following you",
      time: "(45m ago)",
    },
    {
      id: 2,
      userName: "Cha Eun-woo",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-lSV66tnWBlVONljSpiwPVVEXmM975lm8g&s",
      message: "replied on the image article",
      time: "(2m ago)",
    },
  ];

  return (
    <div className="flex items-center justify-between p-5 bg-gray-100 rounded-md">
      <div className="relative w-44 sm:w-72">
        <SearchBar placeholder="Search here..." />
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button className="relative" onClick={() => setDropDown(!dropdown)}>
            <i className="bi bi-bell text-xl"></i>
            <span className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-red-700 text-white -top-3 -right-3">
              2
            </span>
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-48 md:w-80 transition-all duration-300`}
          >
            {data.map((item) => (
              <Link
                key={item.id}
                to="/"
                className="flex items-center px-4 py-3 -mx-1 hover:text-white hover:bg-blue-950"
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-8 h-8 mr-2 rounded-full object-cover"
                />
                <p className="mx-2 text-sm">
                  <span className="font-bold">{item.userName} </span>
                  <span className="font-normal">
                    {item.message} {item.time}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
