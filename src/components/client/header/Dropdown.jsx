import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const Dropdown = ({
  links,
  dropdownOpenIndex,
  toggleDropdown,
  setDropdownOpenIndex,
}) => {
  const dropdownRef = useRef();
  const location = useLocation();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpenIndex(null);
    }
  };

  const closeDropdown = () => {
    setDropdownOpenIndex(null);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ul className="hidden xl:flex space-x-12" ref={dropdownRef}>
      {links.map((link, index) => {
        const isActive =
          location.pathname === link.path ||
          (link.dropdown &&
            link.dropdown.some(
              (sublink) => sublink.path === location.pathname
            ));

        return (
          <div key={index} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(index);
              }}
              className={`relative flex items-center gap-2 after:bg-red-700 after:h-[3px] after:w-0 after:left-1/2 after:-bottom-0 after:rounded-xl after:absolute after:duration-300 after:transform after:-translate-x-1/2 hover:after:w-full uppercase text-nowrap ${
                isActive ? "font-bold text-red-700" : ""
              }`}
            >
              {link.dropdown ? (
                link.title
              ) : (
                <Link to={link.path}>{link.title}</Link>
              )}
              {link.dropdown && (
                <IoChevronDown
                  className={`transition-transform duration-300 text-xs ${
                    dropdownOpenIndex === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {link.dropdown && dropdownOpenIndex === index && (
              <ul className="absolute top-full mt-2 bg-white shadow-md whitespace-nowrap rounded-md overflow-hidden">
                {link.dropdown.map((sublink, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={sublink.path}
                      onClick={closeDropdown}
                      className={`${
                        sublink.title === "faq" ? "uppercase" : "capitalize"
                      } block px-5 py-2 hover:bg-red-700 hover:text-white ${
                        location.pathname === sublink.path
                          ? "bg-red-700 text-white"
                          : ""
                      }`}
                    >
                      {sublink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default Dropdown;
